"use client"

import React from "react"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"
import {Item} from "@/types/item"

const ModalCart = () => {
  const {cart, removeFromCart, clearCart} = useCart()
  const {closeModal} = useModal()

  const handleRemoveClick = (item: Item) => {
    removeFromCart(item)
    if (cart.length === 0) clearCart()
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
                Remove $ {item.price.toString()}
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
          Cancel
        </button>
        {cart.length !== 0 && (
          <button
            className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-2xl transition pointer hover:bg-blue-700"
          >
            Check Out
          </button>
        )}
      </div>
    </div>
  )
}

export default ModalCart
