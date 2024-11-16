import React, { useEffect, useState, useCallback } from 'react';
import './Feeds.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Feeds = ({ category = 0, search }) => {
  const [videoFeedData, setVideoFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const [nextFeedToken, SetFeedToken] = useState(null);

  const navigate = useNavigate();

  // Initial fetch
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=30&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=30&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;

      const response = await fetch(url);
      const data = await response.json();
      SetFeedToken(data.nextPageToken); // Set the next page token
      setVideoFeedData(data.items || []);
    } catch (err) {
      console.error('Error fetching API data:', err);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // On scroll fetch more data
  const fetchMoreFeed = async () => {
    if (!nextFeedToken) return; // Prevent multiple requests if already loading or no next token

    // setFetchMore(false); // Reset the fetchMore state

    try {
      const url = search
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=20&pageToken=${nextFeedToken}&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=30&pageToken=${nextFeedToken}&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;

      const response = await fetch(url);
      const arr_data = await response.json();
      const data = arr_data.items;

      SetFeedToken(arr_data.nextPageToken); // Update next page token
      setVideoFeedData((prev_data) => [...prev_data, ...data]); // Append new data to the list
    } catch (error) {
      console.error('Error fetching more feed data:', error);
    }
  };

  // Handle scroll event
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
  //       setFetchMore(true); // Enable fetching more data
  //       fetchMoreFeed()
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   // return () => {
  //   //   window.removeEventListener('scroll', handleScroll);
  //   // };
  // }, [nextFeedToken]);



  return (
    <>
      {videoFeedData && (
        <div className="feed grid">
          {videoFeedData.map((data, index) => (
            <div
              key={data.id?.videoId || data.id || index} // Ensure unique keys
              className="card"
              onClick={() =>
                navigate(`/video/${category}/${search ? data.id.videoId : data.id}/${data.snippet.channelId}`, {
                  replace: true,
                })
              }
            >
              <p>{ }</p>
              <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.title} className="thumbnail" />
              <h2>{data.snippet.title}</h2>
              <h3>{data.snippet.channelTitle}</h3>
            </div>
          ))}
        </div>
      )}

      {nextFeedToken && (
        <div className='text-right font-semibold'>
          <button onClick={fetchMoreFeed} className="load-more-btn">
            Click Here to Load More Feed
          </button>
        </div>
      )}
    </>
  );
};
