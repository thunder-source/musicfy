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
        className="group flex items-center  justify-start rounded-radius_2 px-2 py-2 hover:bg-accent_a4"
      >
        <div className=" hidden w-14 truncate px-2 text-center text-sm lg:block">{index + 1}</div>
        <div className="relative ml-2 h-[44px] min-h-[44px] w-[44px] min-w-[44px] overflow-hidden rounded-radius_2 lg:ml-0">
          <Avatar
            src={song.image[0].url}
            alt={song.name}
            fallback={song.name.slice(0, 1)}
            className="h-[44px] w-[44px] rounded-radius_2"
          />
          <FaPlayCircle
            size={35}
            className="absolute left-1/2 top-1/2 hidden h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer bg-accent_a6 p-2 text-gray-300 transition duration-500 hover:scale-110 group-hover:block"
            onClick={() => {
              dispatch(
                setActiveSong({
                  songs: songs,
                  index: index,
                }),
              );
            }}
          />
        </div>
        <div className="w-[calc(100vw_-_180px)] lg:flex  lg:flex-[1_1_50%]">
          <div className="w-full min-w-[50px] flex-1  overflow-hidden   truncate text-ellipsis px-4 lg:w-[100px] lg:max-w-xl ">
            <Link prefetch={false} href={`/song/${song.id}`}>
              {song.name}
            </Link>
          </div>
          <div className="w-full min-w-[50px] flex-1 overflow-hidden   truncate text-ellipsis px-4 lg:w-[100px] lg:max-w-xl ">
            {song.artists.primary.slice(0, 10).map((ele, index) => {
              return (
                <Link prefetch={false} href={`/artists/${ele.id}`} key={ele.id}>
                  <span>{ele.name}</span>
                  <span className="text-accent_8">
                    {index + 1 !== song.artists.primary.length && ' | '}{' '}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden w-[100px] min-w-[50px] max-w-xl flex-1 overflow-hidden truncate text-ellipsis px-4 lg:block">
          {song.album.name}
        </div>
        {/* <div className='px-4 h-full'>
          <LikeButtonLite />
        </div> */}
        <div className="min-w-20 px-4 text-right">
          {song.duration && convertSecondsToVisualTime(song.duration)}
        </div>
      </Box>
    );
  });
}
