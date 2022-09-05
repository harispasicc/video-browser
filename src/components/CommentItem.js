import React from "react";

function CommentItem({ comment, onVideoSelect }) {
  return (
    <div
      className="video-item"
      onClick={() => {
        onVideoSelect(comment);
      }}
    >
      <div className="content">
        <div className="header">{comment.snippet.authorDisplayName}</div>
      </div>
    </div>
  );
}

export default CommentItem;
