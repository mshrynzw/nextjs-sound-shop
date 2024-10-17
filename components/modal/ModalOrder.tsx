"use client"

import {useEffect, useState} from "react"
import {supabase} from "@/lib/supabaseClient"
import {formatLocalDate, formatLocalDateDeadline, isDeadline} from "@/lib/datetime"

type Order = {
  id: number;
  item_id: number;
  created_at: string;
  item_title?: string;
  item_price?: number;
}

const ModalOrder = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const {data, error} = await supabase
        .from("orders")
        .select(`
          id,
          item_id,
          created_at,
          items (
            title,
            price
          )
        `)
        .order("created_at", {ascending: false})

      if (error) {
        console.error("Error getting order data:", error)
        setError("Error getting order data.")
      } else {
        setOrders(data || [])
      }
    }

    fetchOrders()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="rounded bg-white bg-opacity-50 p-5">
      <div className="min-w-full overflow-x-auto">
        <table className="min-w-full align-middle text-sm">
          <thead>
          <tr className="border-b-2 border-neutral-100">
            <th
              className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
            >
              ID
            </th>
            <th
              className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
            >
              Date
            </th>
            <th
              className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
            >
              Item
            </th>
            <th
              className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
            >
              Price
            </th>
            <th
              className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
            >
              Deadline
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="p-3 text-center font-semibold text-neutral-600">
                {order.id}
              </td>
              <td className="p-3 text-start text-neutral-600">
                {formatLocalDate(order.created_at)}
              </td>
              <td className="p-3 text-start text-black">
                {order.items.title}
              </td>
              <td className="p-3 font-medium text-neutral-600">
                <div
                  className="underline decoration-neutral-200 decoration-2 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-300">
                  $ {order.items.price}
                </div>
              </td>
              <td className="p-3 text-start text-neutral-600">
                {isDeadline(order.created_at) ? (
                  <div
                    className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold leading-4 text-emerald-800"
                  >
                    {formatLocalDateDeadline(order.created_at)}
                  </div>
                ) : (
                  <div
                    className="inline-block whitespace-nowrap rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold leading-4 text-orange-800"
                  >
                    {formatLocalDateDeadline(order.created_at)}
                  </div>
                )}
              </td>
              <td className="text-center font-medium ppy-3 ps-3">
                {isDeadline(order.created_at) && (
                  <button
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 font-medium text-slate-800 group px-2.5 py-1.5 hover:border-emerald-100 hover:bg-emerald-100 hover:text-emerald-800 active:border-slate-200">
                    Download
                  </button>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModalOrder