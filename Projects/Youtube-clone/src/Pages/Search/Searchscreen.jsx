import React, { useState, useEffect, useCallback } from 'react';
import './searchStyle.css';
import Sidebar_box from '../../Components/SideBar/Sidebar';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import jack from '../../assets/jack.png'; // Placeholder image for channel
import { v4 as uuidv4 } from 'uuid';
import millify from 'millify';

function SearchScreen({ small_sidebar, setSidebar }) {
  const [category, setCategory] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextSearchToken, setNextSearchToken] = useState(null);
  const [extraDetails, setExtraDetails] = useState([]);
  const { query } = useParams(); // Destructure query from params
  const navigate = useNavigate();

  /**
   * Fetch initial data based on the query parameter.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch search data
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=10&q=${query}&key=${import.meta.env.VITE_API_KEY}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      if (!searchResponse.ok) throw new Error(searchData.error.message);
  
      // Extract video and channel IDs
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      const channelIds = searchData.items.map(item => item.snippet.channelId).join(',');
  
      // Fetch video details
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${import.meta.env.VITE_API_KEY}`;
      const videoDetailsResponse = await fetch(videoDetailsUrl);
      const videoDetailsData = await videoDetailsResponse.json();
      if (!videoDetailsResponse.ok) throw new Error(videoDetailsData.error.message);
  
      // Fetch channel details
      const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${import.meta.env.VITE_API_KEY}`;
      const channelDetailsResponse = await fetch(channelDetailsUrl);
      const channelDetailsData = await channelDetailsResponse.json();
      if (!channelDetailsResponse.ok) throw new Error(channelDetailsData.error.message);
  
      // Create maps for efficient lookup
      const videoDetailsMap = videoDetailsData.items.reduce((map, video) => {
        map[video.id] = video;
        return map;
      }, {});
  
      const channelDetailsMap = channelDetailsData.items.reduce((map, channel) => {
        map[channel.id] = channel;
        return map;
      }, {});
  
      // Merge data efficiently
      const results = searchData.items.map(item => {
        const videoDetails = videoDetailsMap[item.id.videoId];
        const channelDetails = channelDetailsMap[item.snippet.channelId];
        return {
          ...item,
          duration: videoDetails?.contentDetails?.duration || 'Unknown',
          videoViews: videoDetails?.statistics?.viewCount || '',
          channelImage: channelDetails?.snippet?.thumbnails?.default?.url || jack, // Use placeholder if unavailable
        };
      });
  
      setSearchData(searchData.items || []);
      setExtraDetails(results);
      setNextSearchToken(searchData.nextPageToken || null);
    } catch (err) {
      console.error('Error fetching API data:', err);
    } finally {
      setLoading(false);
    }
  }, [query]);
  

  /**
   * Fetch more data for infinite scroll.
   */
  const fetchMoreSearchData = async () => {
    if (!nextSearchToken) return;
  
    try {
      // Fetch search results
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=20&pageToken=${nextSearchToken}&q=${query}&key=${import.meta.env.VITE_API_KEY}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      if (!searchResponse.ok) throw new Error(searchData.error.message);
  
      // Extract video IDs and channel IDs
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      const channelIds = searchData.items.map(item => item.snippet.channelId).join(',');
  
      // Fetch video details
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${import.meta.env.VITE_API_KEY}`;
      const videosResponse = await fetch(videosUrl);
      const videosData = await videosResponse.json();
      if (!videosResponse.ok) throw new Error(videosData.error.message);
  
      // Fetch channel details
      const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;
      const channelsResponse = await fetch(channelsUrl);
      const channelsData = await channelsResponse.json();
      if (!channelsResponse.ok) throw new Error(channelsData.error.message);
  
      // Create lookup maps for video details and channel details
      const videoDetailsMap = videosData.items.reduce((map, video) => {
        map[video.id] = {
          duration: video.contentDetails.duration,
          views: video.statistics?.viewCount || '0',
        };
        return map;
      }, {});
  
      const channelDetailsMap = channelsData.items.reduce((map, channel) => {
        map[channel.id] = {
          image: channel.snippet.thumbnails.default.url,
        };
        return map;
      }, {});
  
      // Merge details into a single result
      const results = searchData.items.map(item => {
        const videoDetails = videoDetailsMap[item.id.videoId] || {};
        const channelDetails = channelDetailsMap[item.snippet.channelId] || {};
        return {
          ...item,
          duration: videoDetails.duration || 'Unknown',
          videoViews: videoDetails.views || '',
          channelImage: channelDetails.image || '',
        };
      });
  
      // Update state with new data
      setSearchData(prev => [...prev, ...(searchData.items || [])]);
      setExtraDetails(prev => [...prev, ...results]);
      setNextSearchToken(searchData.nextPageToken || null);
    } catch (error) {
      console.error('Error fetching more search data:', error);
    }
  };
  

  /**
   * Format YouTube ISO 8601 duration into readable format (e.g., "5:30").
   */
  const parseISODuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 'Live';
    const [hours, minutes, seconds] = [match[1] || 0, match[2] || 0, match[3] || 0].map(Number);
    return `${hours > 0 ? hours + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  /**
   * Run fetchData when the query changes.
   */
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div>
      {/* Sidebar */}
      <Sidebar_box
        small_sidebar={small_sidebar}
        category={category}
        setCategory={setCategory}
        setSidebar={setSidebar}
      />

      {/* Top category bar */}
      <div className={`Top-category-Bar flex flex-row w-full fixed bg-white z-10 ${small_sidebar ? 'sm:ml-[79px]' : 'sm:ml-[200px]'}`}>
        <CategoryBar />
      </div>

      {/* Search results */}
      <div className={`container w-full ${small_sidebar ? 'large-container' : ''}`}>
        {searchData.length > 0 && (
          <InfiniteScroll
            dataLength={searchData.length}
            next={fetchMoreSearchData}
            hasMore={!!nextSearchToken}
            loader={<h4>Loading...</h4>}
          >
            <div className="search grid">
              {searchData.map((data, index) => (
                <div
                  key={uuidv4()} // Ensure unique keys
                  className=" p-2 shadow-xl rounded"
                  onClick={() => navigate(`/watch/${category}/${data.id.videoId}/${data.snippet.channelId}`)}
                >
                  <div className="card flex flex-row gap-3 w-[100%]">
                    <div className='s-img-duration relative w-[40%] h-[auto] '>
                    <img
                      src={data.snippet.thumbnails.medium.url}
                      alt={data.snippet.title}
                      className="thumbnail w-full h-full"
                    />
                    <span className=" absolute bottom-1 right-1 bg-black text-white p-2">
                      {parseISODuration(extraDetails[index]?.duration || '')}
                    </span>
                    </div>
                    <div className="s-card-details flex flex-col w-[60%]">
                    <h2 className="s-video-title">
                    {data.snippet.title}
                   </h2>
                   <div className='s-views'>
                    <p>
                      {millify(extraDetails[index]?.videoViews || '')} views •  {moment(data.snippet.publishedAt).fromNow()}
                    </p>
                   </div>
                   <div className=' flex flex-row '>
                   <div className='s-channel-name-img flex flex-row text-center place-items-center gap-3'>
                      <img
                        src={extraDetails[index]?.channelImage || ''}
                        alt="Channel"
                        className="rounded-full w-6 h-6"
                      />
                      <h2>{data.snippet.channelTitle}</h2>
                      </div>
                   </div>
                      
                      <div className='s-video-description'>
                        <p>{data.snippet.description}</p>
                      </div>
                   </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}

        {loading && (
          <div className="text-center mt-5 font-semibold">
            <p>Loading Search Data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchScreen;
