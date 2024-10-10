const Search = () => {
  return (
    <div>
      <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
        Search
      </h1>
      <div className="mb-4 flex flex-wrap gap-4 text-white/75 max-w-[40ch] sm:max-w-[32ch]">
        <div className="space-x-2">
          <input type="checkbox" id="sylenth1" name="sylenth1"/>
          <label htmlFor="sylenth1">Sylenth1</label>
        </div>

        <div className="space-x-2">
          <input type="checkbox" id="upliftingTrance" name="upliftingTrance"/>
          <label htmlFor="upliftingTrance">Uplifting Trance</label>
        </div>

        <div className="space-x-2">
          <input type="checkbox" id="bass" name="bass"/>
          <label htmlFor="bass">Bass</label>
        </div>

        <div className="space-x-2">
          <input type="checkbox" id="lead" name="lead"/>
          <label htmlFor="lead">Lead</label>
        </div>
      </div>
      <div className="max-w-[40ch] sm:max-w-[32ch]">
        <input type="text" className="w-full px-2 rounded" id="keyword" name="keyword" placeholder="Search..."/>
      </div>
    </div>
  )
}

export default Search