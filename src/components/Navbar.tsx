import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${query}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        🎬 MovieApp
      </Link>

      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-700 px-3 py-2 rounded-md outline-none text-sm w-64 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="ml-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
