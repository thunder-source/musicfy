import { useGetAlbumByIdQuery } from '@/redux/services/main';
import React from 'react';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import SongsList from './SongsList';
import { Jersey } from '@/assets/fonts';
import { Skeleton } from '@radix-ui/themes';

type Props = {
  albumId: string;
};

export default function AlbumSongList({ albumId }: Props) {
  const { data, isError, isFetching, isLoading } = useGetAlbumByIdQuery({
    albumId,
  });

  if (isFetching) {
    return (
      <>
        <Skeleton className="mb-4 h-16 w-96" />
        <SongListLoading quantity={5} />
      </>
    );
  }

  return (
    <>
      {Array.isArray(data?.data.songs) && data?.data.songs.length > 1 && (
        <>
          <h2 className="mb-4 text-5xl text-accent_8" style={Jersey.style}>
            More From {data?.data.name}
          </h2>
          <SongsList songs={data?.data.songs} />
        </>
      )}
    </>
  );
}
