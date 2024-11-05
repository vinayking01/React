import React from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'

function Playvideo({ videoId, categoryId }) {

    const [video_data, Set_Video] = useState(null);
    const [video_comments, Set_comments] = useState(null);
    

    const FetchComments = async () => {
        await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&videoId=${videoId}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => res.json())
            .then(data => {
                Set_comments(data.items);
                // console.log(data.items)
            })
            .catch((err) => {
                console.log("error in calling the api ", err)
            })
    }

    const fetchData = async () => {
        await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => res.json())
            .then(data => {
                Set_Video(data.items[0]);
                // console.log(data.items[0])
            })
            .catch((err) => {
                console.log("error in calling the api ", err)
            })

    }

    useEffect(() => {
        fetchData();
        FetchComments();

    }, [videoId])

    return (
        <div className="Playvideo basis-[70%] mx-2">
            {video_data && (
                <div className='w-[100%] h-[44%]'>
                    <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} className='w-[100%] h-[50%]' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    <h3 className='font-bold mt-2 text-xl '>{video_data.snippet.title}</h3>
                    <div className="play-video-info flex align-items-center justify-between flex-wrap mt-2 text-[14px] text-gray-700">
                        <p> `{(video_data.statistics.viewCount >= 1000000) ? Math.floor(video_data.statistics.viewCount / 1000000) + 'M' : (video_data.statistics.viewCount >= 1000) ? Math.floor(video_data.statistics.viewCount / 1000) + 'k' : video_data.statistics.viewCount} &bull; {moment(video_data.snippet.publishedAt).fromNow()}`</p>
                        <div className='flex flex-row'>
                            <span><img src={like} alt="" />{video_data.statistics.likeCount}</span>
                            <span><img src={dislike} alt="" /></span>
                            <span><img src={share} alt="" />Share</span>
                            <span><img src={save} alt="" />Save</span>
                        </div>
                    </div>
                    <hr className=' h-[1px] bg-gray-500 border-0 my-2' />
                    <div className='publisher flex justify-between mt-5'>
                        <div className='flex flex-row'>
                            <img src={jack} alt="" className='w-10  rounded-[50%] mx-[15px]' />
                            <div className='flex flex-col gap-1 leading-4'>
                                <p className='channel-name'>{video_data.snippet.channelTitle}</p>
                                <p className='subscriber-count'>10M Subscribers</p>
                            </div>
                        </div>
                        <button>Subscribe</button>
                    </div>
                    <div className="video-description">
                        <p>{video_data.snippet.description}</p>
                        <hr />
                        <h4> Top 20 Comments </h4>
                        <div>
                            {video_comments &&
                                video_comments.map((comm, index) => (
                                    <div className='comment ' key={index}>
                                        <img src={user_profile} alt="" />
                                        <div>
                                            <h3>{comm.snippet.topLevelComment.snippet.authorDisplayName}
                                                <span> {moment(comm.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                                            </h3>
                                            <p>{comm.snippet.topLevelComment.snippet.textDisplay}</p>
                                            <div className="comment-action">
                                                <img src={like} alt="" />
                                                <span>{comm.snippet.topLevelComment.snippet.likeCount}</span>
                                                <img src={dislike} alt="" />
                                                <span>{0}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            )

            }
        </div>

    )
}

export default Playvideo