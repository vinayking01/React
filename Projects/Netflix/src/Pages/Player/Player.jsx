import React, { useEffect, useId, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useParams,Link } from 'react-router-dom'

function Player() {

  const [video, video_details] = useState(null)
  const {id} = useParams(); 
  
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDVhNTdjZjQwZTI4NTVkNjdjZjJhYjk0OTY4YjVmNSIsIm5iZiI6MTczMDM1NzY2Mi40OTk3ODY5LCJzdWIiOiI2NzIzMjhjYjE2MDE0MTlmNzM2MjAyN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RUiciLOPnqLVlZ1IEATUnyeUYn0Y3nhYo1cASEaHCLU'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then((res)=> {
        // console.log(res.results)
        for (const res_clips of res.results) {
          if (res_clips.type === 'Trailer') {
            // console.log(res_clips)
              video_details(res_clips)
              break; // Exit the loop after the first match
          }
      }
        })
      .catch(err => console.error(err));
  
  },[])
   

  return (
    <>
    {video && <div>
      <div className='Back-arrow pt-4 pl-4'>
        <Link to='/'><img src={back_arrow} alt="" width={'70px'} height={'70px'}/></Link>
      </div>
      <div className=' h-[80vh] w-[80vw] m-auto'>
      <iframe src={`https://www.youtube.com/embed/${video.key}`} name="iframe_a" height="100%" width="100%" title="Iframe Example"></iframe>
      </div>
      <div className='flex flex-row justify-between mx-9'>
        <p>
          {
            Date(video.published_at)
          }
        </p>
        <p>
          {video.name}
        </p>
        <p>
          {video.type}
        </p>
      </div>
      
    </div> }
    
    </>
    
  )
}


export default Player


