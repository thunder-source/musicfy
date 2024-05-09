'use client';
import React from 'react';
import { ArtistCard, Error } from '@/components';
import { useGetTopArtistQuery } from '@/redux/services/main';
import { Jersey } from '@/assets/fonts';

export default function TopArtist() {
  const { data, isFetching, error } = useGetTopArtistQuery({});

  // if (isFetching) return <ArtistCardLoading />;

  if (error) return <Error />;

  console.log(data);
  return (
    <div className='flex flex-col p-4 px-8'>
      <h2
        className='font-bold text-5xl text-accent_10 text-left mb-8'
        // style={Jersey.style}
      >
        Top artists
      </h2>

      <div className='flex flex-wrap gap-8 '>
        {isFetching
          ? Array.apply(0, new Array(20)).map((_, i) => <ArtistCard key={i} />)
          : data?.data?.results?.map((artist) => (
              <ArtistCard key={artist.artistid} artist={artist} />
            ))}
      </div>
    </div>
  );
}
