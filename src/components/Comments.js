import React, { useState, useEffect } from "react";
import youTube from "../api/youTube";
import CommentList from "./CommentList";
import CommentAnalyze from "./CommentAnalyze";

const COMMENTS_PER_PAGE = 10;

function Comments({ video, onVideoSelect }) {
  const [allComments, setAllComments] = useState([]);
  const [sort, setSort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (video && video.id.videoId) {
        setLoading(true);
        let allCommentsData = [];
        let nextPageToken = null;

        try {
          do {
            const params = {
              maxResults: 100,
              videoId: `${video.id.videoId}`,
            };

            if (nextPageToken) {
              params.pageToken = nextPageToken;
            }

            const response = await youTube.get("commentThreads", {
              params: params,
            });

            if (response.data.items) {
              allCommentsData = [...allCommentsData, ...response.data.items];
            }

            nextPageToken = response.data.nextPageToken || null;
          } while (nextPageToken);

          setAllComments(allCommentsData);
        } catch (e) {
          setAllComments([]);
        } finally {
          setLoading(false);
          setCurrentPage(1);
        }
      }
    };

    getData();
    setSort([]);
  }, [video]);

  const totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const currentComments = allComments.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div>
        <CommentAnalyze comments={allComments} sort={sort} setSort={setSort} />
        <div className="ui segment">
          <div className="comments-header">
            Comments {allComments.length > 0 && `(${allComments.length})`}
          </div>
          {loading && <div className="loading-message">Loading comments...</div>}
          {!loading && allComments.length === 0 && (
            <div className="no-comments">No comments available for this video.</div>
          )}
          {!loading && allComments.length > 0 && (
            <>
              <CommentList comments={currentComments} onVideoSelect={onVideoSelect} />
              {totalPages > 1 && (
                <div className="pagination-container">
                  <button
                    className="pagination-button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
