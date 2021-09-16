import React, { useState, useRef, useEffect } from "react";
import GetSongs from "./GetSongs";

function Searchbar() {
  const [searchType, setSearchType] = useState("songs");
  const [searchString, setSearchString] = useState("");

  let textInput = useRef();

  function setType(e) {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setSearchString();
      setSearchString(textInput.current.value);
      textInput.current.value = "";
    }
  };

  console.log("SearchString", searchString);

  return (
    <div>
      <input type="text" ref={textInput} onKeyPress={handleKeypress} />
      <select value={searchType} onChange={setType}>
        <option value="songs">Songs</option>
        {/* <option value="artists">Artists</option> */}
      </select>
      <button
        onClick={() => {
          console.log(textInput.current.value);
          setSearchString();
          setSearchString(textInput.current.value);
          textInput.current.value = "";
        }}
      >
        Search
      </button>
      {searchString && (
        <GetSongs searchType={searchType} inputValue={searchString} />
      )}
    </div>
  );
}

export default Searchbar;
