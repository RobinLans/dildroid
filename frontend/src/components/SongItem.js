import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faListUl, faHeart } from "@fortawesome/free-solid-svg-icons";

function SongItem(props) {
  console.log(props);
  let { name, artist, videoId, type, duration, title, artistName } = props;

  console.log("fitta", artist);

  if (title) name = title;
  if (artistName) artist = artistName;

  let playList = [];
  function saveToPlaylist(id) {
    playList.push(id);
  }

  return (
    <>
      <>
        <div>
          <h4>{name}</h4>
          <p>{artist}</p>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              localStorage.setItem("id", videoId);
              props.giveBackIndex(props.index, duration);
            }}
          >
            {<FontAwesomeIcon icon={faPlay} />}
          </button>

          <button onClick={() => saveToPlaylist(videoId)}>
            {<FontAwesomeIcon icon={faListUl} />}
          </button>
          <button>{<FontAwesomeIcon icon={faHeart} />}</button>
        </div>{" "}
      </>

      {type === "artist" && (
        <div>
          {" "}
          <h4>{name}</h4>{" "}
        </div>
      )}
    </>
  );
}

export default SongItem;
