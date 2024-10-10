const Button = () => {
  return (
    <div className="mt-4 space-x-4">
      {true ? (
        <button
          className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        >
          Login / Sign up
        </button>
      ) : (
        <button
          className="z-10 mt-6 rounded-lg border border-white bg-white/90 px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
        >
          Logout
        </button>
      )}

      <button
        className="z-10 mt-6 rounded-lg uppercase border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        Checkout
      </button>

      <button
        className="z-10 mt-6 rounded-lg uppercase border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition pointer hover:bg-white/10 hover:text-white md:mt-4"
      >
        Donate
      </button>
    </div>
  )
}

export default Button