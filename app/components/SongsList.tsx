import { convertSecondsToVisualTime } from '@/lib/utils';
import { SongModel } from '@/types';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { setActiveSong } from '@/redux/features/playerSlice';
import LikeButtonLite from './LikeButtonLite';

type Props = {
  songs: z.infer<typeof SongModel>[];
};

export default function SongsList({ songs }: Props) {
  const dispatch = useAppDispatch();
  return songs.map((song: z.infer<typeof SongModel>, index: number) => {
    return (
      <div
        key={song.id + index}
        className='flex justify-start items-center  my-2 hover:bg-accent_a4 rounded-radius_2 py-2 group '>
        <div className=' w-14 text-center px-2 truncate text-sm'>
          {index + 1}
        </div>
        <div className='relative h-[50px] w-[50px] overflow-hidden'>
          <Image
            height={50}
            width={50}
            src={song.image[0].url ? song.image[0].url : ''}
            alt={song.name}
            className='rounded-radius_2'
          />
          <FaPlayCircle
            size={35}
            className='text-gray-300 h-[55px] w-[55px] p-2 hover:scale-110 transform transition duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block bg-accent_a6'
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
              <Link href={`/artists/${ele.id}`} key={ele.id}>
                <span>ele.name</span>
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
      </div>
    );
  });
}
