"use client"

import React, { useState, useEffect } from 'react';
import {useCart} from "@/context/CartContext"

const Button = () => {
  const { cart } = useCart()

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mt-4 space-x-4">
      <button
        className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        {true ? (
          <>
            Login / Sign up
          </>
        ) : (
          <>
            Logout
          </>
        )}
      </button>
      <button
        className="z-10 mt-6 rounded-lg uppercase border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        Checkout <span className="text-white bg-blue-500 px-2 py-1 rounded mx-1">$ {isClient ? cart.length : 0}</span>
      </button>

      <button
        className="z-10 mt-6 rounded-lg uppercase border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        Donate
      </button>
    </div>
  )
}

export default Button