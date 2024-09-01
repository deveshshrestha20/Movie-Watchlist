import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import axios from "axios";

const ApiFetch = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apikey = import.meta.env.VITE_API_KEY;
  const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = query
        ? `${SEARCH_URL}${encodeURIComponent(query)}`
        : DISCOVER_URL;
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [query, DISCOVER_URL, SEARCH_URL]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="p-4 relative">
      {/* Loading State */}
      {loading && <p className="text-center mt-4">Loading movies...</p>}

      {/* Error State */}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 justify-items-center">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            date={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            name={movie.title.slice(0, 60)}
            details={movie.overview}
            rating={String(movie.vote_average).slice(0, 3) || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default ApiFetch;
