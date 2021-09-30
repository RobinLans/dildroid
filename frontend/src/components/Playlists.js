import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/Playlists.module.css"

function Playlists() {
  const history = useHistory();
  const [userPlaylists, setUserPlaylists] = useState([]);

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

  function goToPlaylist(id) {
    history.push("/user-playlist/" + id);
  }

  return (
    <>
  
    <div className={style.style_container}>
    <h1 className={style.playlist_text}>Playlists</h1>
      {" "}
      {userPlaylists &&
        userPlaylists.map((playlist) => (
          <div
            className={style.song_container}
            key={playlist.id}
            onClick={() => {
              goToPlaylist(playlist.id);
            }}
          >
            <h3> {playlist.name} </h3>{" "}
          </div>
        ))}{" "}
        </div>
    </>
  );
}

export default Playlists;
