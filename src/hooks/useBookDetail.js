import { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import { getBookById } from "../services/openLibrary";

function useBookDetail(bookId) {
  const { library } = useContext(LibraryContext);

  const [apiBook, setApiBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const libraryBook = library.find(
    (item) => item.bookId.replace("/works/", "") === bookId,
  );

  useEffect(() => {
    if (libraryBook) {
      return;
    }

    setApiBook(null);
    async function loadBook() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getBookById(bookId);
        setApiBook(result);
      } catch (error) {
        console.error(error);
        setError("Book details could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }
    loadBook();
  }, [bookId, libraryBook]);

  const book = libraryBook ?? apiBook;
  const isInLibrary = Boolean(libraryBook);

  return {
    book,
    isLoading,
    error,
    isInLibrary,
  };
}
export default useBookDetail;
