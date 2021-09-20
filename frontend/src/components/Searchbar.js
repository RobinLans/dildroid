import React, { useState, useRef, useEffect } from "react";
import GetSongs from "./GetSongs";



function Searchbar() {
  const [searchType, setSearchType] = useState("songs");
  const [searchString, setSearchString] = useState("");
  const [searched, setSearched] = useState(false);

  let textInput = useRef();

  function checkSearchInput(inputValue){
    if (inputValue.includes("/")){
      return true
    }
  }

  function setType(e) {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setSearchString();
      if(checkSearchInput(textInput.current.value)) return
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
      <input type="text" ref={textInput} onKeyPress={handleKeypress} />{" "}
      <select value={searchType} onChange={setType}>
        <option value="songs"> Songs </option>{" "}
        <option value="artists"> Artists </option>{" "}
      </select>{" "}
      <button
        onClick={() => {
          //Return instantly if input value in searchbar includes these tokens.
          if(checkSearchInput(textInput.current.value)) return
            setSearchString();
          setSearchString(textInput.current.value);
          textInput.current.value = "";
          setSearched(true);
        }}
      >
        Search{" "}
      </button>{" "}
      {searchString && (
        <GetSongs
          searchType={searchType}
          inputValue={searchString}
          searched={searched}
        />
      )}{" "}
    </div>
  );
}

export default Searchbar;
