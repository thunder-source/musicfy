'use client';
import { TopArtistModelBase } from '@/types';
import { Avatar } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import PlaySongHandler from './PlaySongHandler';

const ArtistCard = (artist: z.infer<typeof TopArtistModelBase>) => {
  const router = useRouter();

  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat('en-US', options).format(
    artist?.followerCount
  );

  return (
    <div>
      <div
        className='flex transform transition-all duration-500  group relative flex-col w-fit p-4 hover:transition-all bg-accent_a4 bg-opacity-80 backdrop-blur-sm  cursor-pointer rounded-full hover:border-accent_10 border-transparent border-2'
        onClick={() => router.push(`/artists/${artist.artistid}`)}>
        <Avatar
          className='w-56 h-56 rounded-full'
          src={artist?.image}
          fallback={artist?.name}
        />
        <div className='w-full h-full absolute rounded-full left-0 top-0 group-hover:bg-accent_3 group-hover:opacity-70'></div>
        <p
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <PlaySongHandler id={artist.artistid} type={'artist'} />
        </p>
      </div>
      <p
        onClick={() => router.push(`/artists/${artist.artistid}`)}
        className='max-w-[200px] mx-auto mt-2 break-words text-center font-semibold text-lg text-accent_a9 opacity-100 cursor-pointer'>
        {artist?.name}
      </p>
      <p className='max-w-[200px] mx-auto break-words text-center font-semibold text-sm text-accent_a7 opacity-100'>
        {formattedNumber} Fans
      </p>
    </div>
  );
};

export default ArtistCard;
