import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import style from "../styles/PlayerControls.module.css";

function PlayerControls({
  pauseVideo,
  paused,
  playVideo,
  duration,
  currentTime,
  handleInputChange,
  animation,
  nextVideo,
  previousVideo,
}) {
  return (
    <div className={style.controlContainer}>
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
