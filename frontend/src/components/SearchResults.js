import React, { useState, useEffect } from "react";

//Components
import SearchItem from "./SearchItem";
import YouTubePlayer from "./YouTubePlayer";
import PlayerControls from "./PlayerControls";

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
        giveBackIndex={giveBackIndexAndStartPlaylist}
      />
    ));
  }

  //YT Player stuff
  const [player, setPlayer] = useState();
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState("");
  const [animation, setAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function sendPlayerBack(player) {
    setPlayer(player);
  }

  //This function gets the index and time from SearchItem
  function giveBackIndexAndStartPlaylist(index, time) {
    const arrayOfVideoIds = musicList.map((song) => song.videoId);
    setShowControls(true);
    whenUnPause();
    setDuration(time);
    setCurrentIndex(index);
    player.internalPlayer.loadPlaylist(arrayOfVideoIds, index);
  }

  function pausePlayer() {
    console.log("pause");
    player.internalPlayer.pauseVideo();
    setPaused(true);
    // setAnimation(false);
  }

  //This function gets called in PlayerControls
  function playPlayer() {
    console.log("play");
    player.internalPlayer.playVideo();
    whenUnPause();
  }

  //if we move the input slider in PlayerControls this function will run
  function handleInputChange(e) {
    player.internalPlayer.seekTo(e, true);
    setCurrentTime(e);
  }

  function playNextVideoInPlaylist() {
    player.internalPlayer.nextVideo();
    whenUnPause();
    const songLength = musicList[currentIndex + 1].duration;
    setDuration(songLength);
    if (currentIndex + 1 < musicList.length + 1)
      setCurrentIndex(currentIndex + 1);
  }
  function playPreviuosVideoInPlaylist() {
    player.internalPlayer.previousVideo();
    whenUnPause();
    const songLength = musicList[currentIndex - 1].duration;
    setDuration(songLength);
    if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
  }

  function whenUnPause() {
    setPaused(false);
    setAnimation(true);
  }

  // function songHasEnded(ended) {
  //   console.log(ended);
  //   setCurrentIndex(currentIndex + 1);
  //   console.log(currentIndex);
  //   const songLength = musicList[currentIndex].duration;
  //   console.log(songLength);
  //   setDuration(songLength);
  // }

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
        <YouTubePlayer sendPlayerBack={sendPlayerBack} />
        {showControls && (
          <PlayerControls
            pauseVideo={pausePlayer}
            playVideo={playPlayer}
            nextVideo={playNextVideoInPlaylist}
            previousVideo={playPreviuosVideoInPlaylist}
            paused={paused}
            currentTime={currentTime}
            duration={duration}
            handleInputChange={handleInputChange}
            animation={animation}
            player={player}
            // songHasEnded={songHasEnded}
          />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
