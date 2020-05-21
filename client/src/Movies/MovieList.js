import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from "axios";

function MovieList({ movies, setMovieList }) {

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/movies/`)
      .then(res => {
        console.log(res)
        setMovieList(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} key={movie.id}/>
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
