import { cleanName, parseHtmlToText } from '@/utility/cleanName';
import { Flex, IconButton } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';
import { BsFastForward } from 'react-icons/bs';
import { MdSkipNext } from 'react-icons/md';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { TbPlayerTrackPrev } from 'react-icons/tb';
const Track = ({
  handlePrevSong,
  handleNextSong,
  isPlaying,
  isActive,
  activeSong,
}) => (
  <div className='flex items-center justify-start'>
    <IconButton
      variant='ghost'
      radius='full'
      size='2'
      color='gray'
      onClick={handlePrevSong}
      className={`p-2 cursor-pointer hidden sm:block  `}>
      <TbPlayerTrackPrev size={25} />
    </IconButton>
    <div className='flex gap-2 w-96 mx-4'>
      <Image
        width={56}
        height={56}
        src={Array.isArray(activeSong?.image) && activeSong?.image[1].url}
        alt='cover art'
        className='rounded-radius_2 w-14 w-14'
      />
      <div className=' sm:w-4/5 md:max-w-[300px]  max-w-[115px]'>
        <p className='truncate text-white font-bold text-xs'>
          {activeSong?.name
            ? parseHtmlToText(activeSong?.name)
            : 'No active Song'}
        </p>
        <p className='truncate text-gray-300 text-xs'>
          {activeSong?.artists?.all[0].name
            ? activeSong?.artists?.all[0].name
            : 'No active Song'}
        </p>
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

export default Track;
