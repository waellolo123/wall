import React from 'react'
import './social.css'
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Social = () => {
  return (
    <div className='social'>
     <Link to='https://www.facebook.com/Walltribute' className="social-icon" style={{color: 'white'}}><BsFacebook /></Link>
     <Link to='https://twitter.com/walltribute' className="social-icon" style={{color: 'white'}}> <BsTwitter /></Link>
     <Link to='https://www.instagram.com/walltribute/' className="social-icon" style={{color: 'white'}}><BsInstagram /></Link>
     
      
    </div>
  )
}

export default Social