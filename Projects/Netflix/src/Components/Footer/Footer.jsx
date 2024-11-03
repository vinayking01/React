import React from 'react'
import './Footer.css'
import youtube_ico from '../../assets/youtube_icon.png'
import facebook_ico from '../../assets/facebook_icon.png'
import instagram_ico from '../../assets/instagram_icon.png'
import twitter_ico from '../../assets/twitter_icon.png'


function Footer() {
  return (
    <>

    <div className='footer absolute -bottom-20 w-full   m-auto flex flex-col gap-12'>
      <div className='mx-52 '>
      <div className="footer-icons flex flex-row w-10 h-10 gap-6 ">
        <img src={youtube_ico} alt="" />
        <img src={facebook_ico} alt="" />
        <img src={instagram_ico} alt="" />
        <img src={twitter_ico} alt="" />
      </div>
      </div>
      <div>
      <ul className='grid grid-cols-3 gap-4 mx-52'>
        <li>
          Audio Description
        </li>
        <li>
          Help Center
        </li>
        <li>
          Gift Cards
        </li>
        <li>
          Media Center
        </li>
        <li>
          Investor Relations
        </li>
        <li>
          Jobs
        </li>
        <li>
          Terms and Use
        </li>
      </ul>
      </div>
      
    </div>
    </>
    
  )
}

export default Footer
