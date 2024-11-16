import React from 'react';
import './Player.css';
import Playvideo from '../../Components/PlayVideo/Playvideo';
import Recommended_video from '../../Components/Recommended/Recommended_video';
import { useParams } from 'react-router-dom';

function Player() {
  const { videoId, categoryId, channelId } = useParams(); // Destructure params directly

  return (
    <div className='play-container flex pt-[81px] px-[1px] sm:px-6 justify-between flex-wrap'>
      <Playvideo videoId={videoId} categoryId={categoryId} channelId={channelId} />
      {/* Right side videos in recommendation with the same category */}
      <Recommended_video categoryId={categoryId} />
    </div>
  );
}

export default Player;

// Optimizations 
// 1. Destructure Params: Avoid repetitive calls like Params.videoId by destructuring values directly.