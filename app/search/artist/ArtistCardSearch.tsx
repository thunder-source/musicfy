'use client';
import { SearchArtistModelBase, TopArtistModelBase } from '@/types';
import { Avatar } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { array, z } from 'zod';

import { beautifyNumber } from '@/lib/utils';
import { PlaySongHandler } from '@/components/common/PlaySongHandler';

const ArtistCardSearch = (artist: z.infer<typeof SearchArtistModelBase>) => {
  const router = useRouter();
  console.log(artist);
  return (
    <div>
      <div
        className="custom-filter group relative flex  w-fit transform cursor-pointer flex-col rounded-full border-2 border-transparent bg-accent_a4 bg-opacity-80  p-4 transition-all duration-500 hover:border-accent_10 hover:transition-all"
        onClick={() => router.push(`/artists/${artist?.id}`)}
      >
        <Avatar
          className="h-56 w-56 rounded-full"
          src={Array.isArray(artist?.image) ? artist?.image[2]?.url : ''}
          fallback={artist?.name}
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-full group-hover:bg-accent_3 group-hover:opacity-70"></div>
        <p
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute  left-1/2 top-1/2 hidden max-w-[200px] -translate-x-1/2 -translate-y-1/2 break-words  text-center text-lg font-semibold text-accent_a9 opacity-100 group-hover:block"
        >
          <PlaySongHandler id={artist.id} type={'artist'} />
        </p>
      </div>
      <p
        onClick={() => router.push(`/artists/${artist.id}`)}
        className="mx-auto mt-2 max-w-[200px] cursor-pointer break-words text-center text-lg font-semibold text-accent_a9 opacity-100"
      >
        {artist?.name}
      </p>
    </div>
  );
};

export default ArtistCardSearch;
