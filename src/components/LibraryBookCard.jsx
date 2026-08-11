import { Star, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";
import { LibraryContext } from "../contexts/LibraryContext";
import NotesEditor from "./NotesEditor";

const LibraryBookCard = ({ item }) => {
  const {
    handleStatusChange,
    handleToggleFavorite,
    handleRemoveBook,
    handleRatingChange,
    handleNotesChange,
  } = useContext(LibraryContext);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        {item.cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${item.cover}-M.jpg`}
            alt={`${item.title} cover`}
            className="h-40 w-28 rounded-lg object-cover self-center sm:self-start"
          />
        ) : (
          <div className="flex h-40 w-28 items-center justify-center rounded-lg bg-slate-100 px-2 text-center text-sm text-slate-500 self-center sm:self-start">
            No Cover
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900 min-w-0 break-words">
              <Link
                to={`/book/${item.bookId.replace("/works/", "")}`}
                className="cursor-pointer text-slate-900 transition hover:text-slate-600 hover:underline"
              >
                {item.title}
              </Link>
            </h2>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleFavorite(item.bookId)}
                className="cursor-pointer transition-transform hover:scale-110"
                aria-label={
                  item.isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Star
                  size={24}
                  className={
                    item.isFavorite
                      ? "text-amber-500"
                      : "text-slate-400 hover:text-amber-500"
                  }
                  fill={item.isFavorite ? "currentColor" : "none"}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to remove this book from your library?",
                  );

                  if (confirmed) {
                    handleRemoveBook(item.bookId);
                  }
                }}
                className="cursor-pointer text-slate-400 transition hover:text-red-500"
                aria-label="Remove book from library"
              >
                <Trash2 size={22} />
              </button>
            </div>
          </div>

          <p className="mt-1 text-slate-600">{item.author}</p>

          <p className="mt-1 text-sm text-slate-500">{item.publishedYear}</p>

          <div className="mt-4">
            <p className="mb-1 text-sm text-slate-500">Rating</p>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((ratingValue) => (
                <button
                  key={ratingValue}
                  type="button"
                  onClick={() => handleRatingChange(item.bookId, ratingValue)}
                  className="cursor-pointer transition-transform hover:scale-110"
                  aria-label={`Rate ${ratingValue} out of 5`}
                >
                  <Star
                    size={22}
                    className={
                      ratingValue <= item.rating
                        ? "text-amber-500"
                        : "text-slate-300 hover:text-amber-400"
                    }
                    fill={ratingValue <= item.rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>

          <NotesEditor item={item} onSave={handleNotesChange} />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-10">
            <div>
              <p className="text-sm text-slate-500">Status</p>

              <select
                value={item.status}
                onChange={(event) =>
                  handleStatusChange(item.bookId, event.target.value)
                }
                className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 w-full sm:w-auto transition"
              >
                <option value="want-to-read">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
            </div>

            <div>
              <p className="text-sm text-slate-500">Added Date</p>

              <p className="font-medium text-slate-900">
                {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LibraryBookCard;
