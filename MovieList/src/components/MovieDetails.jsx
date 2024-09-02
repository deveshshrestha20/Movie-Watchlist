import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlay } from 'react-icons/fa';
import axios from 'axios';

const MovieDetails = ({ name, details, date, movieId, mediaType }) => {
  const [open, setOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [itemGenres, setItemGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        const [movieGenresResponse, tvGenresResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`),
        ]);

        const combinedGenres = [
          ...movieGenresResponse.data.genres,
          ...tvGenresResponse.data.genres,
        ];
        setAllGenres(combinedGenres);
        
      } catch (err) {
        console.error('Failed to fetch genres:', err);
        setError('Failed to load genres');
      }
    };

    fetchAllGenres();
  }, []);

  useEffect(() => {
    if (open && movieId) {
      const fetchItemDetails = async () => {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${apiKey}`;
          
          const itemResponse = await axios.get(detailsUrl);
          const genreIds = itemResponse.data.genres.map((genre) => genre.id);
          
          const matchedGenres = allGenres
            .filter((genre) => genreIds.includes(genre.id))
            .map((genre) => genre.name);
          setItemGenres(matchedGenres);

          const trailerResponse = await axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=${apiKey}`
          );
          const trailers = trailerResponse.data.results;
          console.log(trailers)
          const officialTrailer = trailers.find(
            (trailer) => trailer.name === 'Official Trailer' || trailer.type === 'Trailer' || trailer.name === 'Official Trailer [Subtitled]'
          );
          setTrailerUrl(
            officialTrailer ? `https://www.youtube.com/watch?v=${officialTrailer.key}` : null
          );
        } catch (error) {
          console.error('Failed to fetch item details or trailer:', error);
          setError('Failed to load item details');
        }
      };

      fetchItemDetails();
    }
  }, [open, movieId, allGenres, mediaType]);

  const handleToggleDetails = () => setIsDetailsExpanded(!isDetailsExpanded);

  const handlePlayClick = () => {
    if (trailerUrl) {
      window.open(trailerUrl, '_blank');
    }
  };

  return (
    <div>
      <HiDotsHorizontal
        className="absolute top-0 right-1 mt-2 h-11 w-12 text-white cursor-pointer"
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="shadow-2xl"
      >
        <Box
          className="fixed inset-0 flex items-center justify-center p-4 bg-opacity-20"
          onClick={handleClose}
        >
          <div
            className="bg-maincolor text-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-72 max-h-screen relative overflow-auto sm:max-w-xl sm:h-96"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography id="modal-title" variant="h5" component="h2" className="text-xl font-bold mb-2">
              {name}
            </Typography>
            <div className="bg-red-800 absolute top-7 right-4 p-2 rounded-lg">
              <Typography id="modal-description" className="text-white text-center text-sm">
                {date}
              </Typography>
            </div>

            {itemGenres.length > 0 ? (
              <div className="mt-4 mb-2">
                <Typography variant="subtitle1" className="text-sm">
                  Genres: {itemGenres.join(', ')}
                </Typography>
              </div>
            ) : (
              <Typography variant="subtitle1" className="text-sm">
                No genres available.
              </Typography>
            )}

            <Typography id="modal-description" className="text-start mt-4">
              {isDetailsExpanded ? details : `${details.slice(0, 150)}...`}
              <button
                onClick={handleToggleDetails}
                className="text-red-500 underline ml-1"
              >
                {isDetailsExpanded ? 'See Less' : 'See More'}
              </button>
            </Typography>

            {error && (
              <Typography variant="body2" className="text-red-500 mt-2">
                {error}
              </Typography>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
              <button
                onClick={handlePlayClick}
                className="bg-red-600 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
                disabled={!trailerUrl}
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
