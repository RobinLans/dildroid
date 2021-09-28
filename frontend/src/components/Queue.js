import React, { useState } from "react";
import GetSongs from "./GetSongs";
import { BiShuffle } from "react-icons/bi";

function Queue() {
  const [queuedSongs, setQueuedSongs] = useState(
    JSON.parse(localStorage.getItem("queue"))
  );

  function shuffle() {
    let randomArray = queuedSongs.slice();

    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[randomNum]] = [
        randomArray[randomNum],
        randomArray[i],
      ];
    }
    setQueuedSongs(randomArray);
  }

  return (
    <>
      <header>
        <h1>Your queue</h1>
        <button onClick={shuffle}>
          <BiShuffle />
        </button>
      </header>
      <GetSongs queuedSongs={queuedSongs} />
    </>
  );
}

export default Queue;
