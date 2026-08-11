import { useState } from "react";
import libraryImage from "../assets/library.jpg";
import { searchBooks } from "../services/openLibrary";
import SearchResult from "./SearchResult";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (error) {
      setError("");
    }
  };

  async function handleSearch(event) {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setError("Please enter a book title or author.");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      setHasSearched(true);

      const result = await searchBooks(searchTerm.trim());
      setBooks(result);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while searching for books.");
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="bg-slate-50 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

              <form
                onSubmit={handleSearch}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="search"
                  placeholder="Search by title or author"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-400 transition focus:ring-offset-1"
                  value={searchTerm}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-slate-900 px-10 py-3 font-medium 
                  text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </form>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {hasSearched && !isLoading && !error && books.length === 0 && (
                <p className="mt-4 text-sm text-slate-600">No Books Found.</p>
              )}
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

      {!isLoading && !error && <SearchResult books={books} />}
    </>
  );
}

export default Hero;
