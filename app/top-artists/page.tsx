'use client';
import React from 'react';
import { useGetTopArtistQuery } from '@/redux/services/main';
import { Jersey } from '@/assets/fonts';
import { TopArtistModelBase } from '@/types';
import { z } from 'zod';
import ArtistCardLoading from '@/components/SkeletonLoading/ArtistCardLoading';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import ArtistCard from '@/components/artists/ArtistCard';
import Error from '@/components/Error';

export default function TopArtist() {
  const { data, isFetching, error } = useGetTopArtistQuery({});

  if (error) return <Error />;

  return (
    // <div className='flex flex-col w-full items-center lg:items-start'>
    //   <h2
    //     className='font-bold text-5xl text-accent_10 text-left mb-8'
    //     style={Jersey.style}>
    //     Top artists
    //   </h2>
    <div className='flex flex-wrap gap-8 justify-center lg:justify-start'>
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
    //   <IsPlayerOpenBottomMargin />
    // </div>
  );
}
