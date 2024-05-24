'use client';
import SongListLoading from '@/components/SkeletonLoading/SongListLoading';
import ArtistCarousel from '@/components/carousel/ArtistCarousel';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import SongAlbumArtistHeader from '@/components/common/SongAlbumArtistHeader';
import SongsList from '@/components/common/SongsList';
import { useGetAlbumByIdQuery } from '@/redux/services/main';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isError, isFetching, isLoading } = useGetAlbumByIdQuery({
    albumId: params.slug,
  });

  return (
    <div className=''>
      <SongAlbumArtistHeader
        album={data?.data}
        isLoading={isLoading}
        type='album'
      />

      {isLoading ? (
        <SongListLoading times={5} />
      ) : (
        Array.isArray(data?.data.songs) && (
          <SongsList songs={data?.data.songs} />
        )
      )}

      {data?.data.artists.all && (
        <ArtistCarousel data={data?.data.artists.all} headerName='Artist' />
      )}

      <IsPlayerOpenBottomMargin />
    </div>
  );
}
