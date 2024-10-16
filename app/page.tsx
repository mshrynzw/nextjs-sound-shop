import {supabase} from "@/lib/supabaseClient"
import Button from "@/components/home/Button"
import Search from "@/components/home/Search"
import Items from "@/components/home/Items"
import {SearchProvider} from "@/context/SearchContext"
import {CartProvider} from "@/context/CartContext"
import {ModalProvider} from "@/context/ModalContext"
import Modal from "@/components/modal/Modal"
import Footer from "@/components/home/Footer"

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
  }
}

export const revalidate = 3600

const Home = async () => {
  const items = await getItems()

  return (
    <ModalProvider>
      <SearchProvider>
        <CartProvider>
          <main className="mx-auto p-4 max-w-[1960px]">
            <Modal/>
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              <div
                className="after:pointer-events-none after:absolute relative after:inset-0 mb-4 flex flex-col items-center gap-4 overflow-hidden rounded-lg after:rounded-lg bg-white/10 px-6 py-8 text-center text-white after:content h-[629px] shadow-highlight after:shadow-highlight lg:py-0">
                <div className="flex h-full w-full flex-col items-center justify-between">
                  <div className="flex w-full flex-col items-center gap-4 divide-y space-y-4">
                    <Button/>
                    <Search/>
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
  )
}

export default Home