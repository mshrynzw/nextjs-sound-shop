"use client"

import {useEffect} from "react"
import dynamic from 'next/dynamic'
import {supabase} from "@/lib/supabaseClient"
import {useSearchParams} from "next/navigation"
import {useCart} from "@/context/CartContext"
import {useModal} from "@/context/ModalContext"

const DynamicModal = dynamic(() => import('@/components/modal/Modal'))
const DynamicModalCart = dynamic(() => import('@/components/modal/ModalCart'))
const DynamicModalOrder = dynamic(() => import('@/components/modal/ModalOrder'))
const DynamicModalDonateComplete = dynamic(() => import('@/components/modal/ModalDonateComplete'))

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
          content: <DynamicModalOrder/>
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
          content: <DynamicModalCart/>
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
          content: <DynamicModalDonateComplete/>
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
      <DynamicModal/>
    </>
  )
}

export default Home