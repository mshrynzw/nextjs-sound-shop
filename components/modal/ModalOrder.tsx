"use client"

import React, {useEffect, useState} from "react"
import {supabase} from "@/lib/supabaseClient"
import {formatLocalDate, formatLocalDateDeadline, isDeadline} from "@/lib/datetime"
import {useModal} from "@/context/ModalContext"
import {useSession} from "next-auth/react"
import ModalDownload from "@/components/modal/ModalDownload"
import ModalPagination from "@/components/modal/ModalPagination"
import ModalPassword from "@/components/modal/ModalPassword"

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

const ModalOrder = () => {
  const {closeModal} = useModal()
  const {data: session, status} = useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const ordersPerPage = 5

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") {
      setError("User not authenticated.")
      return
    }

    const fetchOrders = async () => {
      const {data, error, count} = await supabase
        .from("orders")
        .select(`
          id,
          item_id,
          updated_at,
          items!inner (
            title,
            price
          ),
          password
         `, {count: "exact"})
        .eq("email", session?.user?.email)
        .order("id", {ascending: false})
        .range((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage - 1)

      if (error) {
        console.error("Error getting order data:", error)
        setError("Error getting order data.")
      } else {
        setOrderItems(data as unknown as OrderItem[])
        setTotalPages(Math.ceil((count || 0) / ordersPerPage))
      }
    }

    fetchOrders()
  }, [status, session, currentPage, ordersPerPage])

  return (
    <div className="space-y-4">
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
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
                  <th
                    className="px-3 py-2 text-center text-sm font-semibold uppercase tracking-wider text-neutral-700 min-w-[140px]"
                  >
                    Password
                  </th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {orderItems.map(orderItem => (
                  <tr key={orderItem.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-3 text-center font-semibold text-neutral-600">
                      {orderItem.id}
                    </td>
                    <td className="p-3 text-start text-neutral-600">
                      {formatLocalDate(orderItem.updated_at)}
                    </td>
                    <td className="p-3 text-start text-black">
                      {orderItem.items.title}
                    </td>
                    <td className="p-3 font-medium text-neutral-600">
                      <div
                        className="underline decoration-neutral-200 decoration-2 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-300">
                        $ {orderItem.items.price}
                      </div>
                    </td>
                    <td className="p-3 text-start text-neutral-600">
                      {isDeadline(orderItem.updated_at) ? (
                        <div
                          className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold leading-4 text-emerald-800"
                        >
                          {formatLocalDateDeadline(orderItem.updated_at)}
                        </div>
                      ) : (
                        <div
                          className="inline-block whitespace-nowrap rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold leading-4 text-orange-800"
                        >
                          {formatLocalDateDeadline(orderItem.updated_at)}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-start text-neutral-600">
                      {isDeadline(orderItem.updated_at) && (
                        <ModalPassword password={orderItem.password}/>
                      )}
                    </td>
                    <td className="text-center font-medium ppy-3 ps-3">
                      {isDeadline(orderItem.updated_at) && (
                        <ModalDownload orderItem={orderItem}/>
                      )}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <ModalPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
        </>
      )}
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

export default ModalOrder