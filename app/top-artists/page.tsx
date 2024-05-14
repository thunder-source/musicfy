'use client';
import React from 'react';
import { ArtistCard, Error } from '@/components';
import { useGetTopArtistQuery } from '@/redux/services/main';
import { Jersey } from '@/assets/fonts';
import { TopArtistModelBase } from '@/types';
import { z } from 'zod';
import ArtistCardLoading from '@/components/SkeletonLoading/ArtistCardLoading';

export default function TopArtist() {
  const { data, isFetching, error } = useGetTopArtistQuery({});

  if (error) return <Error />;

  return (
    <div className='flex flex-col p-4 px-8'>
      <h2
        className='font-bold text-5xl text-accent_10 text-left mb-8'
        style={Jersey.style}>
        Top artists
      </h2>
      <div className='flex flex-wrap gap-8 '>
        {isFetching
          ? Array.apply(0, new Array(20)).map((_, i) => (
              <ArtistCardLoading key={i} />
            ))
          : data?.data?.results?.map(
              (artist: z.infer<typeof TopArtistModelBase>) => (
                <ArtistCard key={artist.artistid} {...artist} />
              )
            )}
      </div>
    </div>
  );
}
