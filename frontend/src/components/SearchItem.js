import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faListUl, faHeart } from "@fortawesome/free-solid-svg-icons";

function SearchItem(props) {
  let { name, artist, videoId, type, duration } = props;

  let playList = [];
  function saveToPlaylist(id) {
    playList.push(id);
  }

  return (
    <>
      {type === "song" && (
        <>
          <div>
            <h4>{name}</h4>
            <p>{artist.name}</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
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
      )}

      {type === "artist" && (
        <div>
          <h4>{name}</h4>
        </div>
      )}

      {type === "album" && (
        <div>
          <h4
            onClick={() => {
              props.albumClick(name);
            }}
          >
            {name}
          </h4>
          <p>{artist}</p>
        </div>
      )}
    </>
  );
}

export default SearchItem;
