import React, { useEffect, useState } from 'react'
import './Feeds.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export  const Feeds =({category=0, search})=> {

    const [video_feed_data, SetFeed] = useState(null);
    const navigate =useNavigate();
    const fetchData= async ()=>{

        if(search !=null)
        {
            await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=30&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => {return res.json()})
            .then(data =>{
                SetFeed(data.items);
                console.log(data.items)
            })
            .catch((err)=>{
                console.log("error in calling the api ", err)
            })

        
        }
        else
        {
            await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => {return res.json()})
            .then(data =>{
                SetFeed(data.items);
                // console.log("without query ", data.items[0])
            })
            .catch((err)=>{
                console.log("error in calling the api ", err)
            })
        }

    }

    useEffect(()=>{
        fetchData();
    },[category, search])

    return (
   <div className="feed grid ">
        { video_feed_data && video_feed_data.map((data,index)=>{
            return (
                <div onClick={() => {
                    navigate(`/video/${category}/${data.id.videoId}/${data.snippet.channelId}`, { replace: true }); 
                 }} key={index} className='card'>
             <img src={data.snippet.thumbnails.medium.url} width={"100%"} height={'100%'} alt="" />
             <h2>{data.snippet.title}</h2>
             <h3>{data.snippet.channelTitle}</h3>

            </div>
            )
        })
        }
        </div>
    )
}



