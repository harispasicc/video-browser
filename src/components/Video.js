import React, { useState } from "react";
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
      },
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  };

  if (!selectedVideo.id.videoId) {
    handleSubmit("football");
  }

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
