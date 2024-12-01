import React, { useEffect, useState } from "react";
import Sidebar_box from "../../Components/SideBar/Sidebar";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setSideCategory } from '../../Store/SideCateogrySlice';
import {Query_Request , Query_success} from '../../Store/QuerySlice'

function History({ small_sidebar, setSidebar }) {
  const [historyVideos, setHistoryVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user_session, setSession] = useState(sessionStorage.getItem('user_session'));
  // Demo Data
  const Dispatch = useDispatch();
  useEffect(() => {
    const fetchHistoryVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            headers: {
              Authorization: `Bearer ${user_session}`,
            },
            params: {
              part: "snippet,contentDetails",
              playlistId: "HL", // Watch history playlist ID
              maxResults: 20,
              key: import.meta.env.VITE_API_KEY,
            },
          }
        );

        setHistoryVideos(response.data.items || []);
      } catch (error) {
        console.error("Error fetching history videos:", error);
      } finally {
        setLoading(false);
      }
    };

    Dispatch(Query_Request);
    Dispatch(Query_success(''))
    Dispatch(setSideCategory(3))
    fetchHistoryVideos();
  }, []);


  return (
    <div>
      <Sidebar_box
        small_sidebar={small_sidebar}
        setQuery={() => { }} // Removed unused setQuery dependency
        setSidebar={setSidebar}
      />
      <div className={`container w-[100%] ${small_sidebar ? 'large-container' : ''}`}>
      <div className="p-4 pt-[126px]">
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
            Loading...
          </div>
        ) : historyVideos.length === 0 ? (
          <div className="text-center text-lg font-medium text-gray-600">
            No history videos found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {historyVideos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col bg-white shadow-md rounded-lg p-4"
              >
                {/* Video Thumbnail */}
                <div className="mb-4">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-40 rounded-lg object-cover"
                  />
                </div>

                {/* Video Details */}
                <div className="flex items-start gap-4">
                  {/* Channel Thumbnail */}
                  <div className="w-12 h-12">
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.channelTitle}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      {parseInt(video.statistics.viewCount).toLocaleString()}{" "}
                      views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>

  );
}

export default History;
