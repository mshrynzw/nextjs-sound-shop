"use client"

import React, {useState, useEffect} from "react"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"

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
      content: (
        <div>
          {/* ログインフォームの内容 */}
          <div className="text-white">ログインフォームがここに表示されます</div>
        </div>
      )
    })
  }

  const handleCheckout = () => {
    openModal({
      title: "チェックアウト",
      content: (
        <div>
          <h1>Checkout</h1>
          {/* チェックアウトフォームの内容 */}
        </div>
      )
    })
  }

  return (
    <div className="mt-4 space-x-4">
      <button
        className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        onClick={handleLogin}
      >
        {/*TODO: ログイン機能*/}
        {true ? (
          <>Login / Sign up</>
        ) : (
          <>Logout</>
        )}
      </button>
      <button
        className="z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        onClick={handleCheckout}
      >
        Checkout
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