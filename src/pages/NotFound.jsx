import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6">
      <div className="text-center">
        <p className="text-5xl font-bold text-slate-900 sm:text-6xl">404</p>

        <h1 className="mt-4 text-xl font-semibold text-slate-900 sm:text-2xl">
          Page Not Found
        </h1>

        <p className="mt-2 text-slate-600">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
