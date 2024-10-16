import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="text-white/50">kaoruyukisound.com</div>
        <div className="rounded px-1 bg-blue-500"><FontAwesomeIcon icon={faTwitter}/></div>
        <div className="rounded px-1 bg-blue-700"><FontAwesomeIcon icon={faFacebook}/></div>
        <div className="rounded px-1 bg-red-500"><FontAwesomeIcon icon={faYoutube}/></div>
      </div>
      <div>Copyright © {new Date().getFullYear()} Kaoru Yuki</div>
    </>
  )
}

export default Footer