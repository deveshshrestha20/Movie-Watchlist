import React from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

const Search = () => {
  const [input, setInput] = useState("");
  return (
    <div className="absolute top-4 right-14 m-1 rounded-lg  w-56 h-11 bg-white flex items-center flex-row">
      <IoIosSearch className="absolute top-2  ml-2 h-7 w-5 " />
      <input
        className="w-56 rounded-lg text-center p-2 outline-none"
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {input && (
        <TiDelete
          className="absolute top-2 right-4 ml-2 h-7 w-5"
          onClick={() => {
            setInput("");
          }}
        />
      )}
    </div>
  );
};

export default Search;
