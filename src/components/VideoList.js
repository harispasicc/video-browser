import React from "react";
import VideoItem from "./VideoItem";

function VideoList({ videos, onVideoSelect }) {
  if (!videos || videos.length === 0) {
    return null;
  }

  const listOfVideos = videos.map((video, index) => (
    <VideoItem
      key={video.id?.videoId || `video-${index}`}
      video={video}
      onVideoSelect={onVideoSelect}
    />
  ));

  return <div className="ui relaxed divided list">{listOfVideos}</div>;
}

export default VideoList;
