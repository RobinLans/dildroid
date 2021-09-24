import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import AddToPlaylist from "./AddToPlaylist";
import style from "../styles/SongItem.module.css";

function SongItem(props) {
  let { name, artist, videoId, type, duration, title, isCurrent } = props;
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [added, setAdded] = useState(false);

  console.log(isCurrent, name);

  let multipleArtist = [];
  let artistString = "";

  //Handle if multiple artist collab on one song. Convert obj to string.
  if (title) name = title;
  if (Array.isArray(artist)) {
    artist.map((a) => {
      multipleArtist.push(a.name);
    });
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
      {/* {type === "artist" && (
                                    <div>
                                      <h4>{name}</h4>
                                    </div>
                                  )} */}{" "}
    </>
  );
}

export default SongItem;
