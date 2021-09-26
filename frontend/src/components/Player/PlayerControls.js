import React, { useState, useRef, useEffect } from "react";

//FontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/PlayerControls.module.css";

//Utils functions
import {
  secondsToMinutesAndSeconds,
  millisToMinutesAndSeconds,
} from "../../utilities/utils";

function PlayerControls({
  pauseVideo,
  paused,
  playVideo,
  duration,
  handleInputChange,
  animation,
  nextVideo,
  previousVideo,
  player,
  songHasEnded,
}) {
  const progressBar = useRef(); //reference to progress bar
  const animationRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);

  //Everytime the duration updates, the max value on the slider updates aswell
  useEffect(() => {
    progressBar.current.max = duration / 1000;
  }, [duration]);

  //Here we get the value from the slider when it changes, the we call handleInputChage from SearchResult
  function getValue(e) {
    const sliderValue = e.target.value;
    setCurrentTime(sliderValue);
    handleInputChange(sliderValue);
  }
// This checks if there is a song currently onabort, if there is then update the progress animation
  if (progressBar.current) {
    if (animation) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    // Otherwise if there is no animation ongoing (no song playing) then cancel the progressbar
    } else if (!animation) {
      cancelAnimationFrame(animationRef.current);
    }
  }

// Function for copying the url of the song to the clipboard
  function shareUrl() {
    let url = navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${localStorage.getItem("id")}`
    );
    console.log(url);
  }

  function whilePlaying() {
    if (isNaN(progressBar.current.value)) return;
    progressBar.current.value = currentTime;
  }
  console.log(player);

  //Here we update the current time every second
  setInterval(async () => {
    setCurrentTime(await player.internalPlayer.getCurrentTime());
  }, 1000);

  return (
    <div className={style.controlContainer}>
      <div className={style.artist}>
        <h2> {localStorage.getItem("artist")} - </h2>
        <h2> {localStorage.getItem("name")} </h2>
      </div>
      <div className={style.progress}>
        <div className={style.currentTime}>
          
          {secondsToMinutesAndSeconds(currentTime)}
        </div>
        <div>
          <input
            type="range"
            defaultValue="0"
            onChange={getValue}
            className={style.progressBar}
            ref={progressBar}
            max={100}
          />
        </div>
        <div className={style.currentTime}>
          
          {millisToMinutesAndSeconds(duration)}
        </div>
      </div>
      <div className={style.buttons}>
        <button onClick={previousVideo}>
          <FontAwesomeIcon icon={faFastBackward} />
        </button>
        {paused ? (
          <button className={style.play} onClick={playVideo}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        ) : (
          <button className={style.pause} onClick={pauseVideo}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}
        <button onClick={nextVideo}>
          <FontAwesomeIcon icon={faFastForward} />
        </button>
        <button className={style.share} onClick={shareUrl}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  );
}

export default PlayerControls;
