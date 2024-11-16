import React, { useEffect, useState, useCallback } from 'react';
import './Feeds.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Feeds = ({ category = 0, search }) => {
  const [videoFeedData, setVideoFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=30&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
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

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="feed grid">
      {videoFeedData.map((data, index) => (
        <div
          key={data.id?.videoId || data.id || index}
          className="card"
          onClick={() =>
            navigate(`/video/${category}/${search ? data.id.videoId : data.id}/${data.snippet.channelId}`, {
              replace: true,
            })
          }
        >
          <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.title} className="thumbnail" />
          <h2>{data.snippet.title}</h2>
          <h3>{data.snippet.channelTitle}</h3>
        </div>
      ))}
    </div>
  );
};


// Optimizations
// 1. Error handling improvements: Use a single try...catch block instead of chaining catch.
// 2. Use async/await consistently: Replace .then() with cleaner async/await syntax.
// 3. Add a loading state: Show a loader when data is being fetched.