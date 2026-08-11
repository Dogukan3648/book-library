import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import MyLibrary from "./pages/MyLibrary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<MyLibrary />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
