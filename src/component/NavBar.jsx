import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/results?query=${query}`);
    setQuery("");
  };

  return (
    <div div className="fixed w-[100%] ">
      <nav className="bg-gray-800 text-white p-4 md:mb-10 ">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/">
            <h1 className="text-xl font-bold">🎬 MovieApp</h1>
          </NavLink>

          <div className="flex items-center">
            <NavLink to="/">
              <p className=" md:mr-10">Home</p>
            </NavLink>

            <form
              onSubmit={handleSearch}
              className="flex gap-2 hidden md:block"
            >
              <input
                className="p-1 text-black  bg-white rounded lg:w-100  md:w-70 "
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="bg-blue-600 px-3 py-1 rounded ml-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className=" bg-[#fff] py-5 mb-10 block md:hidden">
        <div className="container mx-auto ">
          <form onSubmit={handleSearch} className="flex gap-2  ">
            <input
              className="p-1 text-black  border  rounded w-100"
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-600 px-3 py-1 rounded text-white">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
