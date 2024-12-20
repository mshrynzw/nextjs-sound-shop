import React, {useState} from "react"
import dynamic from 'next/dynamic'
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"

interface ModalPasswordProps {
  password: string;
}

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), {
  ssr: false
})

const ModalPassword: React.FC<ModalPasswordProps> = ({password}) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  const handlePassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="mr-2">
        {visiblePassword ? (
          <div className="flex flex-row items-center justify-between space-x-2">
            <input type="text" value={password} className="w-40 rounded px-2" readOnly />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-lg bg-white font-medium text-black group px-2.5 py-1.5 hover:bg-black/75 hover:text-white"
            >
              <FontAwesomeIcon icon={faCopy}/>
            </button>
          </div>
        ) : (
          <>
            <input type="password" value="************" className="w-40 rounded px-2" readOnly />
          </>
        )}
      </div>
      <button
        onClick={handlePassword}
        className="inline-flex items-center gap-1 rounded-lg bg-white font-medium text-black group px-2.5 py-1.5 hover:bg-black/75 hover:text-white"
      >
        {visiblePassword ? (
          <FontAwesomeIcon icon={faEyeSlash}/>
        ) : (
          <FontAwesomeIcon icon={faEye}/>
        )}
      </button>
    </div>
  )
}

export default ModalPassword