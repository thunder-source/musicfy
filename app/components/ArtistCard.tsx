'use client';
import { Avatar, Skeleton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const ArtistCard = ({ artist }) => {
  const router = useRouter();

  return (
    <Skeleton loading={!artist?.name} className=''>
      <div
        className='flex group relative flex-col w-[250px] p-4 hover:transition-all bg-accent_a4 bg-opacity-80 backdrop-blur-sm  cursor-pointer rounded-full hover:border-accent_10 border-transparent border-2'
        onClick={() => router.push(`/artists/${artist.artistid}`)}>
        <Avatar
          className='w-full h-56 rounded-full  '
          src={artist?.image}
          fallback={artist?.name}
        />

        <div className='w-full h-full absolute rounded-full left-0 top-0 group-hover:bg-accent_3 group-hover:opacity-70'></div>
        <p className='group-hover:block hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          {artist?.name}
        </p>
      </div>
    </Skeleton>
  );
};

export default ArtistCard;
