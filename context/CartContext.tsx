"use client"

import React, {createContext, useContext, useState, useEffect} from "react"
import Cookies from "js-cookie"
import {Item} from "@/types/item"

type CartContextType = {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  clearCart: () => void;
  isItemInCart: (item: Item) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cart, setCart] = useState<Item[]>(() => {
    const savedCart = Cookies.get("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), {expires: 7})
  }, [cart])

  const addToCart = (item: Item) => {
    setCart((prevCart) => [...prevCart, item])
  }

  const removeFromCart = (item: Item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id))
  }

  const clearCart = () => {
    setCart([])
    Cookies.remove("cart")
  }

  const isItemInCart = (item: Item) => {
    return cart.some(cartItem => cartItem.id === item.id)
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, isItemInCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}