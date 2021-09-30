import React, { useState, useEffect } from "react";

//Components
import SongItem from "./SongItem";
import YouTubePlayer from "./YouTubePlayer";
import PlayerControls from "./PlayerControls";

import style from "../styles/Getsongs.module.css";

function GetSongs({
  searchType,
  playlistId,
  inputValue,
  searched,
  queuedSongs,
}) {
  const [musicList, setMusicList] = useState([]);
  const [removedFromQueue, setRemovedFromQueue] = useState(false);

  async function fetchPlaylist() {
    const response = await fetch(`/playlist/${playlistId}`);
    const result = await response.json();
    setMusicList(result.songs);
  }
  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  async function fetchMusic() {
    if (inputValue) {
      const response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/${searchType}/${inputValue}`
      );
      let result = await response.json();

      setMusicList(result.content);
    } else if (queuedSongs && !removedFromQueue) {
      setMusicList(queuedSongs);
    } else if (removedFromQueue) {
      setMusicList(JSON.parse(localStorage.getItem("queue")));
      setRemovedFromQueue(false);
    }
  }

  useEffect(() => {
    fetchMusic();
  }, [queuedSongs]);

  // If musicList is true this function will run (See line 116)
  // The function maps through musicList and mounts SearchItem on every instance,
  // it also sends down props that we can use later
  function listSongs() {
    return musicList?.map((song, index) => (
      <SongItem
        {...song}
        key={index}
        index={index}
        giveBackIndex={giveBackIndexAndStartPlaylist}
        isCurrent={currentIndex === index}
        whenRemovedFromQueue={whenRemovedFromQueue}
      />
    ));
  }

  function whenRemovedFromQueue() {
    setRemovedFromQueue(true);
  }

  useEffect(() => {
    if (removedFromQueue) fetchMusic();
  }, [removedFromQueue]);

  //YT Player stuff
  const [player, setPlayer] = useState();
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeat, setRepeat] = useState(false);

  //Youtube player variable
  function sendPlayerBack(player) {
    setPlayer(player);
  }

  //This function gets the index and time from SearchItem
  async function giveBackIndexAndStartPlaylist(index, time) {
    setShowControls(true);
    whenUnPause();
    setDuration(time);
    setCurrentIndex(index);

    await player.internalPlayer.loadVideoById(musicList[index]);
  }

  function pausePlayer() {
    player.internalPlayer.pauseVideo();
    setPaused(true);
  }


  //This function gets called in PlayerControls
  function playPlayer() {
    player.internalPlayer.playVideo();
    whenUnPause();
  }
  //if we move the input slider in PlayerControls this function will run
  function handleInputChange(e) {
    player.internalPlayer.seekTo(e, true);
    setCurrentTime(e);
  }

  //Runs on video end
  function handleEnd() {
    if (repeat) {
      player.internalPlayer.seekTo(0, true);
    } else {
      playNextVideoInPlaylist();
    }
  }

  function playNextVideoInPlaylist() {
    player.internalPlayer.loadVideoById(musicList[currentIndex + 1]);
    whenUnPause();
    const songLength = musicList[currentIndex + 1]?.duration;
    setDuration(songLength);
    if (currentIndex + 1 < musicList.length + 1)
      setCurrentIndex(currentIndex + 1);
  }

  function playPreviuosVideoInPlaylist() {
    player.internalPlayer.loadVideoById(musicList[currentIndex - 1]);
    whenUnPause();
    const songLength = musicList[currentIndex - 1].duration;
    setDuration(songLength);
    if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
  }

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
            song={musicList[currentIndex]}
            setRepeat={setRepeat}
            repeat={repeat}
          />
        )}
        <YouTubePlayer sendPlayerBack={sendPlayerBack} handleEnd={handleEnd} />
      </div>
    </div>
  );
}

export default GetSongs;
