"use client"

import React, {useRef, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCirclePause} from "@fortawesome/free-regular-svg-icons"
import {faCirclePlay} from "@fortawesome/free-regular-svg-icons"
import {useAudio} from "@/context/AudioContext"

interface AudioStreamerProps {
  id: string;
}

const AudioStreamer: React.FC<AudioStreamerProps> = ({id}) => {
  const {playingId, setPlayingId} = useAudio()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (playingId !== id && audioRef.current) {
      audioRef.current.pause()
    }
  }, [playingId, id])

  const pauseAllAudio = () => {
    document.querySelectorAll("audio").forEach((audio: HTMLAudioElement) => {
      audio.pause()
    })
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (playingId === id) {
        audioRef.current.pause()
        setPlayingId(null)
      } else {
        pauseAllAudio()
        audioRef.current.play()
        setPlayingId(id)
      }
    }
  }

  return (
    <div className="text-white text-8xl">
      <audio ref={audioRef} src={`/api/audio/${id}`}/>
      <button onClick={togglePlay} className="audio-play-icon">
        {playingId === id
          ? <FontAwesomeIcon icon={faCirclePause} className="playing"/>
          : <FontAwesomeIcon icon={faCirclePlay}/>
        }
      </button>
    </div>
  )
}

export default AudioStreamer
