import {NextApiRequest, NextApiResponse} from "next"
import Stripe from "stripe"
import {supabase} from "@/lib/supabaseClient"
import {Item} from "@/types/item"
import {generatePassword} from "@/lib/password"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {items, email} = req.body

      const line_items = items.map((item: Item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }))

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${req.headers.origin}?order=success&sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}?order=cancel&sessionId={CHECKOUT_SESSION_ID}`,
      })

      await supabase
        .from("orders")
        .insert(items.map((item: Item) => ({
          email: email,
          item_id: Number(item.id),
          session_id: session.id,
          password: generatePassword(),
          status: "pending",
        })))

      res.status(200).json({sessionId: session.id})
    } catch (err) {
      if (err instanceof Stripe.errors.StripeError) {
        res.status(err.statusCode || 500).json({ statusCode: err.statusCode, message: err.message })
      } else {
        res.status(500).json({ statusCode: 500, message: "An unexpected error occurred" })
      }
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}