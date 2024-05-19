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
        className='flex justify-start items-center  hover:bg-accent_a4 rounded-radius_2 py-2 group '>
        <div className=' w-14 text-center px-2 truncate text-sm'>
          {index + 1}
        </div>
        <div className='relative rounded-radius_2 h-[44px] w-[44px] overflow-hidden'>
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
        <div className='px-4 flex-1 w-[100px] max-w-xl min-w-[50px] overflow-hidden text-ellipsis truncate '>
          {song.name}
        </div>
        <div className='px-4 flex-1 w-[100px] max-w-xl min-w-[50px] overflow-hidden text-ellipsis truncate '>
          {song.artists.primary.map((ele, index) => {
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
        <div className='px-4 flex-1 w-[100px] max-w-xl min-w-[50px] overflow-hidden text-ellipsis truncate '>
          {song.album.name}
        </div>
        <div className='px-4 h-full'>
          <LikeButtonLite />
        </div>
        <div className='px-4 w-20 text-center'>
          {song.duration && convertSecondsToVisualTime(song.duration)}
        </div>
      </Box>
    );
  });
}
