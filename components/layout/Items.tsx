"use client"

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {faCartPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Item} from "@/types/item"
import AudioStreamer from "@/components/audio/AudioStreamer"
import {useSearch} from "@/context/SearchContext"
import {Tag} from "@/types/tag"
import {AudioProvider} from "@/context/AudioContext"
import {useCart} from "@/context/CartContext"
import seedrandom from "seedrandom"

interface ItemsProps {
  items: Item[];
}

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), {
  ssr: false
})

interface AnimatedItemProps {
  item: Item;
  handleAddClick: (item: Item) => void;
  handleRemoveClick: (item: Item) => void;
  isItemInCart: (item: Item) => boolean;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ item, handleAddClick, handleRemoveClick, isItemInCart }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isInCart = mounted ? isItemInCart(item) : false

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      key={item.id.toString()}
      className="relative mb-5 w-full group"
    >
      <div
        className="after:pointer-events-none after:absolute relative after:inset-0 mb-5 block w-full after:rounded-lg after:shadow-highlight">
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
        <div className="w-full px-4 py-2 text-center text-2xl font-bold text-white">
          {item.title}
        </div>

        <AudioStreamer id={item.id.toString()}/>

        <div className="font-bold text-white space-y-2">
          <div className="flex flex-wrap justify-center">
            {isInCart ? (
              <button
                className="rounded bg-red-500 px-4 py-2 shadow-2xl hover:bg-red-700"
                onClick={() => handleRemoveClick(item)}
              >
                <div className="flex items-center justify-between space-x-2">
                  <FontAwesomeIcon icon={faTrash}/>
                  <div>$ {item.price.toString()}</div>
                </div>
              </button>
            ) : (
              <button
                className={`rounded bg-blue-500 px-4 py-2 shadow-2xl hover:bg-blue-700 ${mounted ? 'animate-bounce' : ''}`}
                onClick={() => handleAddClick(item)}
              >
                <div className="flex items-center justify-between space-x-2">
                  <FontAwesomeIcon icon={faCartPlus}/>
                  <div>$ {item.price.toString()}</div>
                </div>
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2 font-bold text-white">
            {item.tags?.sort((a, b) => a.id - b.id).map((tag: Tag) => (
              tag.alias ? (
                <div key={tag.id} className="rounded-lg bg-black bg-opacity-50 px-4 py-2">
                  {tag.alias}
                </div>
              ) : (
                <div key={tag.id} className="rounded-lg bg-black bg-opacity-50 px-4 py-2">
                  {tag.name}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </motion.li>
  )
}

const Items: React.FC<ItemsProps> = ({items}) => {
  const {keyword, selectTags} = useSearch()
  const {cart, addToCart, removeFromCart, clearCart, isItemInCart} = useCart()

  const [randomSeed, setRandomSeed] = useState(0)

  useEffect(() => {
    setRandomSeed(Math.random())
  }, [])

  const shuffleArray = (array: Item[], seed: number) => {
    const shuffled = [...array]
    const rng = seedrandom(seed.toString())
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const filteredItems = useMemo(() => {
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (selectTags.length === 0 || selectTags.every(tag => item.tags?.some(itemTag => itemTag.id === tag.id)))
    )
    return shuffleArray(filtered, randomSeed)
  }, [items, keyword, selectTags, randomSeed])

  const handleAddClick = (item: Item) => {
    addToCart(item)
  }

  const handleRemoveClick = (item: Item) => {
    removeFromCart(item)
    if (cart.length === 0) clearCart()
  }

  return (
    <AudioProvider>
      <ul>
        {filteredItems.map((item) => (
          <AnimatedItem
            key={item.id.toString()}
            item={item}
            handleAddClick={handleAddClick}
            handleRemoveClick={handleRemoveClick}
            isItemInCart={isItemInCart}
          />
        ))}
      </ul>
    </AudioProvider>
  )
}

export default Items
