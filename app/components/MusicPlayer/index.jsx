'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  nextSong,
  prevSong,
  playPause,
} from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { Card, IconButton, Slider, Text } from '@radix-ui/themes';
import { MdSkipPrevious } from 'react-icons/md';
import { HiForward } from 'react-icons/hi2';
import { BsFastForward } from 'react-icons/bs';
const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState([30]);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (currentSongs.length) dispatch(playPause(true));
  // }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <Card className='rounded-full right-1/2 absolute bottom-5 m-auto translate-x-1/2  px-2 w-full flex items-center  max-w-screen-xl '>
      <Controls
        isPlaying={isPlaying}
        isActive={isActive}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        currentSongs={currentSongs}
        handlePlayPause={handlePlayPause}
      />

      <Track
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      {/* 
      <Seekbar
        value={appTime}
        min='0'
        max={duration}
        onInput={(event) => setSeekTime(event.target.value)}
        setSeekTime={setSeekTime}
        appTime={appTime}
      /> */}
      <div className='flex-1 flex flex-col items-center justify-center'>
        {/* <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        /> */}
      </div>
      <VolumeBar value={volume} setVolume={setVolume} />
    </Card>
  );
};

export default MusicPlayer;
