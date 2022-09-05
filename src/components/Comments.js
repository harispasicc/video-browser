import React, { useState, useEffect } from "react";
import youTube from "../api/youTube";
import CommentList from "./CommentList";

function Comments({ video, onVideoSelect }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (video) {
        const {
          data: { items: comments },
        } = await youTube.get(
          "commentThreads",
          {
            params: {
              maxResults: 100,
              videoId: `${video.id.videoId}`,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          },
          {
            withCredentials: true,
          }
        );
        setComments(comments);
      }
    };
    getData().catch(e => {
      console.log(e);
      setComments([]);
    });
  }, [video]);

  return (
    <div>
      <div>
        <button style={{ marginTop: 10 }} className="ui button">
          Analyze Comments
        </button>
        <div className="ui segment">
          <h4 className="ui header">Comments</h4>
          <CommentList comments={comments} onVideoSelect={onVideoSelect} />
        </div>
      </div>
    </div>
  );
}

export default Comments;
