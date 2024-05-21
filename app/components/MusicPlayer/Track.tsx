import { parseHtmlToText } from '@/utility/cleanName';
import { Avatar, IconButton } from '@radix-ui/themes';
import React from 'react';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { TbPlayerTrackPrev } from 'react-icons/tb';
import * as Slider from '@radix-ui/react-slider';
import { convertSecondsToVisualTime } from '@/lib/utils';
import { SongModel } from '@/types';
import { z } from 'zod';

type props = {
  handlePrevSong: () => void;
  handleNextSong: () => void;
  activeSong: z.infer<typeof SongModel>;
  value: number;
  max: number;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  currentSongs: z.infer<typeof SongModel>[] | [];
};

const Track = ({
  handlePrevSong,
  handleNextSong,
  activeSong,
  value,
  max,
  setSeekTime,
  currentIndex,
  currentSongs,
}: props) => {
  let playNextSongDisabled = false;
  let playPrevSongDisabled = false;

  if (currentIndex === currentSongs.length - 1) {
    playNextSongDisabled = true;
  }
  if (currentIndex === 0) {
    playPrevSongDisabled = true;
  }

  return (
    <div className='flex  flex-1 items-center justify-start  lg:mx-16 '>
      <IconButton
        variant='ghost'
        radius='full'
        size='2'
        color='gray'
        disabled={playPrevSongDisabled}
        onClick={handlePrevSong}
        className={`p-2 cursor-pointer hidden lg:block  `}>
        <TbPlayerTrackPrev size={25} />
      </IconButton>
      <div className='flex gap-2 w-full mx-1 lg:mx-4 flex-row-reverse lg:flex-row '>
        <Avatar
          fallback={activeSong?.name?.slice(0, 2)}
          src={Array.isArray(activeSong?.image) ? activeSong?.image[1].url : ''}
          alt='cover art'
          className=' w-14 h-14  rounded-full lg:rounded-radius_2'
        />
        <div className='mx-1 flex flex-col w-full max-w-[calc(100vw_-_170px)] justify-evenly lg:text-left text-center '>
          <p className='truncate  font-bold text-xs'>
            {activeSong?.name
              ? parseHtmlToText(activeSong?.name)
              : 'No active Song'}
          </p>
          <div className='flex text-xs justify-center lg:justify-between'>
            <p className='truncate text-gray_11 '>
              {activeSong?.artists?.all[0].name
                ? activeSong?.artists?.all[0].name
                : 'No active Song'}
            </p>
            <div className='hidden lg:block'>
              <span className=''>
                {value === 0 ? '0:00' : convertSecondsToVisualTime(value)}
              </span>{' '}
              /{' '}
              <span className=''>
                {max === 0 ? '0:00' : convertSecondsToVisualTime(max)}
              </span>
            </div>
          </div>
          <Slider.Root
            className='relative flex items-center select-none touch-none w-full h-5 hidden lg:block'
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
        disabled={playNextSongDisabled}
        onClick={handleNextSong}
        className='cursor-pointer p-2 hidden lg:block'>
        <TbPlayerTrackNext size={25} />
      </IconButton>
    </div>
  );
};

export default Track;
