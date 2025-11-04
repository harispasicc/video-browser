import React from "react";
import { Icon, Comment } from "semantic-ui-react";

function CommentItem({ comment, onVideoSelect }) {
  if (comment)
    return (
      <div
        className="comment-item-container"
        onClick={() => {
          onVideoSelect(comment);
        }}
      >
        <Comment.Group>
          <Comment>
            <Comment.Avatar 
              src={comment.authorProfileImageUrl} 
              className="comment-avatar"
            />
            <Comment.Content>
              <Comment.Author as="a" className="comment-author">
                {comment.authorDisplayName}
              </Comment.Author>
              <Comment.Metadata className="comment-metadata">
                {new Date(comment.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Comment.Metadata>
              <Comment.Text className="comment-text">
                {comment.textDisplay}
              </Comment.Text>
              <div className="comment-likes">
                {comment.likeCount > 0 && (
                  <>
                    {comment.likeCount.toLocaleString()}
                    <Icon name="thumbs up" />
                  </>
                )}
              </div>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
  
  return null;
}

export default CommentItem;
