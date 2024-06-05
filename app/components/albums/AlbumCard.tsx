/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { AlbumModel, NewReleasesItem, SearchAlbumModelBase } from '@/types';
import { Avatar } from '@radix-ui/themes';
import { z } from 'zod';

import LikeButtonLite from '../common/LikeButtonLite';
import { PlaySongHandler } from '../common/PlaySongHandler';

const AlbumCard = (
  album:
    | z.infer<typeof NewReleasesItem>
    | z.infer<typeof AlbumModel>
    | z.infer<typeof SearchAlbumModelBase>,
) => {
  return (
    <div className="group relative max-w-fit overflow-hidden rounded-radius_6 shadow-sm">
      {/* <img
        src={album.image[0].url}
        alt='das'
        className='absolute -z-50 h-full w-full m-auto group-hover:scale-125 transform transition duration-1000'
      /> */}
      <div className="custom-filter group flex w-[250px] flex-col rounded-radius_6 border-2 border-gray_a5 bg-accent_surface p-4 shadow-sm">
        <div className="relative h-56 w-full overflow-hidden  rounded-radius_6">
          <Avatar
            loading="lazy"
            className="relative h-56 w-56 transform overflow-hidden rounded-radius_6 text-center transition duration-500 group-hover:scale-125"
            src={album?.image[2]?.url}
            fallback={album.name}
            alt="Album Image"
          />
          <div className="absolute left-0  top-0 h-full w-full rounded-radius_6 group-hover:bg-accent_a3 "></div>
          {(album.type === 'album' || album.type === 'song' || album.type === 'artist') && (
            <p className="absolute  left-1/2 top-1/2 hidden max-w-[200px] -translate-x-1/2 -translate-y-1/2 break-words  text-center text-lg font-semibold text-accent_a9 opacity-100 group-hover:block">
              <PlaySongHandler id={album.id} type={album.type} />
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 ">
          <div className="mt-4 flex-col">
            <p className="max-w-[200px] truncate text-base font-semibold">
              <Link href={`/album/${album.id}`} prefetch={false}>
                {album.name}
              </Link>
            </p>
            <p className="mt-1 max-w-[140px]  truncate text-sm">
              {Array.isArray(album?.artists.all) && album.artists.all.length > 0 ? (
                <Link prefetch={false} href={`/artists/${album.artists.all[0].id}`}>
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
