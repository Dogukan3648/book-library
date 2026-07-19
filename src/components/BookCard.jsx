function BookCard({ book, onAddToLibrary }) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden rounded-lg">
        {book.cover ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
            alt={`${book.title} cover`}
            className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-72 items-center justify-center bg-slate-100 px-4 text-center text-sm text-slate-500">
            No cover available
          </div>
        )}
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">{book.title}</h2>

      <p className="mt-2 text-sm text-gray-600">{book.author}</p>

      <p className="mt-1 text-sm text-gray-500">{book.publishedYear}</p>

      <button
        type="button"
        onClick={() => onAddToLibrary(book)}
        className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Add to Library
      </button>
    </div>
  );
}

export default BookCard;
