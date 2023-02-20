import React from 'react'
import './image.css'
import heisen from '../../assets/heisen.jpg'

const Image = () => {
  return (
    <div className='image'>
        <div className="image-box">
          <div className="image-leftBox">
            <img src={heisen} alt="" className='img-box'/> 
          </div>
          <div className="image-rightBox">
             <h2 className="box-name">heisenberg</h2>
             <h3 className="box-link">www.the wall of fame.com</h3>
             <p className="box-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, quisquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, quisquam?</p>
          </div>
        </div>
    </div>
  )
}

export default Image