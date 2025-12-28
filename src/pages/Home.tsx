import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import MovieSkeleton from "../components/MovieSkeleton";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const baseUrl = "https://api.themoviedb.org/3";
        const endpoint = query
          ? `${baseUrl}/search/movie`
          : `${baseUrl}/movie/popular`;

        const res = await axios.get(endpoint, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            query: query || "",
            language: "en-US",
            page: 1,
          },
        });

        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {query ? `Results for "${query}"` : "Popular Movies 🎬"}
      </h1>

      {loading ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-image.png"
                  }
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-lg font-semibold truncate">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
