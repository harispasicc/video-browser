import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

function CommentAnalyze({ comments, sort, setSort }) {
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  useEffect(() => {
    setIsAnalyzed(false);
    setSort([]);
  }, [comments]);

  const handleAnalyze = () => {
    if (!comments || comments.length === 0) {
      return;
    }

    const allText = comments
      .map(comment => {
        const text = comment.snippet?.topLevelComment?.snippet?.textDisplay || '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        return tempDiv.textContent || tempDiv.innerText || '';
      })
      .join(' ');

    const result = sentiment.analyze(allText);
    
    const countWords = {};
    if (result.tokens && result.tokens.length > 0) {
      result.tokens.forEach(token => {
        const word = token.toLowerCase().trim();
        if (word.length > 2 && !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(word)) {
          countWords[word] = (countWords[word] || 0) + 1;
        }
      });
    }

    let sortWords = [];
    for (let word in countWords) {
      sortWords.push([word, countWords[word]]);
    }
    sortWords.sort((a, b) => {
      return b[1] - a[1];
    });
    
    setSort(sortWords);
    setIsAnalyzed(true);
  };

  
  return (
    <div>
      <button
        onClick={handleAnalyze}
        className={`analyze-button ${isAnalyzed ? 'analyzed' : ''}`}
      >
        {isAnalyzed ? '✓ Analyze Comments' : 'Analyze Comments'}
      </button>
      {sort.length > 0 && (
        <div className="word-frequency-container">
          <div className="word-frequency-title">
            Top {Math.min(15, sort.length)} Most Frequent Words
          </div>
          <div className="word-frequency-list">
            {sort.slice(0, 15).map((wordItem, index) => {
              const word = Array.isArray(wordItem) ? wordItem[0] : wordItem?.word || '';
              const count = Array.isArray(wordItem) ? wordItem[1] : wordItem?.count || 0;
              
              const displayText = `${word}: ${count}`;
              
              return (
                <div 
                  key={`word-${index}-${word}`} 
                  className="word-frequency-item"
                  style={{
                    background: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    display: 'inline-block',
                    margin: '4px',
                    whiteSpace: 'nowrap',
                    color: '#333',
                    fontWeight: 'normal'
                  }}
                >
                  {displayText}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentAnalyze;
