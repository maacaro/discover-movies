import React, { useState } from "react";

export default Search;

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChanges = ({ target: { value } }) => {
    setSearchTerm(value);
  };
  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <>
      <input
        value={searchTerm}
        onChange={handleSearchChanges}
        type="search"
        placeholder="Search for a movie"
      ></input>
      <button onClick={handleSearchClick}>
        <i className="fa fa-search"></i>
      </button>
    </>
  );
}
