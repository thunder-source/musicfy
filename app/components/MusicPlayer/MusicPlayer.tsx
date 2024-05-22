'use client';
import React, { useState, useEffect } from 'react';
import {
  nextSong,
  prevSong,
  playPause,
} from '../../redux/features/playerSlice';
import LeftControls from './LeftControls';
import Player from './Player';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { FcLikePlaceholder } from 'react-icons/fc';
import { PiDotsThreeCircleVerticalBold } from 'react-icons/pi';
import { FcLike } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';

const MusicPlayer = () => {
  const {
    activeSong,
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
    volume,
  } = useAppSelector((state) => state.player);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [playerVolume, setPlayerVolume] = useState(volume);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [liked, setliked] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex, dispatch, currentSongs.length]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    if (currentIndex === currentSongs.length - 1) {
      dispatch(playPause(false));
      return undefined;
    }
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

  if (!isActive) {
    return;
  }

  if (!activeSong?.name) {
    return;
  }
  return (
    <div className='right-1/2 absolute bottom-5 m-auto translate-x-1/2 rounded-full  px-2 w-[95%] lg:w-[calc(100%_-_70px)]  flex items-center justify-between  max-w-screen-xl border-gray_a3 p-2 border-2  bg-accent_surface backdrop-blur-3xl shadow-sm '>
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
        activeSong={activeSong}
        value={appTime}
        max={duration}
        setSeekTime={setSeekTime}
        currentSongs={currentSongs}
        currentIndex={currentIndex}
      />

      <Player
        activeSong={activeSong}
        volume={playerVolume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        onEnded={handleNextSong}
        onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
      />
      <div className='flex'>
        {/* <IconButton
          variant='ghost'
          radius='full'
          size='2'
          color='gray'
          className='cursor-pointer p-2 hidden lg:block'
          onClick={() => {
            setliked(!liked);
          }}>
          {liked ? <FcLikePlaceholder size={25} /> : <FcLike size={25} />}
        </IconButton> */}

        <VolumeBar value={playerVolume} setVolume={setPlayerVolume} />
        {/* <MoreOptions /> */}
      </div>
    </div>
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
          className='cursor-pointer p-2 mr-2 hidden lg:block'>
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
