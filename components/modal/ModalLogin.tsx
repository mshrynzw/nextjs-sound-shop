"use client"

import {useModal} from "@/context/ModalContext"

const ModalLogin = () => {
  const {closeModal} = useModal()

  return (
    <div className="space-y-4">
      <form className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-left text-white/50 text-sm">E-Mail</label>
          <input type="email" id="email" name="email"/>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-left text-white/50 text-sm">Password</label>
          <input type="password" id="password" name="password"/>
        </div>
        <div className="flex justify-center">
          <button
            type="submit" value="login"
            className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white"
          >
            Login
          </button>
        </div>
      </form>
      <form className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-left text-white/50 text-sm">E-Mail</label>
          <input type="email" id="email" name="email"/>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-left text-white/50 text-sm">Password</label>
          <input type="password" id="password" name="password"/>
        </div>
        <div className="flex justify-center">
          <button
            type="submit" value="signup"
            className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black transition pointer hover:bg-white/10 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default ModalLogin