import { cleanName, parseHtmlToText } from '@/utility/cleanName';
import { Flex, IconButton } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';
import { BsFastForward } from 'react-icons/bs';
import { MdSkipNext } from 'react-icons/md';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { TbPlayerTrackPrev } from 'react-icons/tb';
import * as Slider from '@radix-ui/react-slider';
const Track = ({
  handlePrevSong,
  handleNextSong,
  isPlaying,
  isActive,
  activeSong,
  value,
  max,
  setSeekTime,
  appTime,
}) => {
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  return (
    <div className='flex flex-1 items-center justify-start w-full mx-28'>
      <IconButton
        variant='ghost'
        radius='full'
        size='2'
        color='gray'
        onClick={handlePrevSong}
        className={`p-2 cursor-pointer hidden sm:block  `}>
        <TbPlayerTrackPrev size={25} />
      </IconButton>
      <div className='flex gap-2 w-full mx-4'>
        <Image
          width={56}
          height={56}
          src={Array.isArray(activeSong?.image) && activeSong?.image[1].url}
          alt='cover art'
          className='rounded-radius_2 w-14 w-14'
        />
        <div className='mx-1 flex flex-col w-full'>
          <p className='truncate  font-bold text-xs'>
            {activeSong?.name
              ? parseHtmlToText(activeSong?.name)
              : 'No active Song'}
          </p>
          <div className='flex text-xs justify-between'>
            <p className='truncate text-gray_11 '>
              {activeSong?.artists?.all[0].name
                ? activeSong?.artists?.all[0].name
                : 'No active Song'}
            </p>
            <div>
              <span className=''>{value === 0 ? '0:00' : getTime(value)}</span>{' '}
              / <span className=''>{max === 0 ? '0:00' : getTime(max)}</span>
            </div>
          </div>
          {/* <Slider
            step={1}
            value={[value]}
            min={0}
            max={max}
            defaultValue={[0]}
            onValueChange={(e) => {
              console.log(e);
              setSeekTime(e[0]);
            }}
            variant='soft'
            size='1'
            className='mt-2'
          /> */}
          <Slider.Root
            className='relative flex items-center select-none touch-none w-full h-5'
            defaultValue={[0]}
            value={[value]}
            min={0}
            max={max}
            onValueChange={(e) => {
              setSeekTime(e[0]);
            }}
            step={5}>
            <Slider.Track className='bg-blackA7 relative grow rounded-full h-[3px]'>
              <Slider.Range className='absolute bg-accent_10 rounded-full h-full' />
            </Slider.Track>
            <Slider.Thumb
              className='block w-3 h-3 bg-accent_10 shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-accent_12 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5'
              aria-label='Volume'
            />
          </Slider.Root>
        </div>
      </div>
      <IconButton
        variant='ghost'
        radius='full'
        size='2'
        color='gray'
        className='cursor-pointer p-2'>
        <TbPlayerTrackNext size={25} />
      </IconButton>
    </div>
  );
};

export default Track;
