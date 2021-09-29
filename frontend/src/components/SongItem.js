import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MdQueueMusic } from "react-icons/md";
import AddToPlaylist from "./AddToPlaylist";
import style from "../styles/SongItem.module.css";

function SongItem(props) {
  
  let { name, artist, videoId, type, duration, title, isCurrent, queued } =
    props;
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [added, setAdded] = useState(false);

  //The song name is called title in our db, so here we just change so that name is the
  //same as title so that we can still use name in the JSX
  if (title) name = title;

  //Handle if multiple artist collab on one song. Convert array to string.
  let multipleArtist = [];
  let artistString = "";

  if (Array.isArray(artist)) {
    artist.map((a) => {
      multipleArtist.push(a.name);
    });
    artistString = multipleArtist.toString();
  }

  function whenAdded() {
    setAdded(true);
  }

  async function removeFromPlaylist() {
    const response = await fetch(
      `/playlist-remove-song/${props.playlist_id}/${props.id}`
    );
    let data = await response.json();

    console.log(data.success);
  }

  // Handling the queue
  function addToQueue() {
    if (artistString) artist.name = artistString;

    const songToAdd = {
      name,
      videoId,
      artist: artist.name,
      duration: duration,
      queued: true,
    };

    let queueArray;

    if (localStorage.getItem("queue")) {
      queueArray = JSON.parse(localStorage.getItem("queue"));
      queueArray.push(songToAdd);
    } else {
      queueArray = [songToAdd];
    }

    localStorage.setItem("queue", JSON.stringify(queueArray));
  }

  function removeFromQueue() {
    let queuedSongs = JSON.parse(localStorage.getItem("queue"));

    if (props.index > -1) {
      queuedSongs.splice(props.index, 1);
    }

    localStorage.setItem("queue", JSON.stringify(queuedSongs));
    props.whenRemovedFromQueue();
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
          <h4 className={isCurrent ? `${style.playing}` : ""}>
            {name}
          </h4>
          {artist?.name ? <p> {artist.name} </p> : <p> {artistString} </p>}
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
            data-tippy="Add to playlist"
            className={style.addToPlaylist}
            onClick={() => {
              setShowPlaylists(true);
            }}
          >
            {<FontAwesomeIcon icon={faPlus} />}
          </button>

          {queued ? (
            <button
              className={style.removeFromQueue}
              onClick={removeFromQueue}
              data-tippy="Remove from queue"
            >
              {<FontAwesomeIcon icon={faTrash} />}
            </button>
          ) : (
            <button
              data-tippy="Add to queue"
              className={style.queueBtn}
              onClick={addToQueue}
            >
              <MdQueueMusic />
            </button>
          )}

          {props.playlist_id && (
            <button
              className={style.removeFromPlaylist}
              onClick={removeFromPlaylist}
              data-tippy="Remove from playlist"
            >
              {<FontAwesomeIcon icon={faTrash} />}
            </button>
          )}
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
