import libraryImage from "../assets/library.jpg";
import { useState } from "react";
import { searchBooks } from "../services/openLibrary";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = async () => {
    const result = await searchBooks(searchTerm);

    setBooks(result.docs);
  };

  return (
    <>
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
                  value={searchTerm}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="rounded-lg bg-slate-900 px-10 py-3 font-medium text-white transition hover:bg-slate-700 cursor-pointer"
                  onClick={handleSearch}
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
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {book.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {book.author_name?.[0] || "Unknown author"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {book.first_publish_year || "Unknown year"}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Hero;
