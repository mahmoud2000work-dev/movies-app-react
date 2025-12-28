import type { Movie } from "../types/movie";
import "tailwindcss";


interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
        <p className="text-sm text-gray-400">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
