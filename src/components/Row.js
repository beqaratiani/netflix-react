import React, { useState, useEffect } from 'react'
import axios from '../axios'
import '../Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailer, setTrailer] = useState('')
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleMovie = (movie) => {
    if (trailer) {
      setTrailer('')
    } else {
      movieTrailer(movie?.title || movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          console.log(urlParams)
          setTrailer(urlParams.get('v'))
          console.log(trailer)
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className='row'>
      <h2 className='row-title'>{title}</h2>
      <div className={`row-posters`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && 'row-large'}`}
            onClick={() => handleMovie(movie)}
            src={`https://image.tmdb.org/t/p/w500${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie}
          />
        ))}
      </div>
      {trailer}
      {trailer && <YouTube videoId={trailer} opts={opts} />}
    </div>
  )
}

export default Row
