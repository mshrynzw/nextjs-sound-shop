import Image from "next/image"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCirclePlay} from "@fortawesome/free-regular-svg-icons"

const Item = () => {
  return (
    <div className="relative mb-5 w-full group">
      <div
        className="after:pointer-events-none after:absolute relative after:inset-0 mb-5 block w-full after:rounded-lg after:content group after:shadow-highlight">
        <Image
          src="/image/sample.webp"
          alt="Next.js Conf photo"
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{transform: "translate3d(0, 0, 0)"}}
          width={720}
          height={480}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        <div className="text-white text-2xl font-bold px-4 py-2 w-full text-center">
          Uplifting Trance Sylenth1 Bass 2024 Vol.1
        </div>
        <div className="text-white text-8xl">
          <FontAwesomeIcon icon={faCirclePlay}/>
        </div>
        <div className="font-bold text-white flex flex-wrap justify-center gap-2">
          <button className="animate-bounce bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded shadow-2xl">$ 1</button>
          <div className="rounded-lg px-4 py-2 bg-black bg-opacity-50">Uplifting Trance</div>
          <div className="rounded-lg px-4 py-2 bg-black bg-opacity-50">Sylenth 1</div>
          <div className="rounded-lg px-4 py-2 bg-black bg-opacity-50">Bass</div>
        </div>
      </div>
    </div>
  )
}

export default Item