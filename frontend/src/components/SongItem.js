import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

//Components
import AddToPlaylist from "./AddToPlaylist";
import style from "../styles/SongItem.module.css";

// A function that sets the props for SongItem that gets accessed in other components
function SongItem(props) {
  let { name, artist, videoId, type, duration, title, isCurrent } = props;
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [added, setAdded] = useState(false);

  console.log(isCurrent, name);

  let multipleArtist = [];
  let artistString = "";

  //If the title of a song already exists then call title, name instead
  if (title) name = title;
  //If the title is an array (more than one artist) then create a new array with artist.map and push it into multipleArtist
  if (Array.isArray(artist)) {
    artist.map((a) => {
      multipleArtist.push(a.name);
    });
    //Convert multipleArtist to a string and call it artistString
    artistString = multipleArtist.toString();
  }

  function whenAdded() {
    setAdded(true);
  }

  return (
    <>
      <div
        className={style.songContainer}
        onClick={() => {
          localStorage.setItem("id", videoId);
          props.giveBackIndex(props.index, duration);
        }}
      >
        <div className={style.textContainer}>
          <h4>{name}</h4>
          {artist.name ? <p> {artist.name} </p> : <p> {artistString} </p>}
          {typeof artist === "string" && <p> {artist} </p>}
        </div>
        <div className={style.buttonContainer}>
          <button
            className={style.playBtn}
            onClick={() => {
              localStorage.setItem("id", videoId);
              props.giveBackIndex(props.index, duration);
            }}
          >
            {<FontAwesomeIcon icon={faPlay} />}
          </button>
          <button
            onClick={() => {
              setShowPlaylists(true);
            }}
          >
            {<FontAwesomeIcon icon={faPlus} />}
          </button>
          <button> {<FontAwesomeIcon icon={faHeart} />}</button>
        </div>
      </div>
      {!added && showPlaylists && (
        <>
          <div
            onClick={() => {
              setShowPlaylists(false);
            }}
            class={style.overlay}
          ></div>
          <div className={style.playListModal}>
            <AddToPlaylist
              title={name}
              artist={artist}
              videoId={videoId}
              duration={duration}
              whenAdded={whenAdded}
            />
          </div>
        </>
      )}
    </>
  );
}

export default SongItem;
