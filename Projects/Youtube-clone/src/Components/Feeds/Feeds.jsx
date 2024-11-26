import React, { useEffect, useState, useCallback } from 'react';
import './Feeds.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import jack from '../../assets/jack.png'; // Placeholder image for channel
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

export const Feeds = ({ category = 0, search, small_sidebar }) => {
  const [videoFeedData, setVideoFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextFeedToken, setFeedToken] = useState(null);
  const [duration, Setduration] = useState([]);
  const [searching_query, setSearch] = useState(search)

  const navigate = useNavigate();
  // console.log("we have data",videoFeedData)

  // Initial fetch
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {

      const url = (search)
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&eventType=none&type=video&maxResults=10&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&type=video&part=contentDetails&chart=mostPopular&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;
      // console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        // Handle specific HTTP errors based on status code
        if (response.status === 403) {
          throw new Error("Access is forbidden. Please check your API key or permissions.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      // console.log(":intitla ", data.items)
      if (search) {
        // Step 2: Extract video IDs

        const videoIds = await data.items.map((item) => item.id.videoId).join(',');
        // console.log(videoIds)
        // Step 3: Fetch video details (duration)
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();
        // console.log(videosData)
        if (!videosResponse.ok) throw new Error(videosData.error.message);

        // Combine search results with duration
        const resultsWithDuration = data.items.map((item, index) => {
          const videoDetails = videosData.items.find((video) => video.id === item.id.videoId);
          return {
            ...item,
            duration: videoDetails?.contentDetails?.duration || 'Unknown',
          };
        });
        // console.log("duration", resultsWithDuration)
        Setduration(resultsWithDuration)

      }

      // console.log("Initial fetched", search, url);
      setFeedToken(data.nextPageToken); // Set the next page token
      setVideoFeedData(data.items || []);
    } catch (err) {
      console.error('Error fetching API data:', err);
    } finally {
      setLoading(false);
    }
  }, [category,search]);
  console.log("search value", search)
  useEffect(() => {
    console.log("inside")
    fetchData();
    window.scrollTo(0, 0);
  }, [search]);

  // Fetch more data on scroll
  const fetchMoreFeed = async () => {
    if (!nextFeedToken) return;
    try {
      const url = (search)
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&eventType=none&type=video&chart=mostPopular&maxResults=10&pageToken=${nextFeedToken}&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&type=video&part=contentDetails&chart=mostPopular&maxResults=10&pageToken=${nextFeedToken}&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (search) {
        // Step 2: Extract video IDs
        // console.log(data.items)
        const videoIds = await data.items.map((item) => item.id.videoId).join(',');
        // console.log(videoIds)
        // Step 3: Fetch video details (duration)
        const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;
        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();
        // console.log(videosData)
        if (!videosResponse.ok) throw new Error(videosData.error.message);

        // Combine search results with duration
        const resultsWithDuration = data.items.map((item, index) => {
          const videoDetails = videosData.items.find((video) => video.id === item.id.videoId);
          return {
            ...item,
            duration: videoDetails?.contentDetails?.duration || 'Unknown',
          };
        });
        // console.log("duration", resultsWithDuration)
        Setduration((prev) => [...prev, ...resultsWithDuration])

      }

      // console.log("when again fetched", data);
      setFeedToken(data.nextPageToken || null); // Update the token or null if none
      setVideoFeedData((prev_data) => [...prev_data, ...(data.items || [])]);
    } catch (error) {
      console.error('Error fetching more feed data:', error);
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
    return " ; "
    console.log("duration", resultsWithDuration);

  }
  return (
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
                    `/watch/${category}/${search ? data.id.videoId : data.id}/${data.snippet.channelId
                    }`,
                    { replace: true }
                  )
                }
              >
                <div className='relative'>
                  <img
                    src={data.snippet.thumbnails.medium.url}
                    alt={data.snippet.title}
                    className="thumbnail"
                  />
                  <span className='absolute bottom-1 right-1 bg-black text-white p-2'>{!search ? ( data.contentDetails ? parseISODuration(data.contentDetails.duration):"") : duration.length > 0 ? parseISODuration(duration[index].duration) : ""}</span>
                </div>
                <h2 className="font-sans">
                  {data.snippet.title.length < 35
                    ? data.snippet.title
                    : data.snippet.title.slice(0, 35) + '...'}
                </h2>
                <div className="flex flex-row content-center align-center justify-between">
                  <div className="flex flex-row place-items-center gap-1">
                    <img
                      src={jack}
                      alt="Channel"
                      className="rounded-[50%] mx-[2px] w-[25px] h-[25px]"
                    />
                    <h4 className="font-serif text-sm">
                      {data.snippet.channelTitle}
                    </h4>
                  </div>
                  {!search && (
                    <p>
                      { data.statistics && formattedViews(data.statistics.viewCount)} &bull;{' '}
                      {data.snippet && moment(data.snippet.publishedAt).fromNow()}
                    </p>
                  )}
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
  );
};
