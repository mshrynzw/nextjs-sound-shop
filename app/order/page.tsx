"use client"

import React, {useEffect} from "react"
import {useModal} from "@/context/ModalContext"
import Modal from "@/components/modal/Modal"
import ModalCart from "@/components/modal/ModalCart"
import {useCart} from "@/context/CartContext"

const Success = () => {
  const {openModal} = useModal()
  const {clearCart} = useCart()
  useEffect(()=>{
    clearCart()

    openModal({
      title: "Cart",
      content: <ModalCart/>
    })
  }, [])

  return (
    <Modal/>
  )
}

export default Success