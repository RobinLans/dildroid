import React, { useState, useRef, useEffect } from "react";
import GetSongs from "./GetSongs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Searchbar.module.css";

function Searchbar() {
  const [searchType, setSearchType] = useState("songs");
  const [searchString, setSearchString] = useState("");
  const [searched, setSearched] = useState(false);

  let textInput = useRef();

  function checkSearchInput(inputValue) {
    if (inputValue.includes("/")) {
      return true;
    }
  }


  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setSearchString();
      if (checkSearchInput(textInput.current.value)) return;
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
    <div className={style.container}>
      <div className={style.searchContainer}>
        <input
          className={style.searchBar}
          type="text"
          ref={textInput}
          onKeyPress={handleKeypress}
          placeholder="Search for something"
        />{" "}
    
        <button
          className={style.searchBtn}
          onClick={() => {
            //Return instantly if input value in searchbar includes these tokens.
            if (checkSearchInput(textInput.current.value)) return;
            setSearchString();
            setSearchString(textInput.current.value);
            textInput.current.value = "";
            setSearched(true);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>{" "}
      </div>
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
