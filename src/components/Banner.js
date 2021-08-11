import { useState, useEffect } from 'react'
import axios from '../axios'
import requests from '../requests'
import '../Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState([])
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      let rand = Math.floor(Math.random() * request.data.results.length)
      setMovie(request.data.results[rand])
      return request
    }
    fetchData()
  }, [])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  console.log(movie)
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: `url(
          'https://image.tmdb.org/t/p/original${movie.backdrop_path}'
        )`,
      }}
    >
      <div className='banner-content'>
        <h1 className='banner-title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner-buttons'>
          <button className='banner-button'>Play</button>
          <button className='banner-button'>My List</button>
        </div>
        <div className='banner-description'>
          <p>{truncate(movie.overview, 300)}</p>
        </div>
      </div>
      <div className='banner-shade'></div>
    </header>
  )
}

export default Banner
