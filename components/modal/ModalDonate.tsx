"use client"

import React, {useState} from "react"
import {useModal} from "@/context/ModalContext"
import ModalDonateStart from "@/components/modal/ModalDonateStart"
import ModalDonateCheckout from "@/components/modal/ModalDonateCheckout"

const ModalDonate:React.FC = () => {
  const {closeModal} = useModal()

  const [show, setShow] = useState("start")

  return (
    <div className="px-12 space-y-4">
      <div>
        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">Support Our Musical Journey</h1>
        <p className="text-white/75">
          Your contribution fuels our passion for music and helps us create unforgettable melodies.
          <br/>
          Every donation, no matter the size, plays a crucial role in our musical endeavors.
        </p>


          {show === "checkout" ? (
            <ModalDonateCheckout setShow={setShow}/>
          ) : show === "complete" ? (
            <ModalDonateStart setShow={setShow}/>
          ) : (
            <ModalDonateStart setShow={setShow}/>
          )}

        <p className="mt-4">
          Every note we play carries the gratitude we feel for your support. Thank you for being a part of our musical
          family!
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

export default ModalDonate