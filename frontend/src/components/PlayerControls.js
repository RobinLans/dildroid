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
import style from "../styles/PlayerControls.module.css";
import { MdRepeat } from "react-icons/md";

//Utils functions
import {
  secondsToMinutesAndSeconds,
  millisToMinutesAndSeconds,
} from "../utilities/utils";

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
  song,
  setRepeat,
  repeat,
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

  if (progressBar.current) {
    if (animation) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else if (!animation) {
      cancelAnimationFrame(animationRef.current);
    }
  }
  function whilePlaying() {
    try {
      progressBar.current.value = currentTime;
    } catch (error) {}
  }
  
  function shareUrl() {
    navigator.clipboard.writeText(
      `https://www.youtube.com/watch?v=${localStorage.getItem("id")}`
    );
  }

  //Here we update the current time every second
  setInterval(async () => {
    setCurrentTime(await player.internalPlayer.getCurrentTime());
  }, 1000);

  function handleRepeat() {
    setRepeat(!repeat);
  }

  return (
    <main>
      <div className={style.controlContainer}>
        <p className={style.artist}>{song.artist.name}</p>
        <p className={style.song}>{song.name}</p>
        <div className={style.progress}>
          {/* Current Time */}
          <div className={style.currentTime}>
            {secondsToMinutesAndSeconds(currentTime)}
          </div>
          {/* Progress bar */}
          <div className={style.bar}>
            <input
              type="range"
              defaultValue="0"
              onChange={getValue}
              className={style.progressBar}
              ref={progressBar}
              max={100}
            />
          </div>
          {/* Duration */}
          <div className={style.currentTime}>
            {millisToMinutesAndSeconds(duration)}
          </div>
        </div>
        <div className={style.buttons}>
          {/* Repeat Button */}
          {repeat ? (
            <button className={style.currentlyRepeating} onClick={handleRepeat}>
              <MdRepeat />
            </button>
          ) : (
            <button className={style.repeatBtn} onClick={handleRepeat}>
              <MdRepeat />
            </button>
          )}
          {/* Previous Button */}
          <button onClick={previousVideo}>
            <FontAwesomeIcon icon={faFastBackward} />
          </button>
          {/* Play/Pause Button */}
          {paused ? (
            <button className={style.play} onClick={playVideo}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          ) : (
            <button className={style.pause} onClick={pauseVideo}>
              <FontAwesomeIcon icon={faPause} />
            </button>
          )}
          {/* Next Button */}
          <button onClick={nextVideo}>
            <FontAwesomeIcon icon={faFastForward} />
          </button>
          {/* Share Button */}
          <button className={style.share} onClick={shareUrl}>
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default PlayerControls;
