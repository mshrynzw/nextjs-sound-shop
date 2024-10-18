"use client"

import React from "react"
import {useSession} from "next-auth/react"

type OrderItem = {
  id: number;
  item_id: number;
  updated_at: string;
  items: {
    title: string;
    price: number;
  };
  password: string;
}

interface ModalDownloadProps {
  orderItem: OrderItem
}

const ModalDownload: React.FC<ModalDownloadProps> = ({orderItem}) => {
  const {data: session} = useSession()

  const handleDownload = async () => {
    const inputPassword = window.prompt("Please enter a password.")

    try {
      const response = await fetch(`/api/download/${orderItem.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: inputPassword,
          email: session?.user?.email,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Download failed")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `kys_${orderItem.id}-${orderItem.item_id}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }


  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1 rounded-lg border text-neutral-800 border-slate-200 font-medium group px-2.5 py-1.5 hover:border-emerald-100 hover:bg-emerald-100 hover:text-emerald-800 active:border-slate-200"
    >
      Download
    </button>
  )
}

export default ModalDownload