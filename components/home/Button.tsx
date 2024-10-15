"use client"

import React, {useState, useEffect} from "react"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"
import ModalLogin from "@/components/modal/ModalLogin"
import ModalCart from "@/components/modal/MocalCart"

const Button = () => {
  const {cart} = useCart()
  const {openModal} = useModal()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = () => {
    openModal({
      title: "Login / Sign up",
      content: <ModalLogin/>
    })
  }

  const handleCheckout = () => {
    openModal({
      title: "Cart",
      content: <ModalCart/>
    })
  }

  return (
    <div className="mt-4 space-x-4">
      {true ? (
        <button
          className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
          onClick={handleLogin}
        >
          Login / Sign up
        </button>
      ) : (
        <button>
          Logout
        </button>
      )}
      <button
        className="z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        onClick={handleCheckout}
      >
        Cart
        <span className="mx-1 rounded bg-blue-500 px-2 py-1 text-white">
          $ {isClient ? cart.length : 0}
        </span>
      </button>

      <button
        className="z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        Donate
      </button>
    </div>
  )
}

export default Button