import React, { useEffect } from 'react';
import './Watchscreen.css';
import Playvideo from '../../Components/PlayVideo/Playvideo';
import Recommended_video from '../../Components/Recommended/Recommended_video';
import { useParams } from 'react-router-dom';
import Sidebar_box from '../../Components/SideBar/Sidebar';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {Query_Request , Query_success} from '../../Store/QuerySlice'

function Watchscreen({ small_sidebar ,setSidebar}) {
  const { videoId, categoryId, channelId } = useParams(); // Destructure params directly
  const [category, setCategory] = useState(0);
  // const Dispatch = useDispatch();

  useEffect(()=>{
    // Dispatch()
    window.scrollTo(0, 0);
  },[])

  return (
    <div className=''>
      categories Sidebar Section
      <Sidebar_box
        small_sidebar={small_sidebar}
        category={category}
     // Removed unused setQuery dependency
        setSidebar= {setSidebar}
      />
    <div className={`play-container ${small_sidebar ? 'play-large-container' : ''} flex pt-[81px] px-[1px] sm:px-6 justify-between flex-wrap`}>
      <Playvideo videoId={videoId} categoryId={categoryId} channelId={channelId} />
      {/* Right side videos in recommendation with the same category */}
      <Recommended_video categoryId={categoryId} />
    </div>
    </div>
  );
}

export default Watchscreen;

// Optimizations 
// 1. Destructure Params: Avoid repetitive calls like Params.videoId by destructuring values directly.