import React, { useEffect, useState, useMemo } from 'react';
import './Playvideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png'; // Placeholder image for channel
import user_profile from '../../assets/user_profile.jpg'; // Placeholder profile for comments
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { Subscription_Request, Subscription_success } from "../../Store/SubscriptionSlice";
import { GoogleAuthProvider } from 'firebase/auth';
import { useSelector } from 'react-redux';
import ShowMoreText from "react-show-more-text";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Playvideo({ videoId, channelId }) {
    const [videoData, setVideoData] = useState(null);
    const [videoComments, setComments] = useState([]);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState(null);  // Track the nextPageToken for pagination
    const [isLoadingComments, setIsLoadingComments] = useState(false);  // Track loading state for comments
    const [channelImageUrl, setChannelImgUrl] = useState(null);
    const [subscriptionId , SetSubscriptionId] = useState(null);
    const Dispatch = useDispatch();
    const [user_session, setSession] = useState(sessionStorage.getItem('user_session'));
    const provider = new GoogleAuthProvider();
    const [isSubscribed, FindSubscription] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("profile"))
    // Fetch video data, comments, and channel information

    const [myComment, setYourComment ] = useState("")

    const RequestVideoComments = async () =>{ const commentsRes= await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${videoId}&key=${import.meta.env.VITE_API_KEY}`);
            const commentsData = await commentsRes.json();
            if (commentsRes.ok) {
                setComments(commentsData.items);
                setNextPageToken(commentsData.nextPageToken);  // Set the nextPageToken for pagination
            }
        }

    const RequestVideoData = async () =>{ const videoRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`);
    const videoData = await videoRes.json();
    if (videoRes.ok && videoData.items.length > 0) {
        setVideoData(videoData.items[0]);
    }}


    const RequestChannelData = async ()=>{const channelRes = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${import.meta.env.VITE_API_KEY}`);
            const channelData = await channelRes.json();
            // console.log(channelData)
            if (channelRes.ok && channelData.items.length > 0) {
                const channelImageUrl = channelData.items[0].snippet.thumbnails.default.url;
                setChannelImgUrl(channelImageUrl);
                setChannel(formatSubscribers(channelData.items[0].statistics.subscriberCount));
            }}

    const fetchVideoData = async () => {
        setLoading(true);
        try {
            // Fetch video data
            RequestVideoData()

            // Fetch comments
            RequestVideoComments();

            // Fetch channel data
            RequestChannelData();

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkSubscription =  async (channel) =>{
        try {
            const response = await axios.get(
              "https://www.googleapis.com/youtube/v3/subscriptions",
              {
                params: {
                  part: "snippet",
                  forChannelId: channel,
                  mine: true,
                  key: import.meta.env.VITE_API_KEY,
                },
                headers: {
                  Authorization: `Bearer ${user_session}`,
                },
              }
            );
            
            if (response.data.items && response.data.items.length > 0) {
              FindSubscription(true);
            //   console.log(response.data.items[0].id)
              SetSubscriptionId(response.data.items[0].id)
            } else {
              // User is not subscribed
              FindSubscription(false);
              SetSubscriptionId(null)
            }
          } catch (err) {
            console.log("Error checking subscription:", err);
          }
        };


    const subscribeChannel = async (channel)=>{

        if (!user_session) {
            console.error("No token available. Please log in first.");
            return;
        }
        
        if(isSubscribed)
        {
            try {
                const response = await axios.delete(`https://www.googleapis.com/youtube/v3/subscriptions?id=${subscriptionId}`, {
                  headers: {
                    'Authorization': `Bearer ${user_session}`, // OAuth 2.0 token
                    'Accept': 'application/json',
                  },
                });
            
                if (response.status === 204) {
                  console.log('Subscription deleted successfully.');
                  FindSubscription(false);
                } else {
                  const error = await response;
                  throw new Error(`Error: ${error.error.message}`);
                }
              } catch (error) {
                console.error('Failed to delete subscription:', error.message);
              }
        }
        else
        {
            try {
                const body = {
                    snippet: {
                      resourceId: {
                        kind: "youtube#channel",
                        channelId: channel,
                      },
                    },
                  };
                const response = await axios.post(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${import.meta.env.VITE_API_KEY}`, body, {
                    headers: {
                      Authorization: `Bearer ${user_session}`, // Access token for authorization
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                  });
    
                  console.log('Subscription successful:');
                  SetSubscriptionId(response.data.id)
                  FindSubscription(true);
    
                } 
                catch (error) {
                    if (error.response) {
                      console.error("Error Response:", error.response.data);
                    } else {
                      console.error("Error:", error.message);
                    }
        }
        }
    }

    useEffect(() => {
        fetchVideoData();
        checkSubscription(channelId);
    }, [videoId, channelId]);

    // Format subscriber count for display
    const formatSubscribers = (count) => {
        if (count == null) return 'N/A';  // Handle undefined or null count
        if (count >= 1_000_000) return Math.floor(count / 1_000_000) + 'M';
        if (count >= 1_000) return Math.floor(count / 1_000) + 'k';
        return count;
    };

    const executeOnClick = (isExpanded) => {
        console.log("isExpanded");
    }

    //comment addition
    const addComment = async (myComment,channelId,videoId) =>{
        const myCommentObject  ={
            "snippet": {
              "topLevelComment": {
                "snippet": {
                  "textOriginal": `${myComment}`
                  
                }
                
              },
              "videoId": `${videoId}`,
              "channelId": `${channelId}`
            }
          }

          try {
            const response = await axios.post(
              `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${import.meta.env.VITE_API_KEY}`,
              myCommentObject,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user_session}`,
                },
              }
            );
            console.log("Comment posted successfully:", response.data);

            setTimeout(() => {
                setComments((prevComments) => [
                    {
                        snippet: {
                            topLevelComment: {
                                snippet: {
                                    authorProfileImageUrl: JSON.parse(sessionStorage.getItem("profile")).profile_photo, // or any other dynamic user info
                                    textOriginal: myComment,
                                    likeCount: 0, // Assuming no likes initially
                                    publishedAt: new Date().toISOString(), // Current time as placeholder
                                },
                            },
                        },
                    },...prevComments, // Keep previous comments
                ]);
        
                // Clear the comment input
                setYourComment('');
            },5000);

          } catch (error) {
            console.error("Error posting the comment:", error);
          }
    }

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
            const commentsRes = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${videoId}&pageToken=${nextPageToken}&key=${import.meta.env.VITE_API_KEY}`);
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
        return (<div className="loader">Loading...</div>);
    }

    return (

        <div className="Playvideo sm:flex-[70%] flex-[100%] mx-2">
            <div className="h-[500px] video">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
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
                        <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.3s"},
                  }}
                  src={channelImageUrl || jack} className="w-10 rounded-[50%] mx-[15px]"/>
                            {/* <img src={channelImageUrl || jack} alt="Channel" className="w-10 rounded-[50%] mx-[15px]" /> */}
                            <div className="flex flex-col gap-1 leading-4">
                                <p className="channel-name">{videoData.snippet.channelTitle}</p>
                                <div to='' className="subscriber-count">{channel} Subscribers</div>
                            </div>
                        </div>
                        <button className={`${isSubscribed ? "Subscribed" : ""}`} onClick={()=>{subscribeChannel(channelId)}}>{!isSubscribed ? "Subscribe" : "Unsubscribe"}</button>
                    </div>

                    <div className="video-description">
                        <ShowMoreText
                            
                            lines={3}
                            more="Show more"
                            less="Show less"
                            className="content-css"
                            anchorClass="show-more-less-clickable"
                            onClick={()=>{executeOnClick()}}
                            expanded={false}
                            truncatedEndingComponent={"... "}
                        >
                            <p className="description">
                                {videoData.snippet.description}
                            </p>
                        </ShowMoreText>
                        <hr />
                        <h4>Top {videoComments.length} Comments</h4>
                        <div>
                            <div className="comment w-[90%] overflow-hidden break-words" >
                                <img src={user.profile_photo} alt="" />
                                <div className="w-[100%]">

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="your-comment w-full p-2 border-b focus:outline-none border-b-gray-300 rounded-md border-"
                                            placeholder="Add a comment..."
                                            value={myComment}
                                            onChange={(e) =>{setYourComment(e.target.value)}}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            onClick={() => {addComment(myComment,channelId,videoId)}}
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {videoComments && videoComments.length > 0 ? (
                                videoComments.map((comment, index) => (
                                    
                                    <div className="comment w-[90%] overflow-hidden break-words" key={index}>
                                        <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile} alt="" />
                                        <div className="w-[100%]">
                                            <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName}
                                                <span> {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                                            </h3>
                                            <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
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
