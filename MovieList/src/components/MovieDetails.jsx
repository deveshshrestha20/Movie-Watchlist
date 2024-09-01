import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TbDotsCircleHorizontal } from 'react-icons/tb';
import { FaPlay } from 'react-icons/fa';
import axios from 'axios';

const MovieDetails = ({ name, details, date, movieId }) => {
  const [open, setOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [genres, setGenres] = useState([]); // State to hold all genres
  const [movieGenres, setMovieGenres] = useState([]); // State to hold specific movie genres
  const [error, setError] = useState(null); // State for error handling
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); // State for detail expansion

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch all available genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
        setError('Failed to load genres');
      }
    };

    fetchGenres();
  }, []);

  // Fetch movie details and trailer when the modal opens
  useEffect(() => {
    if (open && movieId) {
      const fetchMovieDetails = async () => {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          
          // Fetch movie details to get genre IDs
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
          );
          const genreIds = movieResponse.data.genres.map((genre) => genre.id); // Extract genre IDs
          
          // Map genre IDs to genre names
          const matchedGenres = genres
            .filter((genre) => genreIds.includes(genre.id))
            .map((genre) => genre.name);
          setMovieGenres(matchedGenres);

          // Fetch trailer data
          const trailerResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
          );
          const trailers = trailerResponse.data.results;
          const officialTrailer = trailers.find(
            (trailer) => trailer.name === 'Official Trailer'
          );
          setTrailerUrl(
            officialTrailer ? `https://www.youtube.com/watch?v=${officialTrailer.key}` : null
          );
        } catch (error) {
          console.error('Failed to fetch movie details or trailer:', error);
          setError('Failed to load movie details');
        }
      };

      fetchMovieDetails();
    }
  }, [open, movieId, genres]);

  // Toggle details expansion
  const handleToggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  // Open trailer link in a new tab
  const handlePlayClick = () => {
    if (trailerUrl) {
      window.open(trailerUrl, '_blank');
    }
  };

  return (
    <div>
      <TbDotsCircleHorizontal
        className="absolute top-28 left-24 p-1 h-16 w-20 text-white cursor-pointer"
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="shadow-2xl"
      >
        <Box
          className="fixed inset-0 flex items-center justify-center p-4 bg-opacity-15"
          onClick={handleClose}
        >
          <div
            className="bg-maincolor p-4 rounded-lg shadow-lg h-96 w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white p-2">
              {name}
            </Typography>
            <div className="h-8 w-12 bg-red-800 absolute top-7 right-4 flex items-center justify-center rounded-lg">
              <Typography id="modal-modal-description" className="mt-2 text-white text-center p-1">
                {date}
              </Typography>
            </div>
            {/* Display genres specifically associated with the movie */}
            {movieGenres.length > 0 ? (
              <div className="text-white mt-2 p-1">
                <Typography variant="subtitle1" className="text-white">
                  Genres: {movieGenres.join(', ')}
                </Typography>
              </div>
            ) : (
              <Typography variant="subtitle1" className="text-white mt-2">
                No genres available for this movie.
              </Typography>
            )}

            {/* Display truncated or expanded details */}
            <Typography id="modal-modal-description" className="text-white text-start p-1 mt-2">
              {isDetailsExpanded ? details : `${details.slice(0, 150)}...`}
              <button
                onClick={handleToggleDetails}
                className="text-red-500 underline ml-1"
              >
                {isDetailsExpanded ? 'See Less' : 'See More'}
              </button>
            </Typography>

            {/* Display error message if there is one */}
            {error && (
              <Typography variant="body2" className="text-red-500 mt-2">
                {error}
              </Typography>
            )}

            {/* Play button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 ">
              <button
                onClick={handlePlayClick}
                className="bg-red-600 text-white px-4 py-2 rounded-3xl flex items-center gap-1"
                disabled={!trailerUrl} // Disable button if no trailer is available
              >
                <FaPlay className="text-lg" />
                Watch the Official Trailer
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieDetails;
