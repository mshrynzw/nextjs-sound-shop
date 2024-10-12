"use client"

import React, {createContext, useState, useContext, ReactNode} from "react"
import {Tag} from "@/types/tag"

interface SearchContextType {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  selectTags: Tag[];
  setSelectTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({children}) => {
  const [keyword, setKeyword] = useState("")
  const [selectTags, setSelectTags] = useState<Tag[]>([])

  return (
    <SearchContext.Provider value={{keyword, setKeyword, selectTags, setSelectTags}}>
      {children}
    </SearchContext.Provider>
  )
}