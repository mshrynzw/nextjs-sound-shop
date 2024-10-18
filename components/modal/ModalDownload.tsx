"use client"

import React from "react"

type OrderItem = {
  id: number;
  item_id: number;
  updated_at: string;
  items: {
    title: string;
    price: number;
  };
}

interface ModalDownloadProps {
  orderItem: OrderItem
}

const ModalDownload: React.FC<ModalDownloadProps> = ({orderItem}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download/${orderItem.item_id}`)
      if (!response.ok) throw new Error("Download failed")

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
      console.error("Download failed:", error)
    }
  }


  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 font-medium text-slate-800 group px-2.5 py-1.5 hover:border-emerald-100 hover:bg-emerald-100 hover:text-emerald-800 active:border-slate-200"
    >
      Download
    </button>
  )
}

export default ModalDownload