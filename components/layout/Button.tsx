"use client"

import React, {useState, useEffect} from "react"
import {useSession, signIn, signOut} from "next-auth/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import {faFolderOpen} from "@fortawesome/free-regular-svg-icons"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"
import ModalCart from "@/components/modal/ModalCart"
import ModalOrder from "@/components/modal/ModalOrder"

const Button = () => {
  const {cart} = useCart()
  const {openModal} = useModal()

  const {data: session} = useSession()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCheckout = () => {
    openModal({
      title: "Cart",
      content: <ModalCart/>
    })
  }

  const handleOrder = () => {
    openModal({
      title: "Order",
      content: <ModalOrder/>
    })
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="space-x-4">
        {session ? (
          <button
            className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
            onClick={() => signOut()}
          >
            <div className="flex items-center justify-between space-x-2">
              <div>Logout</div>
              <div><FontAwesomeIcon icon={faGoogle}/></div>
            </div>
          </button>
        ) : (
          <button
            className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
            onClick={() => signIn("google")}
          >
            <div className="flex items-center justify-between space-x-2">
              <div>Login</div>
              <div><FontAwesomeIcon icon={faGoogle}/></div>
            </div>
          </button>

        )}
        <button
          className="z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
          onClick={handleCheckout}
        >
          <div className="flex items-center justify-between space-x-2">
            <div>Cart</div>
            <div>$ {isClient ? cart.length : 0}</div>
          </div>
        </button>

        <button
          className="z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        >
          Donate
        </button>
      </div>
      {session && (
        <div className="space-x-4">
          <button
            className="z-10 rounded-lg border border-white bg-white/60 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white w-full"
            onClick={handleOrder}
          >
            <div className="flex items-center justify-center space-x-2">
              <div>Order</div>
              <div><FontAwesomeIcon icon={faFolderOpen}/></div>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Button