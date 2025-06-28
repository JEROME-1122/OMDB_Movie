import { Routes, Route } from "react-router";
import { Home, MovieDetails, SearchResults } from "./pages";
import { Footer, Navbar } from "./component";
import "./App.css";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
