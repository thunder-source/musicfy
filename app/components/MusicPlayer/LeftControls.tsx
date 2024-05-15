import React from 'react';
import { RxLoop } from 'react-icons/rx';
import { BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { IconButton, Tooltip } from '@radix-ui/themes';

type props = {
  isPlaying: Boolean;
  repeat: Boolean;
  shuffle: Boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlayPause: () => {};
};

const LeftControls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  handlePlayPause,
}: props) => {
  return (
    <div className='flex items-center gap-4 px-2 '>
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
      <Tooltip content='Loop'>
        <IconButton
          onClick={() => setRepeat((prev) => !prev)}
          variant='ghost'
          radius='full'
          color='gray'
          className={`p-2 mx-1 cursor-pointer hidden sm:block ${
            repeat && 'bg-gray_a5'
          }`}>
          <RxLoop size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip content='Shuffle' className='fill-transparent'>
        <IconButton
          variant='ghost'
          radius='full'
          size='4'
          color='gray'
          onClick={() => setShuffle((prev) => !prev)}
          className={`p-2 cursor-pointer hidden sm:block ${
            shuffle && 'bg-gray_a5'
          } `}>
          <BsShuffle size={20} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LeftControls;
