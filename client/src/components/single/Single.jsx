import React from 'react'
import './single.css'
import { Link } from 'react-router-dom'

const Single = () => {
  return (
    <div className='single'>
  <div class="hex">
  <Link to='member/:id'>  
  <div class="hex-background">
  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img' alt="" />
  </div>
  </Link>
  </div>
    </div>
  )
}

export default Single