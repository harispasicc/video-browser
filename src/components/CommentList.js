import React from "react";
import CommentItem from "./CommentItem";

function CommentList({ comments, onVideoSelect }) {
  const listOfComments = comments.map(comment => (
    <CommentItem
      key={comment.id}
      comment={comment.snippet.topLevelComment.snippet}
      onVideoSelect={onVideoSelect}
    />
  ));

  return <div className="ui relaxed divided list">{listOfComments}</div>;
}

export default CommentList;
