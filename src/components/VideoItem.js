import React from "react";

function VideoItem({ video, onVideoSelect }) {
  return (
    <div
      className="video-item"
      onClick={() => {
        onVideoSelect(video);
      }}
    >
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt="thumbnails"
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
}

export default VideoItem;
