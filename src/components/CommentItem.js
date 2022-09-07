import React from "react";
import { Icon, Comment } from "semantic-ui-react";

function CommentItem({ comment, onVideoSelect }) {
  if (comment)
    return (
      <div
        className="video-item"
        onClick={() => {
          onVideoSelect(comment);
        }}
      >
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={comment.authorProfileImageUrl} />
            <Comment.Content>
              <Comment.Author as="a">
                {comment.authorDisplayName}
              </Comment.Author>
              <Comment.Metadata>{comment.publishedAt}</Comment.Metadata>
              <Comment.Text>{comment.textDisplay}</Comment.Text>
              <div>
                {comment.likeCount}
                <Icon name="thumbs up" style={{ marginLeft: 5 }} />
              </div>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
}

export default CommentItem;
