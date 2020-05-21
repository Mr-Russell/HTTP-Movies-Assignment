import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:4000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault()

    axios.delete(`http://localhost:4000/api/movies/${params.id}`)
      .then(res => {
        console.log('Delete Movie Function:',res)
        //props.setMovieList()
      })
      .catch(err => console.log(err))

    history.push('/')
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button 
        onClick={()=> history.push(`/update-movie/${params.id}`)}
      >
        Update Info
      </button>

      &nbsp;

      <button onClick={deleteMovie}>
        Delete Movie
      </button>
    </div>
  );
}

export default Movie;
