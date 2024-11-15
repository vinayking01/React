import React, { useEffect } from 'react'
import './Player.css'
import Playvideo from '../../Components/PlayVideo/Playvideo'
import Recommended_video from '../../Components/Recommended/Recommended_video'
import { useParams } from 'react-router-dom'


function Player() {
  const Params= useParams();

  
  return (
    <>
    
      <div className='play-container flex pt-[81px] px-6 justify-between flex-wrap '>

        <Playvideo videoId={Params.videoId} categoryId = {Params.categoryId} channelId = {Params.channelId} />

        {/* right side videos in recommendation with same category */}
        <Recommended_video categoryId = {Params.categoryId}/>
      </div>
    </>

  )
}

export default Player
