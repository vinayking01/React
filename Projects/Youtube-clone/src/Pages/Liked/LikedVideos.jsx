import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar_box from "../../Components/SideBar/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from 'uuid';
import millify from "millify";
import { setSideCategory } from '../../Store/SideCateogrySlice';
import { useDispatch } from "react-redux";
import {Query_Request , Query_success} from '../../Store/QuerySlice'

function LikedVideos({ small_sidebar, setSidebar }) {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user_session, setSession] = useState(sessionStorage.getItem('user_session'));
  const [nextPageToken, setPageToken] = useState(null)
  const demoData = [];
  const Dispatch = useDispatch();

  const fetchLikedVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch liked videos from YouTube API
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: "snippet,statistics",
            myRating: "like",
            maxResults: 5,
            key: import.meta.env.VITE_API_KEY, // Replace with your API key
          },
          headers: {
            Authorization: `Bearer ${user_session}`, // Replace with the user's access token
          },
        }
      );
      setPageToken(response.data.nextPageToken)
      setLikedVideos(response.data.items || []);
    } catch (err) {
      setError("Failed to fetch liked videos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Dispatch(Query_Request);
    Dispatch(Query_success(''))
    Dispatch(setSideCategory(2))
    fetchLikedVideos();
  }, []);

  const fetchMoreVideos = async () => {
    if (!nextPageToken) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          params: {
            part: "snippet,statistics",
            myRating: "like",
            maxResults: 5,
            key: import.meta.env.VITE_API_KEY, // Replace with your API key
            pageToken: nextPageToken
          },
          headers: {
            Authorization: `Bearer ${user_session}`, // Replace with the user's access token
          },
        }
      );
      setPageToken(response.data.nextPageToken)
      setLikedVideos((data) => [...data, ...response.data.items || []]);
    } catch (err) {
      setError("Failed to fetch liked videos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <Sidebar_box
        small_sidebar={small_sidebar}
        setQuery={() => { }} // Removed unused setQuery dependency
        setSidebar={setSidebar}
      />
      <div className={`container w-[100%] ${small_sidebar ? 'large-container' : ''}`}>
        <div className="p-4 pt-[73px] sm:pt-[74px]">
          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
              Loading...
            </div>
          ) : likedVideos.length === 0 ? (
            <div className="text-center text-lg font-medium text-gray-600">
              No liked videos found.
            </div>
          ) : (
            <div>
              {likedVideos && (<InfiniteScroll
                dataLength={likedVideos.length}
                next={fetchMoreVideos}
                hasMore={!!nextPageToken}
                loader={<h4>Loading...</h4>}
              >
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {likedVideos.map((video) => (
                    <div
                      key={uuidv4()}
                      className="flex flex-col bg-white shadow-md rounded-lg p-4"
                    >
                      {/* Video Thumbnail */}
                      <div className="mb-4">
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="w-full h-40 rounded-lg"
                        />
                      </div>

                      {/* Video Details */}
                      <div className="flex flex-col ">
                        {/* Text Details */}
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 truncate text-wrap">
                            {video.snippet.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {video.snippet.channelTitle}
                          </p>
                          <p className="text-sm text-gray-500">
                            {millify(parseInt(video.statistics.viewCount))}{" "}
                            views
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </div>
              </InfiniteScroll>)

              }
            </div>

          )}
        </div>
      </div>
    </div>

  );
}

export default LikedVideos;
