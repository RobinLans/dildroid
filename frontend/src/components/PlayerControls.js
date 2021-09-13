import React, { useState, useRef, useEffect } from "react";

//FontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/PlayerControls.module.css";

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
}) {
  const durationInMinutes = millisToMinutesAndSeconds(duration); //runs a utils function
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
    console.log("hejsan", progressBar.current.value);
    progressBar.current.value = currentTime;
  }

  //Here we update the current time every second
  setInterval(async () => {
    setCurrentTime(await player.internalPlayer.getCurrentTime());
  }, 1000);

  return (
    <div className={style.controlContainer}>
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
        <div className={style.currentTime}>{durationInMinutes}</div>
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
      </div>
    </div>
  );
}

export default PlayerControls;
