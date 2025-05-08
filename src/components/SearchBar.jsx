import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search Projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
//comment