import React, { useState, useEffect } from "react";

//Components
import SongItem from "./SongItem";
import YouTubePlayer from "./YouTubePlayer";
import PlayerControls from "./PlayerControls";

import style from "../styles/Getsongs.module.css";

function GetSongs({ searchType, playlistId, inputValue, searched }) {
  const [musicList, setMusicList] = useState([]);


  // Function that uses the passed down props from GetSongs
  function handleArtistClick(artistName) {
    console.log(artistName);
    inputValue = artistName;
    searchType = "songs";
    fetchMusic();
  }

  //This is where we fetch the searchresult wether it's a playlist id or simply the searched term (inputvalue)
  async function fetchMusic() {
    if (playlistId) {
      const response = await fetch(`/playlist/${playlistId}`);
      let result = await response.json();
      setMusicList(result.songs);
    } else if (inputValue) {
      const response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/${searchType}/${inputValue}`
      );
      let result = await response.json();
      console.log(result.content);

      setMusicList(result.content);
    }
  }

  if (searched || playlistId) {
    fetchMusic();
  }

  // If musicList is true this function will run
  // The function maps through musicList and mounts SearchItem on every instance,
  // it also sends down props that we can use later
  function listSongs() {
    return musicList.map((song, index) => (
      <SongItem
        {...song}
        key={index}
        index={index}
        giveBackIndex={giveBackIndexAndStartPlaylist}
        handleArtistClick={handleArtistClick}
        isCurrent={currentIndex === index}
      />
    ));
  }

  //YT Player states
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

  // setAnimation(false);
  function pausePlayer() {
    player.internalPlayer.pauseVideo();
    setPaused(true);
  }

  //This function gets called in PlayerControls
  function playPlayer() {
    player.internalPlayer.playVideo();
    whenUnPause();
  }

  //If we move the input slider in PlayerControls this function will run
  function handleInputChange(e) {
    player.internalPlayer.seekTo(e, true);
    setCurrentTime(e);
  }

  //Skip to the next track in the playlist
  function playNextVideoInPlaylist() {
    player.internalPlayer.nextVideo();
    whenUnPause();
    const songLength = musicList[currentIndex + 1].duration;
    setDuration(songLength);
    if (currentIndex + 1 < musicList.length + 1)
      setCurrentIndex(currentIndex + 1);
  }

  //Skip to the previous track in the playlist
  function playPreviuosVideoInPlaylist() {
    player.internalPlayer.previousVideo();
    whenUnPause();
    const songLength = musicList[currentIndex - 1].duration;
    setDuration(songLength);
    if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
  }

  //If a song is playing the paused is false and the progressbar should start 
  function whenUnPause() {
    setPaused(false);
    setAnimation(true);
  }

  return (
    <div className={style.container}>
      <div className={style.searchResult}>{musicList && listSongs()}</div>
      <div className={style.playerContainer}>
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
          />
        )}
        <YouTubePlayer sendPlayerBack={sendPlayerBack} />{" "}
      </div>
    </div>
  );
}

export default GetSongs;
