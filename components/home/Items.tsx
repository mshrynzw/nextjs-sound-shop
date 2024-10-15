"use client"

import React, {useState, useEffect} from "react"
import Cookies from "js-cookie"
import Image from "next/image"
import {Item} from "@/types/item"
import AudioStreamer from "@/components/audio/AudioStreamer"
import {useSearch} from "@/context/SearchContext"
import {Tag} from "@/types/tag"
import {AudioProvider} from "@/context/AudioContext"

interface ItemsProps {
  items: Item[];
}

const Items: React.FC<ItemsProps> = ({items}) => {
  const {keyword, selectTags} = useSearch()
  const [cart, setCart] = useState<Item[]>(() => {
    const savedCart = Cookies.get("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedCart = Cookies.get("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(keyword.toLowerCase()) &&
    (selectTags.length === 0 || selectTags.every(tag => item.tags?.some(itemTag => itemTag.id === tag.id)))
  )

  const isItemInCart = (item: Item) => {
    return cart.some(cartItem => cartItem.id === item.id)
  }

  const handleAddClick = (item: Item) => {
    const updatedCart = [...cart.filter((i: Item) => i.id !== item.id), item]
    setCart(updatedCart)
    Cookies.set("cart", JSON.stringify(updatedCart), {expires: 7})
  }

  const handleRemoveClick = (item: Item) => {
    const updatedCart = cart.filter((i: Item) => i.id !== item.id)
    setCart(updatedCart)
    if (updatedCart.length > 0) {
      Cookies.set("cart", JSON.stringify(updatedCart), {expires: 7})
    } else {
      Cookies.remove("cart")
    }
  }

  return (
    <AudioProvider>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id.toString()} className="relative mb-5 w-full group">
            <div
              className="after:pointer-events-none after:absolute relative after:inset-0 mb-5 block w-full after:rounded-lg after:content group after:shadow-highlight">
              <Image
                src={`/image/${item.id.toString()}.webp`}
                alt={item.title}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{transform: "translate3d(0, 0, 0)"}}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                priority
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
              <div className="text-white text-2xl font-bold px-4 py-2 w-full text-center">
                {item.title}
              </div>

              <AudioStreamer id={item.id.toString()}/>

              <div className="font-bold text-white flex flex-wrap justify-center gap-2">
                {isClient ? (
                  isItemInCart(item) ? (
                    <button
                      className="animate-bounce bg-red-500 hover:bg-red-700 py-2 px-4 rounded shadow-2xl"
                      onClick={() => handleRemoveClick(item)}
                    >
                      Remove $ {item.price.toString()}
                    </button>
                  ) : (
                    <button
                      className="animate-bounce bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded shadow-2xl"
                      onClick={() => handleAddClick(item)}
                    >
                      Add $ {item.price.toString()}
                    </button>
                  )
                ) : (
                  <button
                    className="animate-bounce bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded shadow-2xl"
                    onClick={() => handleAddClick(item)}
                  >
                    Add $ {item.price.toString()}
                  </button>
                )}
                {item.tags?.map((tag: Tag, i: number) => (
                  tag.alias ? (
                    <div key={i} className="rounded-lg px-4 py-2 bg-black bg-opacity-50">
                      {tag.alias}
                    </div>
                  ) : (
                    <div key={i} className="rounded-lg px-4 py-2 bg-black bg-opacity-50">
                      {tag.name}
                    </div>
                  )
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </AudioProvider>
  )
}

export default Items
