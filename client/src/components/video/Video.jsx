import React, { useState } from 'react'
import './video.css'
import videoBg from '../../assets/video.mp4'
import {AiFillPlayCircle} from 'react-icons/ai'

const Video = () => {

  const [clickVideo, setClickVideo] = useState(false)
  const disapeare = () => setClickVideo(!clickVideo)

  return (
    <div className='video-container'>
        <video src={videoBg} 
        autoPlay loop muted
        className={clickVideo ? 'skip active' : 'video'}/>
        <button className='video-btn' onClick={disapeare}><AiFillPlayCircle className='play-icon'/></button>
    </div>
  )
}

export default Video