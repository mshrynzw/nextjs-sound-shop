import {NextApiRequest, NextApiResponse} from "next"
import Stripe from "stripe"
import {supabase} from "@/lib/supabaseClient"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {email, price, message} = req.body

      const line_items = [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donate",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      }]

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        customer_email: email,
        success_url: `${req.headers.origin}?donate=success&sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}?donate=cancel&sessionId={CHECKOUT_SESSION_ID}`,
      })

      await supabase
        .from("donates")
        .insert({
          session_id: session.id,
          status: "pending",
          price: price,
          email: email,
          message: message,
        })

      res.status(200).json({sessionId: session.id})
    } catch (err) {
      if (err instanceof Stripe.errors.StripeError) {
        res.status(err.statusCode || 500).json({statusCode: err.statusCode, message: err.message})
      } else {
        res.status(500).json({statusCode: 500, message: "An unexpected error occurred"})
      }
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}