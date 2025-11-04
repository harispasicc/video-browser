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
        <iframe 
          src={videoSrc} 
          title="Video Player"
          allowFullScreen
          frameBorder="0"
        />
      </div>
      <div className="ui segment">
        <h4 className="video-detail-header">
          {title}
        </h4>
        <p style={{ color: '#4a90e2', fontWeight: 600, marginBottom: '12px' }}>
          {channelTitle}
        </p>
        <p className="video-detail-description">{description}</p>
      </div>
    </div>
  );
}

export default VideoDetail;
