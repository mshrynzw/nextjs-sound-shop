"use client"

import React, {useRef, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCirclePause} from "@fortawesome/free-regular-svg-icons"
import {faCirclePlay} from "@fortawesome/free-regular-svg-icons"

interface AudioStreamerProps {
  id: string;
}

const AudioStreamer: React.FC<AudioStreamerProps> = ({id}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="text-white text-8xl">
      <audio ref={audioRef} src={`/api/audio/${id}`}/>
      <button onClick={togglePlay} className="text-white">
        {isPlaying
          ? <FontAwesomeIcon icon={faCirclePause}/>
          : <FontAwesomeIcon icon={faCirclePlay}/>
        }
      </button>
    </div>
  )
}

export default AudioStreamer