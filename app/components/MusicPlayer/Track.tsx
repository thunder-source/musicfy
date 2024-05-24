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
    <div className="flex  flex-1 items-center justify-start  lg:mx-16 ">
      <IconButton
        variant="ghost"
        radius="full"
        size="2"
        color="gray"
        disabled={playPrevSongDisabled}
        onClick={handlePrevSong}
        className={`hidden cursor-pointer p-2 lg:block  `}
      >
        <TbPlayerTrackPrev size={25} />
      </IconButton>
      <div className="mx-1 flex w-full flex-row-reverse gap-2 lg:mx-4 lg:flex-row ">
        <Avatar
          fallback={activeSong?.name?.slice(0, 2)}
          src={Array.isArray(activeSong?.image) ? activeSong?.image[1].url : ''}
          alt="cover art"
          className="  h-11 w-11 rounded-full lg:h-14  lg:w-14 lg:rounded-radius_2"
        />
        <div className="mx-1 flex w-full max-w-[calc(100vw_-_130px)] flex-col justify-evenly  text-center lg:text-left ">
          <p className="truncate  text-xs font-bold">
            {activeSong?.name ? parseHtmlToText(activeSong?.name) : 'No active Song'}
          </p>
          <div className="flex justify-center text-xs lg:justify-between">
            <p className="truncate text-gray_11 ">
              {activeSong?.artists?.all[0].name
                ? activeSong?.artists?.all[0].name
                : 'No active Song'}
            </p>
            <div className="hidden lg:block">
              <span className="">{value === 0 ? '0:00' : convertSecondsToVisualTime(value)}</span> /{' '}
              <span className="">{max === 0 ? '0:00' : convertSecondsToVisualTime(max)}</span>
            </div>
          </div>
          <Slider.Root
            className="relative  hidden h-5 w-full touch-none select-none items-center  lg:flex"
            defaultValue={[0]}
            value={[value]}
            min={0}
            max={max}
            onValueChange={(e) => {
              setSeekTime(e[0]);
            }}
            step={5}
          >
            <Slider.Track className="relative h-[3px] grow rounded-full bg-blackA7">
              <Slider.Range className="absolute h-full rounded-full bg-accent_10" />
            </Slider.Track>
            <Slider.Thumb
              className="block h-3 w-3 rounded-[10px] bg-accent_10 shadow-[0_2px_10px] shadow-blackA4 hover:bg-accent_12 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
              aria-label="Volume"
            />
          </Slider.Root>
        </div>
      </div>
      <IconButton
        variant="ghost"
        radius="full"
        size="2"
        color="gray"
        disabled={playNextSongDisabled}
        onClick={handleNextSong}
        className="hidden cursor-pointer p-2 lg:block"
      >
        <TbPlayerTrackNext size={25} />
      </IconButton>
    </div>
  );
};

export default Track;
