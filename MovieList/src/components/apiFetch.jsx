import React, { useState, useEffect } from 'react'
import Card from './Card';

const ApiFetch = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const apikey = import.meta.env.VITE_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3/discover/movie?"

    useEffect(()=> {
        const fetchMovies = async() => {
            try{
            const response = await fetch(`${BASE_URL}api_key=${apikey}`);
            const movie = await response.json() 
            setMovies(movie.results);
            console.log(movie);
            
            } catch(err) {
                setError(err);
                console.error("Error Fetching Movies:", err)
            }
            
        }
        fetchMovies();
    },[apikey])
    

  return (
    <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4  justify-items-center'>
  {movies.map((movie) => (
    <Card
      key={movie.id}
      title={movie.title}
      image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
    />
  ))}
</div>
  )
}

export default ApiFetch