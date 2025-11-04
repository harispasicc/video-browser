import React, { useState } from "react";

function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className="search-bar ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="video-search" className="search-label">
            <i className="youtube icon red large" />
            YouTube Video Browser
            <span className="youtube-text">YouTube</span>
          </label>
          <input
            type="text"
            placeholder="Search for videos..."
            onChange={handleChange}
            value={input}
            name="video-search"
            className="search-input"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
