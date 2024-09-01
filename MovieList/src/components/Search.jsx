import React from "react";
import { IoIosSearch } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";

const Search = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setQuery(value); // Update parent state with the search query
  };

  return (
    <div className="absolute top-4 right-14 m-1 rounded-lg w-64 h-11 bg-white flex items-center flex-row">
      <IoIosSearch className="absolute top-2 ml-2 h-7 w-7" />
      <input
        className="w-56 rounded-lg text-center p-2 outline-none"
        type="text"
        placeholder="Search"
        value={input}
        onChange={handleSearchChange}
      />
      {input && (
        <TiDelete
          className="absolute top-2 right-3 h-7 w-7 cursor-pointer"
          onClick={() => {
            setInput("");
            setQuery(""); // Clear query when deleting input
          }}
        />
      )}
    </div>
  );
};

export default Search;
