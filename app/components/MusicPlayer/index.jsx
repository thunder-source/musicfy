'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  nextSong,
  prevSong,
  playPause,
} from '../../redux/features/playerSlice';
import LeftControls from './LeftControls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { Card, DropdownMenu, IconButton, Slider, Text } from '@radix-ui/themes';
import { MdSkipPrevious } from 'react-icons/md';
import { HiForward } from 'react-icons/hi2';
import { BsFastForward } from 'react-icons/bs';
import { FcLikePlaceholder } from 'react-icons/fc';
import { PiDotsThreeCircleVerticalBold } from 'react-icons/pi';
import { FcLike } from 'react-icons/fc';
const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState([30]);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [liked, setliked] = useState(false);
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
    <Card className='rounded-full right-1/2 absolute bottom-5 m-auto translate-x-1/2  px-2 w-full flex items-center justify-between  max-w-screen-xl '>
      <LeftControls
        isPlaying={isPlaying}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        handlePlayPause={handlePlayPause}
      />

      <Track
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
        value={appTime}
        max={duration}
        setSeekTime={setSeekTime}
        appTime={appTime}
      />

      <Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        currentIndex={currentIndex}
        onEnded={handleNextSong}
        onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
      />

      <IconButton
        variant='ghost'
        radius='full'
        size='2'
        color='gray'
        className='cursor-pointer p-2'
        onClick={() => {
          setliked(!liked);
        }}>
        {liked ? <FcLikePlaceholder size={25} /> : <FcLike size={25} />}
      </IconButton>

      <VolumeBar value={volume} setVolume={setVolume} />
      <MoreOptions />
    </Card>
  );
};

export default MusicPlayer;

const MoreOptions = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant='ghost'
          radius='full'
          size='2'
          color='gray'
          className='cursor-pointer p-2 mr-2'>
          <PiDotsThreeCircleVerticalBold size={25}>
            <DropdownMenu.Trigger />
          </PiDotsThreeCircleVerticalBold>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut='⌘ E'>Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut='⌘ D'>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ N'>Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut='⌘ ⌫' color='red'>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
