import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import youTube from "../api/youTube";
import Comments from "./Comments";

function Video() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({
    id: {},
    snippet: {},
  });

  const handleSubmit = async keyword => {
    const {
      data: { items: videos },
    } = await youTube.get("search", {
      params: {
        q: keyword,
        type: "video",
      },
    });

    setVideos(videos);
    if (videos && videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  };

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      if (selectedVideo && selectedVideo.id && selectedVideo.id.videoId) {
        try {
          const videoTitle = selectedVideo.snippet?.title || "";
          const keywords = videoTitle
            .split(/\s+/)
            .filter(word => 
              word.length > 3 && 
              !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'get', 'has', 'him', 'his', 'how', 'new', 'now', 'old', 'see', 'two', 'way', 'who'].includes(word.toLowerCase())
            )
            .slice(0, 3)
            .join(' ');

          const searchQuery = keywords || selectedVideo.snippet?.title || "programming";
          
          const {
            data: { items: relatedVideos },
          } = await youTube.get("search", {
            params: {
              q: searchQuery,
              type: "video",
              maxResults: 10,
            },
          });

          const filteredVideos = relatedVideos.filter(
            video => video.id.videoId !== selectedVideo.id.videoId
          );

          setVideos(filteredVideos.slice(0, 10));
        } catch (error) {
          console.error("Error fetching related videos:", error);
        }
      }
    };

    fetchRelatedVideos();
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo.id.videoId) {
      handleSubmit("programming");
    }
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} video={selectedVideo} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
            <Comments video={selectedVideo} onVideoSelect={setSelectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              video={selectedVideo}
              onVideoSelect={setSelectedVideo}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
