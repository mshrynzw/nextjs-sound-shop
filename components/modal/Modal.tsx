"use client"

import React from "react"
import {useModal} from "@/context/ModalContext"

const Modal: React.FC = () => {
  const {isOpen, modalContent, closeModal} = useModal()

  if (!isOpen || !modalContent) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl" onClick={closeModal}></div>
      <div className="relative z-50 flex w-full items-center justify-center">
        <div className="flex flex-col rounded-lg bg-white/10 px-12 py-8 text-center text-white">
          <div className="h-full w-full">
            <div className="flex w-full flex-col items-center gap-4 divide-y">
              <div className="text-base font-bold uppercase tracking-widest">{modalContent.title}</div>
              <div className="pt-2">{modalContent.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal