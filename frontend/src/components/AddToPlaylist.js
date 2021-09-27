import React, { useState, useEffect, useRef } from "react";

//Components
import style from "../styles/AddToPlaylist.module.css";

// Function that adds all the props from the function SongItem in SongItem.js line 10, to a playlist
function AddToPlaylist({ ...props }) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const textInput = useRef();
  console.log(userPlaylists);

  //Fetches the users playlist that are logged to their user id
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

  //Gets the propts from SongItem.js and assigns them to title, videoId, artist and duration
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
    {/* Once addToPlaylist button has been pressed then create a modal window with all the available playlists */}
      <div className={style.modal}>
        <button onClick={props.whenAdded} className={style.exitBtn}>
          X
        </button>
        <div className={style.playlistContainer}>
          {userPlaylists &&
            userPlaylists.map((playlist) => (
              <div className="songContainer" key={playlist.id}>
                <h3
                  onClick={() => {
                    addToPlaylist(playlist.id);
                  }}
                >
                  {playlist.name}
                </h3>
              </div>
            ))}
        </div>
        <div className={style.newPlaylist}>
          <input
            className={style.nameInput}
            type="text"
            ref={textInput}
            placeholder="Add new playlist"
          />
          <button onClick={addNewPlaylist} className={style.addBtn}> + </button>
        </div>
      </div>
    </>
  );
}

export default AddToPlaylist;
