"use client"

import React from "react"
import Image from "next/image"
import LogoStripe from "@/components/logo/LogoStripe"
import {useModal} from "@/context/ModalContext"
import styles from "@/components/modal/ModalCartLegal.module.css"
import dynamic from "next/dynamic"

const DynamicModalCart = dynamic(() => import("@/components/modal/ModalCart"))

const ModalCartLegal = () => {
  const {openModal} = useModal()

  const handleClick = () => {
    openModal({
      title: "Cart",
      content: <DynamicModalCart/>
    })
  }

  return (
    <div className="space-y-4">
      <div className={`space-y-4 h-[400px] overflow-y-auto ${styles.scrollContainer}`}>
        <Image
          src="/image/legal_notice.webp"
          alt="Legal notice"
          className="transform brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{transform: "translate3d(0, 0, 0)"}}
          width={720}
          height={480}
          priority
        />
      </div>
      <div className="space-y-2">
        <button
          onClick={handleClick}
          className="rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold uppercase text-black shadow-2xl transition pointer hover:bg-white/10 hover:text-white"
        >
          Back
        </button>
        <LogoStripe/>
      </div>
    </div>
  )
}

export default ModalCartLegal