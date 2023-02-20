import React from 'react'
import './social.css'
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Social = () => {
  return (
    <div className='social'>
     <Link to='#' className="social-icon" style={{color: 'inherit'}}><BsFacebook /></Link>
     <Link to='#' className="social-icon" style={{color: 'inherit'}}> <BsTwitter /></Link>
     <Link to='#' className="social-icon" style={{color: 'inherit'}}><BsInstagram /></Link>
     
      
    </div>
  )
}

export default Social