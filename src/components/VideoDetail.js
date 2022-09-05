import React from "react";

function VideoDetail({
  video: {
    id: { videoId },
    snippet: { title, channelTitle, description },
  },
}) {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} title="Video Player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">
          {title} - {channelTitle}
        </h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default VideoDetail;
