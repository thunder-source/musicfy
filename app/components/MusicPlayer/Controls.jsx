import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';
import { Button, IconButton } from '@radix-ui/themes';
import { RxLoop } from 'react-icons/rx';
import { color } from 'framer-motion';
const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  return (
    <div className='flex items-center gap-4 px-2 md:w-36 lg:w-52 2xl:w-80'>
      {isPlaying ? (
        <IconButton variant='solid' radius='full' size='4' className='p-2'>
          <BsFillPauseFill
            size={45}
            onClick={handlePlayPause}
            className='cursor-pointer'
          />
        </IconButton>
      ) : (
        <IconButton variant='solid' radius='full' size='4' className='p-2'>
          <BsFillPlayFill
            size={45}
            onClick={handlePlayPause}
            className='cursor-pointer'
          />
        </IconButton>
      )}

      <IconButton
        onClick={() => setRepeat((prev) => !prev)}
        variant='ghost'
        radius='full'
        color='gray'
        className={`p-2 mx-1 cursor-pointer hidden sm:block ${
          repeat && 'bg-gray_a3'
        }`}>
        <RxLoop size={20} />
      </IconButton>

      <IconButton
        variant='ghost'
        radius='full'
        size='4'
        color='gray'
        onClick={() => setShuffle((prev) => !prev)}
        className={`p-2 cursor-pointer hidden sm:block ${
          shuffle && 'bg-gray_a3'
        } `}>
        <BsShuffle size={20} />
      </IconButton>
      {/* 
      <IconButton variant='solid' radius='full' size='4' className='p-2'>
        <MdSkipPrevious
          size={30}
          color='#FFF'
          className='cursor-pointer'
          onClick={handlePrevSong}
        />
      </IconButton>

      <IconButton variant='solid' radius='full' size='4' className='p-2'>
        <MdSkipNext
          size={30}
          color='#FFF'
          className='cursor-pointer'
          onClick={handleNextSong}
        />
      </IconButton> */}
    </div>
  );
};

export default Controls;
