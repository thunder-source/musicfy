import { ArtistModelApiResponse } from '@/types';
import React from 'react';
import { z } from 'zod';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import SongsList from '../common/SongsList';
import { Jersey } from '@/assets/fonts';
import SongAlbumCarousel from '../common/SongAlbumCarousel';

type Props = {
  isLoading: boolean;
  data?: z.infer<typeof ArtistModelApiResponse>;
};

export default function ArtistOverViewPage({ isLoading, data }: Props) {
  console.log(data);
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
      {data?.data.singles && (
        <SongAlbumCarousel
          delay='3000'
          headerName='singles'
          data={data?.data.singles}
        />
      )}
      {data?.data.topAlbums && (
        <SongAlbumCarousel
          delay='3500'
          headerName='top Albums'
          data={data?.data.topAlbums.slice(0, 10)}
        />
      )}
      {/* {data?.data.topSongs && (
        <SongAlbumCarousel
          delay='4000'
          headerName='top Songs'
          data={data?.data.topSongs}
        />
      )} */}
    </>
  );
}
