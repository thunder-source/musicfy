import React from 'react';
import Link from 'next/link';
import { AlbumModel, NewReleasesItem } from '@/types';
import FallBackImage from '@/assets/fallback/fallback.jpg';
import Image from 'next/image';
import { Card } from '@radix-ui/themes';
import { z } from 'zod';
import PlaySongHandler from './PlaySongHandler';

const AlbumCard = (
  album: z.infer<typeof NewReleasesItem> | z.infer<typeof AlbumModel>
) => {
  const cleanedName = album.name.replace(/\(From\s"[^"]+"\)/g, '');

  return (
    <Card
      variant='classic'
      size={'4'}
      className='flex flex-col  p-4  max-w-[250px] shadow-sm animate-slideup rounded-radius_6 group '>
      <div className='relative w-full h-56 overflow-hidden  rounded-radius_6'>
        <Image
          loading='lazy'
          width={500}
          height={500}
          className='w-full relative h-56 rounded-radius_6 group-hover:scale-125 overflow-hidden transform transition duration-500'
          src={album?.image ? album?.image[2]?.url : FallBackImage}
          quality={70}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          alt='Album Image'
        />

        <div className='w-full h-full  absolute rounded-radius_6 left-0 top-0 group-hover:bg-accent_a5 '></div>
        <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <PlaySongHandler id={album.id} type={album.type} />
        </p>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className='mt-4 flex-col'>
          <p className='font-semibold text-base w-[210px] truncate'>
            <Link href={`/songs/${album.id}`} prefetch={false}>
              {cleanedName}
            </Link>
          </p>
          <p className='text-sm truncate  max-w-[200px] mt-1'>
            <Link
              href={
                Array.isArray(album?.artists.all) &&
                album.artists.all.length > 0
                  ? `/artists/${album.artists.all[0].id}`
                  : '/top-artists'
              }>
              {Array.isArray(album?.artists.all) && album.artists.all.length > 0
                ? album?.artists?.all[0]?.name
                : ''}
            </Link>
          </p>
        </div>
        {/* <div className='relative flex items-center justify-center h-10 w-10 mt-2 '>
          <div
            onClick={() => {
              if (!likedSongs?.[song.id]) {
                return dispatch(addLikedSong(song.id));
              } else {
                return dispatch(RemoveLikedSong(song.id));
              }
            }}
            className='w-8 h-8 rounded-full cursor-pointer relative z-10'></div>
          <div
            className={`heart absolute peer-hover:scale-150  m-auto -translate-y-1/2 top-1/2  -translate-x-1/2 left-1/2 ${
              likedSongs?.[song.id] && 'is-active'
            } `}></div>
        </div> */}
      </div>
    </Card>
  );
};

export default AlbumCard;
