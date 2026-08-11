import { useContext, useState } from "react";
import { Link } from "react-router";
import LibraryBookCard from "../components/LibraryBookCard";
import LibraryStats from "../components/LibraryStats";
import { LibraryContext } from "../contexts/LibraryContext";

function MyLibrary() {
  const { library } = useContext(LibraryContext);

  const [filter, setFilter] = useState("all");

  const filteredLibrary = library.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "favorites") {
      return item.isFavorite;
    }

    return item.status === filter;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          My Library
        </h1>
        <div className="mt-6">
          <LibraryStats library={library} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => setFilter("want-to-read")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "want-to-read"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Want to Read
          </button>

          <button
            type="button"
            onClick={() => setFilter("reading")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "reading"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Reading
          </button>

          <button
            type="button"
            onClick={() => setFilter("read")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "read"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Read
          </button>

          <button
            type="button"
            onClick={() => setFilter("favorites")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "favorites"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {library.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-10">
          <h2 className="text-xl font-semibold text-slate-900">
            Your Library is Empty.
          </h2>

          <p className="mt-2 text-slate-600">
            Search for books and add them to your personal library.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Find Books
          </Link>
        </div>
      ) : filteredLibrary.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-10">
          <h2 className="text-xl font-semibold text-slate-900">
            No Books Found
          </h2>

          <p className="mt-2 text-slate-600">
            No books match the selected filter.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-6 cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Show All Books
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLibrary.map((item) => (
            <LibraryBookCard key={item.bookId} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyLibrary;
