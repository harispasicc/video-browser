import React from "react";
import { useState } from "react";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

function CommentAnalyze({ comments }) {
  const [sort, setSort] = useState("");

  const handleAnalyze = () => {
    const commentText = () => {
      return comments.map(
        comment => comment.snippet.topLevelComment.snippet.textDisplay
      );
    };
    const result = sentiment.analyze(JSON.stringify(commentText()));
    const countWords = result.tokens.reduce((accumulator, value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});

    let sortWords = [];
    for (let word in countWords) {
      if (word.length > 2) {
        sortWords.push([word, countWords[word]]);
      }
    }
    sortWords.sort((a, b) => {
      return b[1] - a[1];
    });
    setSort(sortWords);
  };

  return (
    <div>
      <button
        style={{ marginTop: 10 }}
        onClick={handleAnalyze}
        className="ui button"
      >
        Analyze Comments
      </button>
      {sort.length > 1 && (
        <div style={{ marginLeft: 5 }} role="list" className="ui list">
          {sort.slice(0, 15).map((word, index) => (
            <div key={index} role="listitem" className="item">
              {word[0]} : {word[1]}
            </div>
          ))}
        </div>
      )}{" "}
    </div>
  );
}

export default CommentAnalyze;
