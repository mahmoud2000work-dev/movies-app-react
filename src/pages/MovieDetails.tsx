import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";


const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
        try {
            const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
                params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                language: "en-US",
                },
            }
            );
            setMovie(res.data);
        } catch (err) {
            console.error("Error fetching movie details:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchMovie();
    }, [id]);

    if (loading) {
    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
        <MovieDetailsSkeleton />
        </div>
    );
    }

    if (!movie)
        return (
        <div className="text-center text-white mt-10">Movie not found 😢</div>
        );

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
        <Link to="/" className="text-cyan-400 underline mb-4 inline-block">
            ← Back
        </Link>
        <div className="flex flex-col md:flex-row gap-8">
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
            />
            <div>
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
            <p className="text-gray-400 mb-2">
                Release date: {movie.release_date}
            </p>
            <p className="text-yellow-400 text-lg mb-6">
                ⭐ {movie.vote_average.toFixed(1)}
            </p>
            <p className="leading-relaxed">{movie.overview}</p>
            </div>
        </div>
        </div>
    );
    };

    export default MovieDetails;
