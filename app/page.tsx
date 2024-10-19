"use client"

import {useEffect} from "react"
import {supabase} from "@/lib/supabaseClient"
import {useSearchParams} from "next/navigation"
import {useCart} from "@/context/CartContext"
import Modal from "@/components/modal/Modal"
import {useModal} from "@/context/ModalContext"
import ModalOrder from "@/components/modal/ModalOrder"
import ModalCart from "@/components/modal/ModalCart"
import ModalDonateComplete from "@/components/modal/ModalDonateComplete"

const Home = () => {
  const {openModal} = useModal()
  const {clearCart} = useCart()

  const searchParams = useSearchParams()

  useEffect(() => {
    const order = searchParams?.get("order")
    const donate = searchParams?.get("donate")
    const sessionId = searchParams?.get("sessionId")

    const handleOrderSuccess = async () => {
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

    const handleOrderCancel = async () => {
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

    const handleDonateSuccess = async () => {
      const {error} = await supabase
        .from("donates")
        .update({status: "success"})
        .eq("session_id", sessionId)

      if (error) {
        console.error("Error updating order status:", error)
      } else {
        openModal({
          title: "Donate",
          content: <ModalDonateComplete/>
        })
      }
    }

    const handleDonateCancel = async () => {
      const {error} = await supabase
        .from("donates")
        .update({status: "cancel"})
        .eq("session_id", sessionId)

      if (error) {
        console.error("Error updating order status:", error)
      }
    }

    if (order === "success" && sessionId) {
      handleOrderSuccess()
    } else if (order === "cancel" && sessionId) {
      handleOrderCancel()
    }else if (donate === "success" && sessionId) {
      handleDonateSuccess()
    } else if (donate === "cancel" && sessionId) {
      handleDonateCancel()
    }
  }, [])

  return (
    <>
      <Modal/>
    </>
  )
}

export default Home