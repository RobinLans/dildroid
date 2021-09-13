import React, { useState, useEffect } from "react";

//Components
import SearchItem from "./SearchItem";
// import YouTubePlayer from "./YouTubePlayer";
// import PlayerControls from "./PlayerControls";

import style from "../styles/SearchResults.module.css";

function SearchResults() {
  const [musicList, setMusicList] = useState([]);
  const [searchType, setSearchType] = useState("songs");

  let textInput = React.createRef();

  async function fetchMusic() {
    if (!textInput.current.value) return;

    let response = await fetch(
      `https://yt-music-api.herokuapp.com/api/yt/${searchType}/${textInput.current.value}`
    );
    let result = await response.json();
    setMusicList(result.content);
  }

  function setType(e) {
    e.preventDefault();
    setSearchType(e.target.value);
  }

  function handleAlbumClick(albumName) {
    textInput.current.value = albumName;
    setSearchType("songs");
  }

  useEffect(() => {
    fetchMusic();
  }, [searchType]);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      fetchMusic();
      textInput.current.value = "";
    }
  };

  // If musicList is true this function will run (See line 150)
  // The function maps through musicList and mounts SearchItem on every instance,
  // it also sends down props that we can use later
  function searchResult() {
    return musicList.map((searchResult, index) => (
      <SearchItem
        {...searchResult}
        albumClick={handleAlbumClick}
        key={index}
        index={index}
      />
    ));
  }

  return (
    <div>
      <input type="text" ref={textInput} onKeyPress={handleKeypress} />
      <select value={searchType} onChange={setType}>
        <option value="songs">Songs</option>
        <option value="artists">Artists</option>
        <option value="albums">Album</option>
      </select>
      <button
        onClick={() => {
          fetchMusic();
          textInput.current.value = "";
        }}
      >
        Search
      </button>

      <div className={style.videowrapper}>
        <div className={style.videotextlist}></div>
        <div className="searchResult">{musicList && searchResult()}</div>
      </div>
    </div>
  );
}

export default SearchResults;
