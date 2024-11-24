import React, { useEffect, useState, useMemo } from 'react';
import './Playvideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png'; // Placeholder image for channel
import user_profile from '../../assets/user_profile.jpg'; // Placeholder profile for comments
import moment from 'moment';

function Playvideo({ videoId, channelId }) {
    const [videoData, setVideoData] = useState(null);
    const [videoComments, setComments] = useState([]);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);  // Track the nextPageToken for pagination
    const [isLoadingComments, setIsLoadingComments] = useState(false);  // Track loading state for comments
    const [channelImageUrl, setChannelImgUrl] = useState(null);

    // Fetch video data, comments, and channel information
    const fetchVideoData = async () => {
        setLoading(true);
        try {
            // Fetch video data
            const videoRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`);
            const videoData = await videoRes.json();
            if (videoRes.ok && videoData.items.length > 0) {
                setVideoData(videoData.items[0]);
            }

            // Fetch comments
            const commentsRes = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${videoId}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`);
            const commentsData = await commentsRes.json();
            if (commentsRes.ok) {
                setComments(commentsData.items);
                setNextPageToken(commentsData.nextPageToken);  // Set the nextPageToken for pagination
            }

            // Fetch channel data
            const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`);
            const channelData = await channelRes.json();
            if (channelRes.ok && channelData.items.length > 0) {
                const channelImageUrl = channelData.items[0].snippet.thumbnails.default.url;
                setChannelImgUrl(channelImageUrl);
                setChannel(formatSubscribers(channelData.items[0].statistics.subscriberCount));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId, channelId]);

    // Format subscriber count for display
    const formatSubscribers = (count) => {
        if (count == null) return 'N/A';  // Handle undefined or null count
        if (count >= 1_000_000) return Math.floor(count / 1_000_000) + 'M';
        if (count >= 1_000) return Math.floor(count / 1_000) + 'k';
        return count;
    };

    // Memoized view count for optimized re-rendering
    const formattedViews = useMemo(() => {
        if (!videoData) return null;
        const { viewCount } = videoData.statistics;
        return viewCount >= 1_000_000 ? Math.floor(viewCount / 1_000_000) + 'M' :
            viewCount >= 1_000 ? Math.floor(viewCount / 1_000) + 'k' : viewCount;
    }, [videoData]);

    // Fetch more comments when the user clicks 'Load More'
    const fetchMoreComments = async () => {
        if (!nextPageToken || isLoadingComments) return;  // Prevent multiple requests
        setIsLoadingComments(true);
        try {
            const commentsRes = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${videoId}&pageToken=${nextPageToken}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`);
            const commentsData = await commentsRes.json();
            setComments(prevComments => [...prevComments, ...commentsData.items]);  // Append new comments
            setNextPageToken(commentsData.nextPageToken);  // Update the nextPageToken for pagination
        } catch (error) {
            console.error("Error fetching more comments:", error);
        } finally {
            setIsLoadingComments(false);
        }
    };

    // Loading state
    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="Playvideo basis-[70%] mx-2">
            <div className="h-[500px] video">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    sandbox="allow-scripts allow-same-origin"
                ></iframe>
            </div>

            {videoData && (
                <div>
                    <h3 className="font-bold mt-2 text-[15px] sm:text-xl">{videoData.snippet.title}</h3>
                    <div className="play-video-info flex align-items-center justify-between flex-wrap mt-2 text-[14px] text-gray-700">
                        <p>{formattedViews} &bull; {moment(videoData.snippet.publishedAt).fromNow()}</p>
                        <div className="flex flex-row gap-[1px] justify-center place-content-center">
                            <span><img src={like} alt="" />{videoData.statistics.likeCount}</span>
                            <span><img src={dislike} alt="" /></span>
                            <span><img src={share} alt="" />Share</span>
                            <span><img src={save} alt="" />Save</span>
                        </div>
                    </div>
                    <hr className="h-[1px] bg-gray-500 border-0 my-2" />

                    <div className="publisher flex justify-between mt-5">
                        <div className="flex flex-row">
                            <img src={channelImageUrl || jack} alt="Channel" className="w-10 rounded-[50%] mx-[15px]" />
                            <div className="flex flex-col gap-1 leading-4">
                                <p className="channel-name">{videoData.snippet.channelTitle}</p>
                                <p className="subscriber-count">{channel} Subscribers</p>
                            </div>
                        </div>
                        <button>Subscribe</button>
                    </div>

                    <div className="video-description">
                        <p className="description">
                            {(videoData.snippet.description).length < 230 ? 
                                (videoData.snippet.description) : 
                                (videoData.snippet.description).slice(0, 230)} ... 
                        </p>
                        <hr />
                        <h4>Top {videoComments.length} Comments</h4>
                        <div>
                            {videoComments && videoComments.length > 0 ? (
                                videoComments.map((comment, index) => (
                                    <div className="comment w-[90%] overflow-hidden break-words" key={index}>
                                        <img src={user_profile} alt="" />
                                        <div className="w-[100%]">
                                            <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName}
                                                <span> {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                                            </h3>
                                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                                            <div className="comment-action">
                                                <img src={like} alt="" />
                                                <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                                                <img src={dislike} alt="" />
                                                <span>{0}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet</p>
                            )}
                        </div>

                        {nextPageToken && !isLoadingComments && (
                            <button onClick={fetchMoreComments} className="load-more-btn">
                                Load More Comments
                            </button>
                        )}

                        {isLoadingComments && <p>Loading more comments...</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Playvideo;
