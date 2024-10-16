import React from "react"
import type {Metadata} from "next"
import {Noto_Sans_JP} from "next/font/google"
import "./globals.css"
import {config} from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import {NextAuthProvider} from "@/app/providers"

config.autoAddCss = false

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kaoru Yuki Sound",
  description: "Sound Presets",
}

const RootLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={notoSansJP.className}>
    <body className="bg-black antialiased">
    <NextAuthProvider>{children}</NextAuthProvider>
    </body>
    </html>
  )
}

export default RootLayout