import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";
import MyLibrary from "./pages/MyLibrary";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<MyLibrary />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default App;
