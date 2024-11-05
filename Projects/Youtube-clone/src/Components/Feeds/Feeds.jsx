import React, {createContext, useEffect, useState } from 'react'
import './Feeds.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import moment from 'moment'


export const UserContext = createContext();

export  const Feeds =({category=0})=> {

    const [video_feed_data, SetFeed] = useState(null);
    const [channelId , setchannel] = useState(null);

    const fetchData= async ()=>{
        await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
        .then(res => {return res.json()})
        .then(data =>{
            SetFeed(data.items);
            console.log(data.items)
            setchannel(data.items.snippet.channelId)
        })
        .catch((err)=>{
            console.log("error in calling the api ", err)
        })

    }

    useEffect(()=>{
        fetchData();
    },[category])

    return (
        <UserContext.Provider value={{ channelId }}>
   <div className="feed grid ">
        { video_feed_data && video_feed_data.map((data,index)=>{
            return (
            <Link to={`video/${category}/${data.id}`}  key={index} className='card'>
             <img src={data.snippet.thumbnails.medium.url} width={"100%"} height={'100%'} alt="" />
             <h2>{data.snippet.title}</h2>
             <h3>{data.snippet.channelTitle}</h3>
             <p>`{(data.statistics.viewCount >= 1000000)? Math.floor(data.statistics.viewCount/1000000)+ 'M':(data.statistics.viewCount>=1000)?Math.floor(data.statistics.viewCount/1000)+'k':data.statistics.viewCount} &bull; {moment(data.snippet.publishedAt).fromNow()}`</p>
            </Link>
            )
        })
        }
        </div>
        </UserContext.Provider>
     
    )
}



