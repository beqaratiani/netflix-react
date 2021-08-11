import React, { useState, useEffect } from 'react'
import '../Nav.css'

const Navbar = () => {
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setScroll(true)
      } else {
        setScroll(false)
      }
      return () => {
        window.removeEventListener('scroll')
      }
    })
  }, [])

  return (
    <nav className={`nav ${scroll && 'is-scrolled'}`}>
      <img
        className='img-net'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png'
        alt='netflix'
      />
      <img
        className='img-avt'
        src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png'
        alt='logo'
      />
    </nav>
  )
}

export default Navbar
