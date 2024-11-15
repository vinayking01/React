import React, { useState, useEffect } from 'react'
import './Recommended.css'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function Recommended_video({ categoryId = 0 }) {
    const [video_feed_data, SetFeed] = useState(null);
    const [currentCategoryId, setCurrentCategoryId] = useState(categoryId);

    const categories = [0, 20, 2, 17, 24, 28, 10, 22, 25];

    // Function to generate a random category ID
    const RandomCategory = () => {
        return categories[Math.floor(Math.random() * categories.length)];
    };

    // Fetch video data for the given category
    const fetchData = async () => {
        // console.log("Fetching data for category: ", currentCategoryId);
        await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&videoCategoryId=${currentCategoryId}&pageToken=CAUQAA&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => res.json())
            .then(data => {
                SetFeed(data.items);
            })
            .catch((err) => {
                console.log("Error fetching data: ", err);
            });
    };

    // UseEffect will run whenever categoryId changes
    useEffect(() => {
        // Fetch data whenever the categoryId changes (including when random category is chosen)
        fetchData();
    }, [currentCategoryId]);

    const navigate = useNavigate();

    return (
        <div className='recommended basis-[28%] flex flex-col gap-2'>
            {video_feed_data && video_feed_data.map((data, index) => {
                return (
                    <div className="side-video-list" key={index}>
                        <div onClick={() => {
                            console.log(data);
                            setCurrentCategoryId(RandomCategory());  // Update category ID when a video is clicked
                            navigate(`/video/${data.snippet.categoryId}/${data.id}/${data.snippet.channelId}`, { replace: true });
                        }} className='card flex justify-between mt-[8px]'>
                            <img src={data.snippet.thumbnails.medium.url} alt="" />
                            <div className="vid-info">
                                <h4 className='text-sm'>{(data.snippet.title)}</h4>
                                <p className='text-sm'>{data.snippet.channelTitle}</p>
                                <p className='text-sm'>
                                    {(data.statistics.viewCount >= 1000000) ? Math.floor(data.statistics.viewCount / 1000000) + 'M' :
                                    (data.statistics.viewCount >= 1000) ? Math.floor(data.statistics.viewCount / 1000) + 'k' :
                                    data.statistics.viewCount} &bull; {moment(data.snippet.publishedAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Recommended_video;
