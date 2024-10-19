"use client"

import React from "react"
import {useModal} from "@/context/ModalContext"

const ModalDonateComplete: React.FC = () => {
  const {closeModal} = useModal()

  return (
    <div className="px-12 space-y-4">
      <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
        Thank You for Your Generous Donation
      </h1>
      <div className="flex justify-center">
        <p className="text-white/75">
          We are deeply grateful for your kind contribution.
          <br/>
          Your support means the world to us and plays a crucial role in helping us continue our mission and grow our impact.
        </p>
      </div>
      <div className="mt-4 rounded-lg border-2 border-white/30 p-4">
        <p className="text-md">
          We are committed to making the most of your generosity and will strive to create positive change.
          <br/>
          Thank you for being an essential part of our journey.
        </p>
      </div>
      <div className="space-x-4">
        <button
          onClick={closeModal}
          className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black shadow-2xl transition pointer hover:bg-white/10 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default ModalDonateComplete