import React, { useState, useEffect } from "react";
import YouTubePlayer from "./YouTubePlayer";
import PlayerControls from "./PlayerControls";

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
        sendVideoId={setNewVideoId}
      />
    ));
  }

  //YT Player stuff
  const [videoId, setVideoId] = useState("");
  const [player, setPlayer] = useState();
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  function setNewVideoId(id) {
    setVideoId(id);
    setShowControls(true);
    setPaused(false);
  }

  function sendPlayerBack(player) {
    // console.log(player);
    setPlayer(player);
  }

  function pausePlayer() {
    console.log("pause");
    player.internalPlayer.pauseVideo();
    setPaused(true);
    // setAnimation(false);
  }

  function playPlayer() {
    console.log("play");
    player.internalPlayer.playVideo();
    setPaused(false);
    // whenUnPause();
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
      {videoId && (
        <YouTubePlayer videoId={videoId} sendPlayerBack={sendPlayerBack} />
      )}
      {showControls && (
        <PlayerControls
          pauseVideo={pausePlayer}
          playVideo={playPlayer}
          // nextVideo={playNextVideoInPlaylist}
          // previousVideo={playPreviuosVideoInPlaylist}
          paused={paused}
          // currentTime={currentTime}
          // duration={duration}
          // handleInputChange={handleInputChange}
          // animation={animation}
        />
      )}
    </div>
  );
}

export default SearchResults;
