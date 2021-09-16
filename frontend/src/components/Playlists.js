import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Playlists() {
  const history = useHistory();
  const [userPlaylists, setUserPlaylists] = useState([]);

  async function fetchUsersPlaylists() {
    let id = 9;
    let result = await fetch(`/users-playlist/${id}`);
    let data = await result.json();
    setUserPlaylists(data.playlists);
  }

  useEffect(() => {
    fetchUsersPlaylists();
  }, []);

  console.log(userPlaylists);

  function goToPlaylist(id) {
    history.push("/user-playlist/" + id);
  }

  return (
    <>
      {userPlaylists &&
        userPlaylists.map((playlist) => (
          <div
            className="songContainer"
            key={playlist.id}
            onClick={() => {
              goToPlaylist(playlist.id);
            }}
          >
            <h3>{playlist.name}</h3>
          </div>
        ))}
    </>
  );
}

export default Playlists;
