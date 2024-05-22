import { convertSecondsToVisualTime } from '@/lib/utils';
import { SongModel } from '@/types';
import React from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { setActiveSong } from '@/redux/features/playerSlice';
import LikeButtonLite from './LikeButtonLite';
import { Avatar, Box, Text } from '@radix-ui/themes';

type Props = {
  songs: z.infer<typeof SongModel>[];
};

export default function SongsList({ songs }: Props) {
  const dispatch = useAppDispatch();
  return songs.map((song: z.infer<typeof SongModel>, index: number) => {
    return (
      <Box
        key={song.id + index}
        className='flex justify-start items-center  hover:bg-accent_a4 rounded-radius_2 py-2 group px-2'>
        <div className=' w-14 text-center px-2 truncate text-sm hidden lg:block'>
          {index + 1}
        </div>
        <div className='relative rounded-radius_2 h-[44px] w-[44px] min-h-[44px] min-w-[44px] overflow-hidden ml-2 lg:ml-0'>
          <Avatar
            src={song.image[0].url}
            alt={song.name}
            fallback={song.name.slice(0, 1)}
            className='rounded-radius_2 h-[44px] w-[44px]'
          />
          <FaPlayCircle
            size={35}
            className='text-gray-300 cursor-pointer h-[44px] w-[44px] p-2 hover:scale-110 transform transition duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block bg-accent_a6'
            onClick={() => {
              dispatch(
                setActiveSong({
                  songs: songs,
                  index: index,
                })
              );
            }}
          />
        </div>
        <div className='lg:flex lg:flex-[1_1_50%]  w-[calc(100vw_-_180px)]'>
          <div className='px-4 flex-1 lg:w-[100px]  lg:max-w-xl   min-w-[50px] overflow-hidden text-ellipsis truncate w-full '>
            <Link prefetch={false} href={`/song/${song.id}`}>
              {song.name}
            </Link>
          </div>
          <div className='px-4 flex-1 lg:w-[100px] lg:max-w-xl   min-w-[50px] overflow-hidden text-ellipsis truncate w-full '>
            {song.artists.primary.slice(0, 10).map((ele, index) => {
              return (
                <Link prefetch={false} href={`/artists/${ele.id}`} key={ele.id}>
                  <span>{ele.name}</span>
                  <span className='text-accent_8'>
                    {index + 1 !== song.artists.primary.length && ' | '}{' '}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className='px-4 flex-1 w-[100px] max-w-xl min-w-[50px] overflow-hidden text-ellipsis truncate hidden lg:block'>
          {song.album.name}
        </div>
        {/* <div className='px-4 h-full'>
          <LikeButtonLite />
        </div> */}
        <div className='px-4 min-w-20 text-right'>
          {song.duration && convertSecondsToVisualTime(song.duration)}
        </div>
      </Box>
    );
  });
}
