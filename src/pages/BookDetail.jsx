import { Star } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router";
import NotesEditor from "../components/NotesEditor";
import { LibraryContext } from "../contexts/LibraryContext";

function BookDetail() {
  const { bookId } = useParams();

  const { library, handleStatusChange, handleRatingChange, handleNotesChange } =
    useContext(LibraryContext);

  const book = library.find(
    (item) => item.bookId.replace("/works/", "") === bookId,
  );

  if (!book) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">Book Not Found</h1>

        <p className="mt-4 text-slate-600">
          This book could not be found in your library...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {book.cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
            alt={`${book.title} cover`}
            className="h-[420px] w-[300px] rounded-xl object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-[420px] w-[300px] items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            No Cover
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{book.author}</p>

          <p className="mt-2 text-slate-500">Published: {book.publishedYear}</p>

          <div className="mt-8">
            <p className="mb-1 text-sm text-slate-500">Status</p>
            <select
              value={book.status}
              onChange={(event) =>
                handleStatusChange(book.bookId, event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
            >
              <option value="want-to-read">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm text-slate-500">Rating</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((ratingValue) => (
                <button
                  key={ratingValue}
                  type="button"
                  onClick={() => handleRatingChange(book.bookId, ratingValue)}
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
                    fill={ratingValue <= book.rating ? "currentColor" : "none"}
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
        </div>
      </div>
    </main>
  );
}

export default BookDetail;
