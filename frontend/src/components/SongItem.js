import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

function SongItem(props) {
  console.log(props);
  let { name, artist, videoId, type, duration, title } = props;

  let multipleArtist = [];
  let artistString = '';

  //Handle if multiple artist collab on one song. Convert obj to string.
  if (title) name = title;
  if (Array.isArray(artist)) {
    artist.map((a) => {
      multipleArtist.push(a.name);
    });
    artistString = multipleArtist.toString();
  }

  let playList = [];

  function saveToPlaylist(id) {
    playList.push(id);
  }

  return (
    <>
      <div>
        <h4> {name} </h4>{' '}
        {artist.name ? <p> {artist.name} </p> : <p> {artistString} </p>}{' '}
        {typeof artist === 'string' && <p> {artist} </p>}{' '}
      </div>{' '}
      <div className="buttons">
        <button
          onClick={() => {
            localStorage.setItem('id', videoId);
            props.giveBackIndex(props.index, duration);
          }}
        >
          {' '}
          {<FontAwesomeIcon icon={faPlay} />}{' '}
        </button>
        <button onClick={() => saveToPlaylist(videoId)}>
          {' '}
          {<FontAwesomeIcon icon={faPlus} />}{' '}
        </button>{' '}
        <button> {<FontAwesomeIcon icon={faHeart} />}</button>
      </div>
      {/* {type === "artist" && (
                                    <div>
                                      <h4>{name}</h4>
                                    </div>
                                  )} */}{' '}
    </>
  );
}

export default SongItem;
