import dynamic from 'next/dynamic'
import {faFacebook, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), {
  ssr: false
})

const Footer = () => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Link
          href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
          className="text-white/50"
        >
          kaoruyukisound.com
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_TWITTER_URL || "http://localhost:3000"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-500 px-1"
        >
          <FontAwesomeIcon icon={faTwitter}/>
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "http://localhost"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-red-500 px-1"
        >
          <FontAwesomeIcon icon={faYoutube}/>
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "http://localhost"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-700 px-1">
          <FontAwesomeIcon icon={faFacebook}/>
        </Link>
      </div>
      <div>Copyright © {new Date().getFullYear()} Kaoru Yuki</div>
    </>
  )
}

export default Footer