import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';

const blankForm = {
  title:'',
  director:'',
  metascore:'',
  stars:[]
}

const UpdateForm = (props) => {
  const [movieDetails, setMovieDetails] = useState(blankForm)
  const [actors, setActors] = useState(movieDetails.stars)
  const [actorToAdd, setActorToAdd] =useState('')
  const params = useParams()
  const history = useHistory()

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/movies/${params.id}`)
    .then(res =>{
       console.log('UpdateForm Axios Get Res',res)
       setMovieDetails(res.data)
      })
    .catch(err => console.log(err))
  }, [params.id])


  const changeDetails = e => {
    setMovieDetails({...movieDetails, [e.target.name]:e.target.value})
  }


  const addActorToList = e =>{
    e.preventDefault()

    //movieDetails.stars.push()
  }


  const changeActor = e => {
    
  }

  const updateDetails = e => {
    e.preventDefault()

    axios.put(`http://localhost:4000/api/movies/${params.id}`, movieDetails)
    .then(res => {
      console.log(res)
      props.setMovieList([...props.movieList, res.data])
      history.push(`/movies/${params.id}`)
    })
    .catch(err => console.log(err))

  }


  return(
    <div>
      <h1>Update Movie Info</h1>

      <form onSubmit={updateDetails}>
        <label>Title:
          <input
            name='title'
            type='text'
            value={movieDetails.title}
            onChange={changeDetails}
          />
        </label>

        <br />

        <label>Director:
          <input
            name='director'
            type='text'
            value={movieDetails.director}
            onChange={changeDetails}
          />
        </label>

        <br />

        <label>Metascore:
          <input
            name='metascore'
            type='number'
            value={movieDetails.metascore}
            onChange={changeDetails}
          />
        </label>

        <br />

        {/* <label>Actors:
          <input
            name='stars'
            type='text'
            value={movieDetails.stars}
            onChange={changeDetails}
          />
        </label> */}
        <p>Actors:</p>
        <ul> 
          {movieDetails.stars.map(star =><li><span>X</span> {star}</li>)}
        </ul>

        <label>Add Actor:
          <input
            name='addActor'
            type='text'
            value={actorToAdd}
            onChange={changeActor}
          />
        </label>
        <button>
          Add Actor
        </button>

        <br />

        <input
          name='submit'
          type='submit'
          value='Update!'
        />
      </form>
    </div>
  )
}

export default UpdateForm