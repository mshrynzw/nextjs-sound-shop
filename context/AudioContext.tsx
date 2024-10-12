"use client"

import React, {createContext, useState, useContext, ReactNode} from "react"

interface AudioContextType {
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({children}) => {
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <AudioContext.Provider value={{playingId, setPlayingId}}>
      {children}
    </AudioContext.Provider>
  )
}