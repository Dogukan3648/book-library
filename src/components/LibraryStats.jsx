const LibraryStats = ({ library = [] }) => {
  const totalBooks = library.length;

  const wantToReadCount = library.filter(
    (item) => item.status === "want-to-read",
  ).length;

  const readingCount = library.filter(
    (item) => item.status === "reading",
  ).length;

  const readCount = library.filter((item) => item.status === "read").length;

  const favoriteCount = library.filter((item) => item.isFavorite).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-slate-500 font-medium">Total Books</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {totalBooks}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-slate-500 font-medium">Want to Read</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {wantToReadCount}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-slate-500 font-medium">Reading</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {readingCount}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm text-slate-500 font-medium">Read</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {readCount}
        </p>
      </div>

      <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1 sm:p-5">
        <p className="text-sm text-slate-500 font-medium">Favorites</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {favoriteCount}
        </p>
      </div>
    </div>
  );
};

export default LibraryStats;
