import React from 'react'
import './downloads.css'
import terms from '../../assets/terms.pdf'
import privacy from '../../assets/privacy.pdf'

const downloads = () => {
  return (
    <div className='downloads'>
      <button className="terms" ><a href={terms} download='Moi' style={{color:'inherit', textDecoration:'none'}}>Download Terms of Use</a></button>
      <button className="terms" ><a href={privacy} download='Moi' style={{color:'inherit', textDecoration:'none'}}>Download privacy</a></button>
    </div>
  )
}

export default downloads