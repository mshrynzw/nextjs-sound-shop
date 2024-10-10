import Button from "@/components/home/Button"
import Search from "@/components/home/Search"
import Item from "@/components/home/Item"

const Main = () => {
  return (
    <main className="mx-auto p-4 max-w-[1960px]">
      {/* {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )} */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div
          className="after:pointer-events-none after:absolute relative after:inset-0 flex flex-col items-center gap-4 overflow-hidden rounded-lg after:rounded-lg bg-white/10 px-6 py-8 text-center text-white after:content h-[629px] shadow-highlight after:shadow-highlight lg:py-0 mb-4">
          <div className="flex flex-col items-center justify-between h-full w-full">
            <div className="flex flex-col items-center gap-4 w-full divide-y space-y-4">
              <Button/>
              <Search/>
            </div>
            <div className="my-8 text-white/50">
              <div>kaoruyukisound.com</div>
              <div>Copyright © {new Date().getFullYear()} Kaoru Yuki</div>
            </div>
          </div>
        </div>

        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>

        {/* {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:pointer-events-none after:absolute relative after:inset-0 mb-5 block w-full cursor-zoom-in after:rounded-lg after:content group after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))} */}
      </div>
    </main>
  )
}

export default Main