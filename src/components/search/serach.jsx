import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useState } from "react";

const Search = ({ setInput, handleSearchClick, setSearchError }) => {
  const handleInput = (e) => {
    setSearchError(false);
    setInput(e.target.value);
  };

  return (
    <div className="search-div">
      <input
        className="serach-input"
        placeholder="Find server"
        onChange={handleInput}
      ></input>
      {/* <button
        className="search-btn"
        onClick={() => {
          handleSearchClick();
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button> */}
    </div>
  );
};

export default Search;
