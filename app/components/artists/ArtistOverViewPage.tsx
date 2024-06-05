import { ArtistModelApiResponse } from '@/types';
import React from 'react';
import { z } from 'zod';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import SongsList from '../songs/SongsList';
import { Jersey } from '@/assets/fonts';
import SongAlbumCarousel from '../carousel/SongAlbumCarousel';
import { Skeleton } from '@radix-ui/themes';

type Props = {
  isLoading: boolean;
  data?: z.infer<typeof ArtistModelApiResponse>;
};

export default function ArtistOverViewPage({ isLoading, data }: Props) {
  return (
    <>
      <Skeleton loading={isLoading} className="h-3rem  w-48">
        <h2 className="mb-2 w-full text-5xl text-accent_8 " style={Jersey.style}>
          Top Songs
        </h2>
      </Skeleton>
      {isLoading ? (
        <SongListLoading quantity={10} />
      ) : (
        <SongsList songs={data?.data.topSongs ? data?.data.topSongs.slice(0, 10) : []} />
      )}
      {data?.data.singles && data?.data.singles.length > 0 && (
        <SongAlbumCarousel delay="3000" headerName="singles" data={data?.data.singles} />
      )}
      {data?.data.topAlbums && data?.data.topAlbums.length > 0 && (
        <SongAlbumCarousel
          delay="3500"
          headerName="top Albums"
          data={data?.data.topAlbums.slice(0, 10)}
        />
      )}
    </>
  );
}
