import { useContext, useEffect, useState } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import { getBookById } from "../services/openLibrary";

function useBookDetail(bookId) {
  const { library } = useContext(LibraryContext);

  const [requestState, setRequestState] = useState({
    bookId: null,
    book: null,
    error: "",
  });

  const libraryBook = library.find(
    (item) => item.bookId.replace("/works/", "") === bookId,
  );

  useEffect(() => {
    if (libraryBook) {
      return;
    }

    let ignore = false;

    async function loadBook() {
      try {
        const result = await getBookById(bookId);

        if (!ignore) {
          setRequestState({
            bookId,
            book: result,
            error: "",
          });
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setRequestState({
            bookId,
            book: null,
            error: "Book details could not be loaded.",
          });
        }
      }
    }

    loadBook();

    return () => {
      ignore = true;
    };
  }, [bookId, libraryBook]);

  const hasCurrentResult = requestState.bookId === bookId;

  const apiBook = hasCurrentResult ? requestState.book : null;

  const error = !libraryBook && hasCurrentResult ? requestState.error : "";

  const isLoading = !libraryBook && !hasCurrentResult;

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
