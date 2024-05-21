/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { AlbumModel, NewReleasesItem } from '@/types';
import { Avatar } from '@radix-ui/themes';
import { z } from 'zod';
import { PlaySongHandler } from '../common';
import LikeButtonLite from '../common/LikeButtonLite';

const AlbumCard = (
  album: z.infer<typeof NewReleasesItem> | z.infer<typeof AlbumModel>
) => {
  // const cleanedName = album.name.replace(/\(From\s"[^"]+"\)/g, '');

  return (
    <div className='relative overflow-hidden rounded-radius_6  shadow-sm group'>
      <img
        src={album.image[0].url}
        alt='das'
        className='absolute -z-50 h-full w-full m-auto group-hover:scale-125 transform transition duration-1000'
      />
      <div className='flex flex-col p-4 w-[250px] bg-accent_surface backdrop-blur-xl border-gray_a5 border-2 rounded-radius_6 group shadow-sm'>
        <div className='relative w-full h-56 overflow-hidden  rounded-radius_6'>
          <Avatar
            loading='lazy'
            className='relative h-56 w-56 rounded-radius_6 group-hover:scale-125 overflow-hidden transform transition duration-500 text-center'
            src={album?.image[2]?.url}
            fallback={album.name}
            alt='Album Image'
          />
          <div className='w-full h-full  absolute rounded-radius_6 left-0 top-0 group-hover:bg-accent_a3 '></div>
          <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
            <PlaySongHandler id={album.id} type={album.type} />
          </p>
        </div>
        <div className='flex items-center justify-between gap-2 '>
          <div className='mt-4 flex-col'>
            <p className='font-semibold text-base max-w-[200px] truncate'>
              <Link href={`/song/${album.id}`} prefetch={false}>
                {album.name}
              </Link>
            </p>
            <p className='text-sm truncate  max-w-[140px] mt-1'>
              {Array.isArray(album?.artists.all) &&
              album.artists.all.length > 0 ? (
                <Link
                  prefetch={false}
                  href={`/artists/${album.artists.all[0].id}`}>
                  {album?.artists?.all[0]?.name}
                </Link>
              ) : (
                <span>N/A</span>
              )}
            </p>
          </div>
          {/* <div className='h-full mt-4 '>
            <LikeButtonLite />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
