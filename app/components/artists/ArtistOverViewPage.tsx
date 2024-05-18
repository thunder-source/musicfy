import { ArtistModelApiResponse } from '@/types';
import React from 'react';
import { z } from 'zod';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import SongsList from '../SongsList';
import { Jersey } from '@/assets/fonts';

type Props = {
  isLoading: boolean;
  data?: z.infer<typeof ArtistModelApiResponse>;
};

export default function ArtistOverViewPage({ isLoading, data }: Props) {
  return (
    <>
      <h2 className='text-5xl text-accent_8 w-full mb-2 ' style={Jersey.style}>
        Top Songs
      </h2>
      {isLoading ? (
        <SongListLoading times={10} />
      ) : (
        <SongsList
          songs={data?.data.topSongs ? data?.data.topSongs.slice(0, 10) : []}
        />
      )}
    </>
  );
}
