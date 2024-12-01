import React, { useEffect, useState, useCallback } from 'react';
import './Feeds.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import jack from '../../assets/jack.png'; // Placeholder image for channel
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import Sidebar_box from '../SideBar/Sidebar';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Feeds = ({ small_sidebar ,setSidebar} ) => {
  const [category , setCategory] = useState(0);
  const [videoFeedData, setVideoFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextFeedToken, setFeedToken] = useState(null);
  const [duration, Setduration] = useState([]);


  const navigate = useNavigate();
  // console.log("we have data",videoFeedData)

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Base API URL and API Key
      const API_KEY = import.meta.env.VITE_API_KEY;
      const BASE_URL = "https://www.googleapis.com/youtube/v3";
  
      // Step 1: Fetch initial video data
      const videoFeedResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics,contentDetails",
          chart: "mostPopular",
          maxResults: 10,
          key: API_KEY,
        },
      });
  
      const videoFeedData = videoFeedResponse.data;
      const videoItems = videoFeedData.items || [];
  
      // Step 2: Extract video IDs
      const videoIds = videoItems.map((item) => item.id).join(",");
  
      if (!videoIds) {
        throw new Error("No video IDs found. Cannot fetch details.");
      }
  
      // Step 3: Fetch video details (duration)
      const videoDetailsResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      });
  
      const videoDetailsData = videoDetailsResponse.data;
      const videoDetailsMap = videoDetailsData.items.reduce((map, video) => {
        map[video.id] = video.contentDetails;
        return map;
      }, {});
  
      // Step 4: Combine search results with duration details
      const resultsWithDuration = videoItems.map((item) => ({
        ...item,
        duration: videoDetailsMap[item.id]?.duration || "Unknown",
      }));
  
      // Update states with fetched data
      setFeedToken(videoFeedData.nextPageToken || null);
      setVideoFeedData(videoItems);
      Setduration(resultsWithDuration);
    } catch (err) {
      // Handle error and display specific messages
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data?.error?.message || err.message);
      } else {
        console.error("Error fetching API data:", err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    // console.log("inside")
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  // Fetch more data on scroll
  const fetchMoreFeed = async () => {
    if (!nextFeedToken) return; // Exit if no token is available
  
    try {
      // Base API URL and API Key
      const API_KEY = import.meta.env.VITE_API_KEY;
      const BASE_URL = "https://www.googleapis.com/youtube/v3";
  
      // Step 1: Fetch more video data
      const videoFeedResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics,contentDetails",
          chart: "mostPopular",
          maxResults: 10,
          pageToken: nextFeedToken,
          videoCategoryId: category,
          key: API_KEY,
        },
      });
  
      const videoFeedData = videoFeedResponse.data;
      const videoItems = videoFeedData.items || [];
  
      // Step 2: Extract video IDs
      const videoIds = videoItems.map((item) => item.id).join(",");
      if (!videoIds) {
        throw new Error("No video IDs found. Cannot fetch details.");
      }
  
      // Step 3: Fetch video details (duration)
      const videoDetailsResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      });
  
      const videoDetailsData = videoDetailsResponse.data;
      const videoDetailsMap = videoDetailsData.items.reduce((map, video) => {
        map[video.id] = video.contentDetails;
        return map;
      }, {});
  
      // Step 4: Combine search results with duration details
      const resultsWithDuration = videoItems.map((item) => ({
        ...item,
        duration: videoDetailsMap[item.id]?.duration || "Unknown",
      }));
  
      // Update states with new data
      setFeedToken(videoFeedData.nextPageToken || null);
      setVideoFeedData((prevData) => [...prevData, ...videoItems]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403 && err.response?.data?.error?.message.includes("quota")) {
          console.error("YouTube API quota exceeded. Please try again later or use a different API key.");
        } else {
          console.error("Axios error:", err.response?.data?.error?.message || err.message);
        }
      } else {
        console.error("Error fetching more feed data:", err.message);
      }
    }
  };

  const formattedViews = (viewCount) => {
    return viewCount >= 1_000_000
      ? Math.floor(viewCount / 1_000_000) + 'M'
      : viewCount >= 1_000
        ? Math.floor(viewCount / 1_000) + 'k'
        : viewCount;
  };

  const parseISODuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) {
      return "live"; // Default to zero if no match
    }
    const hours = match[1] ? parseInt(match[1]) : 0;   // Extract hours or set to 0 if missing
    const minutes = match[2] ? parseInt(match[2]) : 0; // Extract minutes or set to 0 if missing
    const seconds = match[3] ? parseInt(match[3]) : 0; // Extract seconds or set to 0 if missing

    return `${hours > 0 ? hours + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
   

  }
  return (

    <div>
  <div className="w-[100%] rel">
      {videoFeedData && (
        <InfiniteScroll
          dataLength={videoFeedData.length}
          next={fetchMoreFeed}
          hasMore={!!nextFeedToken}
          loader={<h4>Loading...</h4>}
        >
          <div className="feed grid">
            {videoFeedData.map((data, index) => (

              <div
                key={uuidv4()} // Ensure unique keys
                className="card p-2 shadow-xl rounded"
                onClick={() =>
                  navigate(
                    `/watch/${category}/${data.id}/${data.snippet.channelId
                    }`,
                    { replace: true }
                  )
                }
              >
                <div className='relative'>
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.3s"},
                  }}
                  src={data.snippet.thumbnails.medium.url} className="thumbnail"/>
            
                  <span className='absolute bottom-1 right-1 bg-black text-white p-2'>{ data.contentDetails ? parseISODuration(data.contentDetails.duration):""}</span>
                </div>
                <h2 className="font-sans">
                  {data.snippet.title.length < 35
                    ? data.snippet.title
                    : data.snippet.title.slice(0, 35) + '...'}
                </h2>
                <div className="flex flex-row content-center align-center justify-between">
                  <div className="flex flex-row place-items-center gap-1">
                    
                  <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "1s"},
                    }}
                       src={jack} className="rounded-[50%] mx-[2px] w-[25px] h-[25px]"/>
                    <h4 className="font-serif text-sm">
                      {data.snippet.channelTitle}
                    </h4>
                  </div>
                    <p>
                      { data.statistics && formattedViews(data.statistics.viewCount)} &bull;{' '}
                      {data.snippet && moment(data.snippet.publishedAt).fromNow()}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {loading && (
        <div className="text-center mt-[20px] font-semibold">
          <p>Loading feed...</p>
        </div>
      )}
    </div>
    </div>
  
  );
};
