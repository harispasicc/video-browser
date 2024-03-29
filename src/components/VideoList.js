import React from "react";
import VideoItem from "./VideoItem";

function VideoList({ videos, onVideoSelect }) {
  const listOfVideos = videos.map(video => (
    <VideoItem
      key={video.id.videoId}
      video={video}
      onVideoSelect={onVideoSelect}
    />
  ));

  return <div className="ui relaxed divided list">{listOfVideos}</div>;
}

export default VideoList;
