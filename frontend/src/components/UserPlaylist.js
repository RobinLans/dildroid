import React from "react";
import { useParams } from "react-router-dom";
import GetSongs from "./GetSongs";

function UserPlaylist() {
  let { id } = useParams();

  console.log("asdd", id);

  return (
    <>
      <GetSongs playlistId={id} />
    </>
  );
}

export default UserPlaylist;
