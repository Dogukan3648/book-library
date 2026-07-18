import libraryImage from "../assets/library.jpg";
function Hero() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
              Personal Library
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Build Your Digital Bookshelf
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Search for books, save your favorites and organize your personal
              reading collection in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                placeholder="Search by title or author"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 
                text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-400"
              />
              <button
                type="button"
                className="rounded-lg bg-slate-900 px-10 py-3 font-medium text-white transition hover:bg-slate-700 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <img
              src={libraryImage}
              alt="Books arranged on library shelves"
              className="h-80 w-full rounded-2xl object-cover shadow-lg sm:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
