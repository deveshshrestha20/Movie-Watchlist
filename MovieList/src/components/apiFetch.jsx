import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import axios from 'axios';

const ApiFetch = ({ query }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apikey = import.meta.env.VITE_API_KEY;
  const DISCOVER_MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`;
  const DISCOVER_TV_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}`;
  const SEARCH_MOVIE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
  const SEARCH_TV_URL = `https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=`;

  // Fetch movies and TV series based on search query or discover
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const movieUrl = query ? `${SEARCH_MOVIE_URL}${encodeURIComponent(query)}` : DISCOVER_MOVIE_URL;
      const tvUrl = query ? `${SEARCH_TV_URL}${encodeURIComponent(query)}` : DISCOVER_TV_URL;

      // Fetch both movies and TV series
      const [moviesResponse, tvResponse] = await Promise.all([
        axios.get(movieUrl),
        axios.get(tvUrl),
      ]);

      // Combine and tag each item with its type (`movie` or `tv`)
      const combinedResults = [
        ...moviesResponse.data.results.map((item) => ({ ...item, media_type: 'movie' })),
        ...tvResponse.data.results.map((item) => ({ ...item, media_type: 'tv' })),
      ];

      setItems(combinedResults);
    } catch (error) {
      setError('Failed to fetch items. Please try again later.');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, [query, DISCOVER_MOVIE_URL, DISCOVER_TV_URL, SEARCH_MOVIE_URL, SEARCH_TV_URL]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) {
    return <p className="text-center mt-4">Loading items...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  // Filter items to remove those without images and with a rating of 0
  const filteredItems = items.filter(
    (item) => item.poster_path && item.vote_average > 0
  );

  if (filteredItems.length === 0) {
    return <p className="text-center mt-4">No items found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 justify-items-center">
      {filteredItems.map((item) => (
        <Card
          key={item.id}
          title={item.title || item.name} 
          image={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          date={
            item.release_date
              ? item.release_date.slice(0, 4)
              : item.first_air_date
              ? item.first_air_date.slice(0, 4)
              : 'N/A'
          }
          name={item.title || item.name}
          details={item.overview}
          rating={String(item.vote_average).slice(0, 3) || 'N/A'}
          movieId={item.id}
          mediaType={item.media_type} 
        />
      ))}
    </div>
  );
};

export default ApiFetch;
