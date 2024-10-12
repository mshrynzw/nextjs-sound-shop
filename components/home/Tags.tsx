"use client"

import React, {useEffect, useState} from "react"
import {supabase} from "@/lib/supabaseClient"
import {useSearch} from "@/context/SearchContext"
import {Tag} from "@/types/tag"

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const {selectTags, setSelectTags} = useSearch()

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const {data, error} = await supabase
        .from("tags")
        .select("*")
        .order("id")

      if (error) throw error
      setTags(data)
    } catch (error) {
      console.error("An error occurred while retrieving tags:", error)
    }
  }

  const handleChange = (tag: Tag) => {
    setSelectTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="max-w-[40ch] sm:max-w-[32ch]">
      <div className="text-left font-bold">Genre</div>
      <div className="mb-4 flex flex-wrap gap-x-4 text-white/75">
        {tags.map(tag => (
          tag.type === "genre" && (
            <div key={tag.id} className="space-x-2">
              <input
                type="checkbox"
                id={tag.id.toString()}
                name={tag.name}
                checked={selectTags.includes(tag)}
                onChange={() => handleChange(tag)}
              />
              <label htmlFor={tag.id.toString()}>{tag.name}</label>
            </div>
          )
        ))}
      </div>

      <div className="text-left font-bold">Instrument</div>
      <div className="mb-4 flex flex-wrap gap-x-4 text-white/75">
        {tags.map(tag => (
          tag.type === "Instrument" && (
            <div key={tag.id} className="space-x-2">
              <input
                type="checkbox"
                id={tag.id.toString()}
                name={tag.name}
                checked={selectTags.includes(tag)}
                onChange={() => handleChange(tag)}
              />
              <label htmlFor={tag.id.toString()}>{tag.name}</label>
            </div>
          )
        ))}
      </div>

      <div className="text-left font-bold">Synth</div>
      <div className="mb-4 flex flex-wrap gap-x-4 text-white/75">
        {tags.map(tag => (
          tag.type === "synth" && (
            <div key={tag.id} className="space-x-2">
              <input
                type="checkbox"
                id={tag.id.toString()}
                name={tag.name}
                checked={selectTags.includes(tag)}
                onChange={() => handleChange(tag)}
              />
              <label htmlFor={tag.id.toString()}>{tag.name}</label>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default Tags