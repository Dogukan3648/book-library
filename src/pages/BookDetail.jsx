import { Star } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router";
import NotesEditor from "../components/NotesEditor";
import { LibraryContext } from "../contexts/LibraryContext";
import useBookDetail from "../hooks/useBookDetail";

function BookDetail() {
  const { bookId } = useParams();

  const {
    handleStatusChange,
    handleRatingChange,
    handleNotesChange,
    handleAddToLibrary,
  } = useContext(LibraryContext);

  const { book, isLoading, error, isInLibrary } = useBookDetail(bookId);

  if (isLoading || (!book && !error)) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="text-slate-600">Loading book details...</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">Book Not Found</h1>

        <p className="mt-4 text-slate-600">
          {error || "This book could not be found."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
        {book.cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
            alt={`${book.title} cover`}
            className="h-[420px] w-full max-w-[300px] self-center rounded-xl object-cover shadow-sm md:self-start"
          />
        ) : (
          <div className="flex h-[420px] w-full max-w-[300px] self-center items-center justify-center rounded-xl bg-slate-100 text-slate-500 md:self-start">
            No Cover
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-slate-600">{book.author}</p>

          <p className="mt-2 text-slate-500">Published: {book.publishedYear}</p>

          {isInLibrary ? (
            <>
              <div className="mt-8">
                <p className="mb-1 text-sm font-medium text-slate-500">
                  Status
                </p>

                <select
                  value={book.status}
                  onChange={(event) =>
                    handleStatusChange(book.bookId, event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:w-auto"
                >
                  <option value="want-to-read">Want to Read</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-slate-500">
                  Rating
                </p>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((ratingValue) => (
                    <button
                      key={ratingValue}
                      type="button"
                      onClick={() =>
                        handleRatingChange(book.bookId, ratingValue)
                      }
                      className="cursor-pointer transition-transform hover:scale-110"
                      aria-label={`Rate ${ratingValue} out of 5`}
                    >
                      <Star
                        size={26}
                        className={
                          ratingValue <= book.rating
                            ? "text-amber-500"
                            : "text-slate-300 hover:text-amber-400"
                        }
                        fill={
                          ratingValue <= book.rating ? "currentColor" : "none"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <NotesEditor
                key={book.bookId}
                item={book}
                onSave={handleNotesChange}
              />
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleAddToLibrary(book)}
              className="mt-8 cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Add to Library
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default BookDetail;
