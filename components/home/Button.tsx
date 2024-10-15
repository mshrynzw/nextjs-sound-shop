"use client"

import Cookies from "js-cookie"
import {useEffect} from "react"

const Button = () => {
  useEffect(() => {
    const cart = Cookies.get("cart")
    console.log(cart)
  }, [])

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
        Checkout <span className="text-white bg-blue-500 px-2 py-1 rounded shadow-2xl mx-1">($ 2)</span>
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