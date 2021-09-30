import React, { useState, useEffect, useRef } from "react";
import style from "../styles/AddToPlaylist.module.css";

function AddToPlaylist({ ...props }) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const textInput = useRef();
  

  async function fetchUsersPlaylists() {
    let userId = localStorage.getItem("UserId");
    let result = await fetch(`/users-playlist/${userId}`);
    let data = await result.json();
    console.log(data.playlists);
    setUserPlaylists(data.playlists);
  }

  useEffect(() => {
    fetchUsersPlaylists();
  }, []);

  async function addToPlaylist(playlistId) {
    const songToAdd = {
      title: props.title,
      playlistId,
      videoId: props.videoId,
      artist: props.artist.name,
      duration: props.duration,
    };
    let response = await fetch("/add-song", {
      method: "POST",
      body: JSON.stringify(songToAdd),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    props.whenAdded();
  }

  async function addNewPlaylist() {
    const newPlaylist = {
      name: textInput.current.value,
      userId: localStorage.getItem("UserId"),
    };

    let response = await fetch("/add-playlist", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    textInput.current.value = "";

    setUserPlaylists([]);
    fetchUsersPlaylists();
  }

  return (
    <>
      <div className={style.modal}>
        <button onClick={props.whenAdded} className={style.exitBtn}>
          X{" "}
        </button>{" "}
        <div className={style.playlistContainer}>
          {" "}
          {userPlaylists &&
            userPlaylists.map((playlist) => (
              <div className="songContainer" key={playlist.id}>
                <h3
                  onClick={() => {
                    addToPlaylist(playlist.id);
                  }}
                >
                  {" "}
                  {playlist.name}{" "}
                </h3>{" "}
              </div>
            ))}{" "}
        </div>{" "}
        <div className={style.newPlaylist}>
          <input
            className={style.nameInput}
            type="text"
            ref={textInput}
            placeholder="Add new playlist"
          />
          <button onClick={addNewPlaylist}> + </button>
        </div>
      </div>
    </>
  );
}

export default AddToPlaylist;
