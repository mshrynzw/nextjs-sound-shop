"use client"

import React, {useState} from "react"
import LogoStripe from "@/components/logo/LogoStripe"
import {useSession} from "next-auth/react"
import {loadStripe} from "@stripe/stripe-js"

interface ModalDonateCheckoutProps {
  setShow: (state: string) => void
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const ModalDonateCheckout: React.FC<ModalDonateCheckoutProps> = ({setShow}) => {
  const {data: session} = useSession()

  const [email, setEmail] = useState<string>(session?.user?.email ?? "")
  const [price, setPrice] = useState<number>(0)
  const [message, setMessage] = useState<string>("")

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleCancel = () => {
    setShow("start")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email")
      return
    }

    if (price <= 0) {
      alert("Please enter a valid price")
      return
    }

    try{
      const response = await fetch("/api/donate/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          price: price,
          message: message,
        }),
      })

      const donateData = await response.json()

      const stripe = await stripePromise
      await stripe?.redirectToCheckout({
        sessionId: donateData.sessionId,
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <h2 className="mt-4 font-bold">How Your Donation Helps</h2>
      <ul className="text-white/75">
        <li>$50 - New preset</li>
        <li>$100 - Production costs for a new single</li>
        <li>$10000 - New synthesizer Plugin</li>
      </ul>

      <div className="mt-4 rounded-lg border-2 border-white/30 p-4">
        <form className="flex-col fex space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center space-x-4">
            <div className="flex flex-row space-x-2">
              <label className="text-left font-bold text-white/75" htmlFor="email">E-mail</label>
              <input
                type="email" id="email" name="email"
                className="rounded px-2 text-black border-b-2 border-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                disabled={!!session?.user?.email}
              />
            </div>

            <div className="flex flex-row space-x-2">
              <label className="text-left font-bold text-white/75" htmlFor="price">Price</label>
              <span className="font-bold text-white">$</span>
              <input
                type="number" id="price" name="price"
                className="w-32 rounded px-2 text-right text-black border-b-2 border-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300"
                value={price}
                onChange={(e) => {
                  const value = Math.floor(Number(e.target.value))
                  setPrice(value >= 0 ? value : 0)
                }}
                min="0" step="1"
              />
            </div>
          </div>

          <div className="mx-auto max-w-md space-y-2">
            <label className="text-left font-bold text-white/75" htmlFor="message">Message</label>
            <textarea
              id="message" name="message" rows={4} className="w-full rounded px-2 text-black border-b-2 border-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="Your message to the creator (optional)"
              value={message} onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-center space-x-2">
            <button
              className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black shadow-2xl transition pointer hover:bg-white/10 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-2xl transition pointer hover:bg-blue-700"
              type="submit"
            >
              Checkout
            </button>
          </div>

          <LogoStripe/>
        </form>
      </div>
    </>
  )
}

export default ModalDonateCheckout