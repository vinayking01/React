import React, { useState, useEffect } from 'react';
import './Recommended.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Query_Request, Query_success } from '../../Store/QuerySlice'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function Recommended_video({ categoryId = 0 }) {
    const [video_feed_data, SetFeed] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(categoryId);
    const [nextVideoToken, setNextVideoToken] = useState(false)  // Track the nextPageToken
    const [isLoadingVideos, setIsLoadingVideos] = useState(false)  // Track loading state for Videos
    const Dispatch = useDispatch();
    const categories = [0, 20, 2, 17, 24, 28, 10, 22, 25];

    // Function to generate a random category ID
    const RandomCategory = () => {
        return categories[Math.floor(Math.random() * categories.length)];
    };

    // Fetch video data for the given category
    const fetchData = async () => {
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&videoCategoryId=${RandomCategory()}&key=${import.meta.env.VITE_API_KEY}`);
            const data = await res.json();
            // console.log(data.nextPageToken)
            SetFeed(data.items);
            setNextVideoToken(data.nextPageToken)
        }
        catch (err) {
            console.log("Error fetching data: ", err);
        }

    };

    //   fetch more videos

    const fetch_more_videos = async () => {
        if (!nextVideoToken || isLoadingVideos) return;

        setIsLoadingVideos(true);
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=25&videoCategoryId=${RandomCategory()}&pageToken=${nextVideoToken}&key=${import.meta.env.VITE_API_KEY}`);
            const data = await res.json();
            // console.log(data.nextPageToken)
            SetFeed((prev_video) => [...prev_video, ...data.items || []]);
            setNextVideoToken(data.nextPageToken)
        }
        catch (err) {
            console.log("Error fetching data: ", err);
        }
        finally {
            setIsLoadingVideos(false);
        }
    }

    // UseEffect will run whenever categoryId changes
    useEffect(() => {
        fetchData();
    }, [currentCategoryId]);

    const navigate = useNavigate();

    return (
        <div className='recommended sm:flex-[28%] flex-[100%] flex flex-col gap-2'>
            {video_feed_data &&
                <InfiniteScroll
                    dataLength={video_feed_data.length}
                    next={fetch_more_videos}
                    hasMore={!!nextVideoToken}
                    loader={<h4>Loading...</h4>}
                >
                    <div>
                        {video_feed_data.map((data, index) => {
                            return (
                                <div className="side-video-list" key={index}>
                                    <div onClick={() => {
                                        setCurrentCategoryId(RandomCategory());  // Update category ID when a video is clicked
                                        Dispatch(Query_Request);
                                        Dispatch(Query_success(''))
                                        navigate(`/watch/${data.snippet.categoryId}/${data.id}/${data.snippet.channelId}`, { replace: true });
                                    }} className='card flex justify-between mt-[8px]'>
                                        <LazyLoadImage
                                            effect="blur"
                                            wrapperProps={{
                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                style: { transitionDelay: "0.3s" },
                                            }}
                                            src={data.snippet.thumbnails.medium.url} className="thumbnail" />

                                        <div className="vid-info">
                                            <h4 className='text-sm'>{data.snippet.title}</h4>
                                            <p className='text-sm'>{data.snippet.channelTitle}</p>
                                            <p className='text-sm'>
                                                {(data.statistics.viewCount >= 1000000) ? Math.floor(data.statistics.viewCount / 1000000) + 'M' :
                                                    (data.statistics.viewCount >= 1000) ? Math.floor(data.statistics.viewCount / 1000) + 'k' :
                                                        data.statistics.viewCount} &bull; {moment(data.snippet.publishedAt).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            }
        </div>
    );
}

export default Recommended_video;


// Optimizations
//The component uses fetch to request video data from YouTube. For better performance and error handling, consider adding loading states, retries, or using an abstraction like axios.
// 2. The RandomCategory function changes the category when a video is clicked, providing a more dynamic browsing experience.
// 3. For loading more videos we used the NextPagetoken Feature of Youtube API.