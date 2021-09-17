import React, { useState, useRef, useEffect } from "react";
import GetSongs from "./GetSongs";

function Searchbar() {
  const [searchType, setSearchType] = useState("songs");
  const [searchString, setSearchString] = useState("");
  const [searched, setSearched] = useState(false);

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
      setSearched(true);
    }
  };

  // If searched is true, we have to set it to false again so that we can toggle back and forth between true and false
  if (searched) {
    setTimeout(() => {
      setSearched(false);
    }, 500);
  }

  return (
    <div>
      <input type="text" ref={textInput} onKeyPress={handleKeypress} />
      <select value={searchType} onChange={setType}>
        <option value="songs">Songs</option>
        <option value="artists">Artists</option>
      </select>
      <button
        onClick={() => {
          console.log(textInput.current.value);
          setSearchString();
          setSearchString(textInput.current.value);
          textInput.current.value = "";
          setSearched(true);
        }}
      >
        Search
      </button>
      {searchString && (
        <GetSongs
          searchType={searchType}
          inputValue={searchString}
          searched={searched}
        />
      )}
    </div>
  );
}

export default Searchbar;
