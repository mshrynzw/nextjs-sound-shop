import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCopy, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"

interface ModalPasswordProps {
  password: string;
}

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
          <div className="flex flex-row justify-between items-center space-x-2">
            <input type="text" value={password} className="px-2 rounded w-40" readOnly />
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-lg font-medium bg-white text-black group px-2.5 py-1.5 hover:bg-black/75 hover:text-white"
            >
              <FontAwesomeIcon icon={faCopy}/>
            </button>
          </div>
        ) : (
          <>
            <input type="password" value="************" className="px-2 rounded w-40" readOnly />
          </>
        )}
      </div>
      <button
        onClick={handlePassword}
        className="inline-flex items-center gap-1 rounded-lg  font-medium bg-white text-black group px-2.5 py-1.5 hover:bg-black/75 hover:text-white"
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