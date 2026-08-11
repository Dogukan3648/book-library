import { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import BookCard from "./BookCard";

const SearchResult = ({ books }) => {
  const { library, handleAddToLibrary } = useContext(LibraryContext);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  const visibleBooks = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  if (books.length === 0) {
    return null;
  }

  return (
    <>
      <p className="mx-auto max-w-7xl px-6 pt-8 text-sm text-slate-600">
        Showing {startIndex + 1}-{Math.min(endIndex, books.length)} of{" "}
        {books.length} results.
      </p>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleBooks.map((book) => {
          const isAdded = library.some((item) => item.bookId === book.key);

          return (
            <BookCard
              key={book.key}
              book={book}
              isAdded={isAdded}
              onAddToLibrary={handleAddToLibrary}
            />
          );
        })}
      </section>
      {totalPages > 1 && (
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 pb-10">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Previous
          </button>
          <p className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default SearchResult;
