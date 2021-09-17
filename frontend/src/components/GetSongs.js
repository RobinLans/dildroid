import React, { useState, useEffect } from "react";

//Components
import SongItem from "./SongItem";
import YouTubePlayer from "./YouTubePlayer";
import PlayerControls from "./PlayerControls";

import style from "../styles/SearchResults.module.css";

function GetSongs({ searchType, playlistId, inputValue }) {
    const [musicList, setMusicList] = useState([]);
    console.log(playlistId);

    async function fetchMusic() {
        if (playlistId) {
            const response = await fetch(`/playlist/${playlistId}`);
            let result = await response.json();
            console.log(result.songs);
            setMusicList(result.songs);
        } else if (inputValue) {
            const response = await fetch(
                `https://yt-music-api.herokuapp.com/api/yt/${searchType}/${inputValue}`
            );
            let result = await response.json();
            console.log(result.content);

            setMusicList(result.content);
        }
    }

    useEffect(() => {
        fetchMusic();
    }, [inputValue]);

    // If musicList is true this function will run (See line 116)
    // The function maps through musicList and mounts SearchItem on every instance,
    // it also sends down props that we can use later
    function listSongs() {
        return musicList.map((song, index) => ( <
            SongItem {...song }
            key = { index }
            index = { index }
            giveBackIndex = { giveBackIndexAndStartPlaylist }
            />
        ));
    }

    //YT Player stuff
    const [player, setPlayer] = useState();
    const [paused, setPaused] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [duration, setDuration] = useState("");
    const [animation, setAnimation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    function sendPlayerBack(player) {
        setPlayer(player);
    }

    //This function gets the index and time from SearchItem
    function giveBackIndexAndStartPlaylist(index, time) {
        const arrayOfVideoIds = musicList.map((song) => song.videoId);
        setShowControls(true);
        whenUnPause();
        setDuration(time);
        setCurrentIndex(index);
        player.internalPlayer.loadPlaylist(arrayOfVideoIds, index);
    }

    function pausePlayer() {
        player.internalPlayer.pauseVideo();
        setPaused(true);
        // setAnimation(false);
    }

    //This function gets called in PlayerControls
    function playPlayer() {
        player.internalPlayer.playVideo();
        whenUnPause();
    }

    //if we move the input slider in PlayerControls this function will run
    function handleInputChange(e) {
        player.internalPlayer.seekTo(e, true);
        setCurrentTime(e);
    }

    function playNextVideoInPlaylist() {
        player.internalPlayer.nextVideo();
        whenUnPause();
        const songLength = musicList[currentIndex + 1].duration;
        setDuration(songLength);
        if (currentIndex + 1 < musicList.length + 1)
            setCurrentIndex(currentIndex + 1);
    }

    function playPreviuosVideoInPlaylist() {
        player.internalPlayer.previousVideo();
        whenUnPause();
        const songLength = musicList[currentIndex - 1].duration;
        setDuration(songLength);
        if (currentIndex - 1 >= 0) setCurrentIndex(currentIndex - 1);
    }

    function whenUnPause() {
        setPaused(false);
        setAnimation(true);
    }

    return ( <
        div >
        <
        div className = { style.videowrapper } >
        <
        div className = { style.videotextlist } > < /div> <
        div className = "searchResult" > { musicList && listSongs() } < /div> <
        YouTubePlayer sendPlayerBack = { sendPlayerBack }
        /> {
            showControls && ( <
                PlayerControls pauseVideo = { pausePlayer }
                playVideo = { playPlayer }
                nextVideo = { playNextVideoInPlaylist }
                previousVideo = { playPreviuosVideoInPlaylist }
                paused = { paused }
                currentTime = { currentTime }
                duration = { duration }
                handleInputChange = { handleInputChange }
                animation = { animation }
                player = { player }
                />
            )
        } <
        /div> <
        /div>
    );
}

export default GetSongs;