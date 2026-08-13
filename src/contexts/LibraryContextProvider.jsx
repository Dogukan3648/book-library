import { useEffect, useState } from "react";
import { LibraryContext } from "./LibraryContext";

function LibraryContextProvider({ children }) {
  const [library, setLibrary] = useState(() => {
    try {
      const savedLibrary = localStorage.getItem("bookvault-library");

      return savedLibrary ? JSON.parse(savedLibrary) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bookvault-library", JSON.stringify(library));
  }, [library]);

  function handleAddToLibrary(book) {
    const isAlreadyAdded = library.some((item) => item.bookId === book.key);

    if (isAlreadyAdded) {
      return;
    }
    const libraryItem = {
      bookId: book.key,
      title: book.title,
      author: book.author,
      cover: book.cover,
      publishedYear: book.publishedYear,
      status: "want-to-read",
      rating: null,
      notes: "",
      isFavorite: false,
      addedAt: new Date().toISOString(),
    };

    setLibrary((currentLibrary) => [...currentLibrary, libraryItem]);
  }

  function handleStatusChange(bookId, newStatus) {
    setLibrary((currentLibrary) =>
      currentLibrary.map((item) =>
        item.bookId === bookId ? { ...item, status: newStatus } : item,
      ),
    );
  }

  const handleToggleFavorite = (bookId) => {
    setLibrary((currentLibrary) =>
      currentLibrary.map((item) =>
        item.bookId === bookId
          ? { ...item, isFavorite: !item.isFavorite }
          : item,
      ),
    );
  };
  const handleRemoveBook = (bookId) => {
    setLibrary((currentLibrary) =>
      currentLibrary.filter((item) => item.bookId !== bookId),
    );
  };

  const handleRatingChange = (bookId, newRating) => {
    setLibrary((currentLibrary) =>
      currentLibrary.map((item) =>
        item.bookId === bookId ? { ...item, rating: newRating } : item,
      ),
    );
  };
  const handleNotesChange = (bookId, newNotes) => {
    setLibrary((currentLibrary) =>
      currentLibrary.map((item) =>
        item.bookId === bookId ? { ...item, notes: newNotes } : item,
      ),
    );
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        setLibrary,
        handleAddToLibrary,
        handleStatusChange,
        handleToggleFavorite,
        handleRemoveBook,
        handleRatingChange,
        handleNotesChange,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export default LibraryContextProvider;
