"use client"

import React from "react"
interface ModalDonateStartProps {
  setShow: (state: string) => void
}

const ModalDonateStart: React.FC<ModalDonateStartProps> = ({setShow}) => {
  const handleClick = () => {
    setShow("checkout")
  }

  return (
    <>
      <h2 className="mt-4 font-bold">Why Donate?</h2>
      <div className="flex justify-center">
        <ul className="list-inside list-disc px-40 text-left text-white/75">
          <li>Fund new musical projects and compositions</li>
          <li>Support live performances and tours</li>
          <li>Invest in music education and workshopst</li>
          <li>Keep the Music Alive</li>
        </ul>
      </div>

      <h2 className="mt-4 font-bold">How Your Donation Helps</h2>
      <ul className="text-white/75">
        <li>$50 - New preset</li>
        <li>$100 - Production costs for a new single</li>
        <li>$10000 - New synthesizer Plugin</li>
      </ul>

      <div className="mt-4 rounded-lg border-2 border-white/30 p-4">
        <p className="text-white/75">
          Your generosity allows us to continue sharing our music with the world.
          <br/>
          Together, we can create harmonies that resonate with hearts and inspire souls.
          <br/>
          <span className="font-bold text-white">Ready to make a difference?</span> Click the &apos;DONATE&apos; button
          below to
          support our musical journey.
        </p>
        <button
          className="mt-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white shadow-2xl transition pointer hover:bg-blue-700"
          onClick={handleClick}
        >
          Donate
        </button>
      </div>
    </>
  )
}

export default ModalDonateStart