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
          <label htmlFor="video-search">
            <i className="youtube icon red large" />
            YouTube
          </label>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={input}
            name="video-search"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
