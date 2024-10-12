"use client"

import React from "react"
import {useSearch} from "@/context/SearchContext"
import Tags from "@/components/home/Tags"

const Search = () => {
  const {setKeyword} = useSearch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  return (
    <div>
      <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
        Search
      </h1>

      <Tags/>

      <div className="max-w-[40ch] sm:max-w-[32ch]">
        <input
          type="text"
          id="keyword"
          name="keyword"
          className="w-full px-2 rounded text-black"
          placeholder="Keyword..."
          onChange={handleChange}/>
      </div>
    </div>
  )
}

export default Search