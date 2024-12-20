import React from "react"
import type {Metadata} from "next"
import {Noto_Sans_JP} from "next/font/google"
import "./globals.css"
import {config} from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import {supabase} from "@/lib/supabaseClient"
import {NextAuthProvider} from "@/app/providers"
import {SearchProvider} from "@/context/SearchContext"
import {CartProvider} from "@/context/CartContext"
import {ModalProvider} from "@/context/ModalContext"
import Button from "@/components/layout/Button"
import Search from "@/components/layout/Search"
import Footer from "@/components/layout/Footer"
import Items from "@/components/layout/Items"

config.autoAddCss = false

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Kaoru Yuki Sound - Professional Sound Presets',
  description: 'High-quality sound presets for music producers and audio engineers. Enhance your productions with Kaoru Yuki Sound.',
  keywords: 'sound presets, audio production, music production, Kaoru Yuki',
  openGraph: {
    type: 'website',
    url: 'https://www.yourwebsite.com',
    title: 'Kaoru Yuki Sound - Professional Sound Presets',
    description: 'High-quality sound presets for music producers and audio engineers.',
    images: [
      {
        url: '/icon/icon.png',
        width: 1200,
        height: 630,
        alt: 'Kaoru Yuki Sound',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Oo_kaoruyuki_oO',
    creator: '@Oo_kaoruyuki_oO',
    title: 'Kaoru Yuki Sound - Professional Sound Presets',
    description: 'High-quality sound presets for music producers and audio engineers.',
    images: '/icon/icon.png',
  },
}

const getItems = async () => {
  try {
    const {data: items, error: itemsError} = await supabase
      .from("items")
      .select("*")

    if (itemsError) throw itemsError

    const {data: tags, error: tagsError} = await supabase
      .from("tags")
      .select("*")

    if (tagsError) throw tagsError

    return items.map(item => ({
      ...item,
      tags: item.tag_ids.map((tagId: number) => tags.find(tag => tag.id === tagId)).filter(Boolean)
    }))
  } catch (error) {
    console.error("Error fetching items and tags:", error)
    return []
  }
}

export const revalidate = 3600

const RootLayout = async ({children}: Readonly<{ children: React.ReactNode }>) => {
  const items = await getItems()

  return (
    <html lang="en" className={notoSansJP.className}>
    <body className="bg-black antialiased">
    <NextAuthProvider>
      <ModalProvider>
        <SearchProvider>
          <CartProvider>
            <main className="mx-auto p-4 max-w-[1960px]">
              {children}
              <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                <div
                  className="after:pointer-events-none after:absolute relative after:inset-0 mb-4 flex flex-col items-center gap-4 overflow-hidden rounded-lg after:rounded-lg bg-white/10 px-6 py-8 text-center text-white after:content h-[935px] shadow-highlight after:shadow-highlight lg:py-0">
                  <div className="flex h-full w-full flex-col items-center justify-between">
                    <div className="flex w-full flex-col items-center gap-4 divide-y space-y-4">
                      <Button/>
                      <Search/>
                      <div className="mx-12 py-4 text-white/75">
                        Each item in this collection includes
                        <br/>
                        <span className="font-bold text-white">10 preset</span> configurations.
                        <br/>
                        In these presets, <span className="font-bold text-white">the delay and reverb effects are initially set to OFF</span>,
                        <br/>
                        allowing you to start with a clean sound and customize the effects to your preference.
                      </div>
                    </div>
                    <div className="my-8">
                      <Footer/>
                    </div>
                  </div>
                </div>
                <Items items={items || []}/>
              </div>
            </main>
          </CartProvider>
        </SearchProvider>
      </ModalProvider>
    </NextAuthProvider>
    </body>
    </html>
  )
}

export default RootLayout
