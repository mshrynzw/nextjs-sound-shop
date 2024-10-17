"use client"

import {useEffect} from "react"
import {supabase} from "@/lib/supabaseClient"
import {useSearchParams} from "next/navigation"
import {useCart} from "@/context/CartContext"
import Modal from "@/components/modal/Modal"
import {useModal} from "@/context/ModalContext"
import ModalOrder from "@/components/modal/ModalOrder"
import ModalCart from "@/components/modal/ModalCart"

const Home = () => {
  const {openModal} = useModal()
  const {clearCart} = useCart()

  const searchParams = useSearchParams()

  useEffect(() => {
    const order = searchParams?.get("order")
    const sessionId = searchParams?.get("sessionId")

    const handleSuccess = async () => {
      const {error} = await supabase
        .from("orders")
        .update({status: "success"})
        .eq("session_id", sessionId)

      if (error) {
        console.error("Error updating order status:", error)
      } else {
        openModal({
          title: "Order",
          content: <ModalOrder/>
        })
        clearCart()
      }
    }

    const handleCancel = async () => {
      const {error} = await supabase
        .from("orders")
        .update({status: "cancel"})
        .eq("session_id", sessionId)

      if (error) {
        console.error("Error updating order status:", error)
      } else {
        openModal({
          title: "Cart",
          content: <ModalCart/>
        })
      }
    }

    if (order === "success" && sessionId) {
      handleSuccess()
    } else if (order === "cancel" && sessionId) {
      handleCancel()
    }
  }, [])

  return (
    <>
      <Modal/>
    </>
  )
}

export default Home