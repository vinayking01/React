import React, { useState, useEffect } from "react";
import axios from "axios";
import millify from "millify";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar_box from "../../Components/SideBar/Sidebar";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setSideCategory } from '../../Store/SideCateogrySlice';
import {Query_Request , Query_success} from '../../Store/QuerySlice'

const Subscription = ({ small_sidebar, setSidebar }) => {
  const [loading, setLoading] = useState(false); // Simulating loading state
  const [user_session, setSession] = useState(sessionStorage.getItem('user_session'));
  // Mock data for testing
  const [subscriptions, setSubscriptions] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(false)
  const Dispatch = useDispatch();

  const fetchSubscriptions = async () => {

    try {
      setLoading(true);
      // console.log("fetch")
      // Fetch subscriptions list
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=20&key=${import.meta.env.VITE_API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user_session}`, // Replace with the user's access token
          }
        }
      );
      setNextPageToken(response.data.nextPageToken)
      const subscriptionsData = response.data.items;

      // Extract channel IDs for additional details (if needed)
      const channelIds = subscriptionsData.map((item) => item.snippet.resourceId.channelId).join(",");

      // Fetch channel details
      const channelDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            part: "snippet,statistics",
            id: channelIds,
            key: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const channelDetails = channelDetailsResponse.data.items;

      // Merge subscription and channel details
      const mergedData = subscriptionsData.map((subscription) => {
        const channel = channelDetails.find((ch) => ch.id === subscription.snippet.resourceId.channelId);
        return {
          id: subscription.id,
          snippet: {
            title: subscription.snippet.title,
            thumbnails: subscription.snippet.thumbnails,
          },
          statistics: channel?.statistics || { subscriberCount: "Unknown" },
        };
      });
      // console.log(mergedData)
      setSubscriptions(mergedData);
      setLoading(false);
    } catch (err) {
      console.log("Failed to fetch subscriptions.", err);
    }

  };

  useEffect(() => {
    Dispatch(Query_Request);
    Dispatch(Query_success(''))
    Dispatch(setSideCategory(1))
    fetchSubscriptions();
  }, []);

  const fetch_more_subscription = async () => {
    if (!nextPageToken || loading) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=10&pageToken=${nextPageToken}&key=${import.meta.env.VITE_API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user_session}`, // Replace with the user's access token
          }
        }
      );
      setNextPageToken(response.data.nextPageToken)
      const subscriptionsData = response.data.items;

      // Extract channel IDs for additional details (if needed)
      const channelIds = subscriptionsData.map((item) => item.snippet.resourceId.channelId).join(",");

      // Fetch channel details
      const channelDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            part: "snippet,statistics",
            id: channelIds,
            key: import.meta.env.VITE_API_KEY,
          },
        }
      );

      const channelDetails = channelDetailsResponse.data.items;

      // Merge subscription and channel details
      const mergedData = subscriptionsData.map((subscription) => {
        const channel = channelDetails.find((ch) => ch.id === subscription.snippet.resourceId.channelId);
        return {
          id: subscription.id,
          snippet: {
            title: subscription.snippet.title,
            thumbnails: subscription.snippet.thumbnails,
          },
          statistics: channel?.statistics || { subscriberCount: "Unknown" },
        };
      });
      // console.log(mergedData)
      setSubscriptions((prev) => [...prev, ...mergedData || []]);


    }
    catch (err) {
      console.log("Error fetching data: ", err);
    }


  }



  return (
    <div>
      <Sidebar_box
        small_sidebar={small_sidebar}
        setSidebar={setSidebar}
        setQuery={() => { }}
      />
 <div className={`container w-[100%] ${small_sidebar ? 'large-container' : ''}`}>
      <div className="p-4  pt-[74px]">
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
            Loading...
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center text-lg font-medium text-gray-600">
            No subscriptions found.
          </div>
        ) : (subscriptions &&
          <InfiniteScroll
            dataLength={subscriptions.length}
            next={fetch_more_subscription}
            hasMore={!!nextPageToken}
            loader={<h4>Loading...</h4>}
          >
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {subscriptions.map((subscription) => (
                <div
                  key={uuidv4()}
                  className="flex flex-col bg-white shadow-md rounded-lg p-4"
                >
                  {/* Channel Info */}
                  <div className="flex items-center gap-4">
                    {/* Channel Image */}
                    <div className="w-16 h-16">
                      <img
                        src={subscription.snippet.thumbnails.default.url}
                        alt={subscription.snippet.title}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    {/* Channel Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {subscription.snippet.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {millify(subscription.statistics.subscriberCount)} subscribers
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
</div>
    </div>

  );
};

export default Subscription;
