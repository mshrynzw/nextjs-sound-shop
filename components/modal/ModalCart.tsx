"use client"

import React, {useEffect, useState} from "react"
import {signIn, useSession} from "next-auth/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import {faTrash} from "@fortawesome/free-solid-svg-icons"
import {loadStripe} from "@stripe/stripe-js"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"
import {Item} from "@/types/item"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const ModalCart = () => {
  const {cart, removeFromCart, clearCart} = useCart()
  const {closeModal} = useModal()

  const {data: session} = useSession()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRemoveClick = (item: Item) => {
    removeFromCart(item)
    if (cart.length === 0) clearCart()
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({items: cart, email: session?.user?.email}),
      })

      const checkoutData = await response.json()

      const stripe = await stripePromise
      await stripe?.redirectToCheckout({
        sessionId: checkoutData.sessionId,
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {cart.length === 0 ? (
          <div>No Item</div>
        ) : (
          cart.map((item: Item) => (
            <li key={item.id} className="flex justify-between space-x-2">
              <div>
                {item.title}
              </div>
              <button
                className="ml-auto rounded bg-red-500 px-1 shadow-2xl hover:bg-red-700"
                onClick={() => handleRemoveClick(item)}
              >
                <div className="flex items-center justify-between space-x-2">
                  <FontAwesomeIcon icon={faTrash}/>
                  <div>$ {item.price.toString()}</div>
                </div>
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="space-x-4">
        <button
          onClick={closeModal}
          className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black shadow-2xl transition pointer hover:bg-white/10 hover:text-white"
        >
          Back
        </button>
        {session ? (
          cart.length !== 0 && (
            <button
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-2xl transition pointer hover:bg-blue-700"
              onClick={handleCheckout}
            >
              Check Out
              <span className="mx-1">$ {isClient ? cart.length : 0}</span>
            </button>
          )
        ) : (
          <button
            className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-2xl transition pointer hover:bg-blue-700"
            onClick={() => signIn("google")}
          >
            <div className="flex items-center justify-between space-x-2">
              <div>Login</div>
              <div><FontAwesomeIcon icon={faGoogle}/></div>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default ModalCart

