import { useGetArtistByIdQuery } from '@/redux/services/main';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error from '../Error';
import AlbumCard from './AlbumCard';
import AlbumCardLoading from '../SkeletonLoading/AlbumCardLoading';
import { AlbumModel } from '@/types';
import { z } from 'zod';

export default function AlbumsInfiniteScroll({ id }: { id: string }) {
  const [page, setPage] = useState(0);
  // const [sortBy, setSortBy] = useState(1);
  // const [sortOrder, setSortOrder] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [dataLength, setDataLength] = useState(10);

  const { data, error } = useGetArtistByIdQuery({
    artistId: id,
    page: page,
    albumCount: 50,
    sortBy: undefined,
    sortOrder: undefined,
  });

  let hasMoreTopAlbums = true;

  if (data?.hasMoreTopAlbums === false) {
    hasMoreTopAlbums = false;
  }

  if (data?.data.topAlbums && data?.data.topAlbums?.length === 0) {
    return 'No Albums Found';
  }

  return (
    <InfiniteScroll
      dataLength={data?.data?.topAlbums?.length ? data?.data.topAlbums.length : 0} //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={hasMoreTopAlbums}
      loader={error ? <Error /> : <AlbumCardLoading quantity={10} />}
      endMessage={
        <p style={{ textAlign: 'center' }} className="w-full text-2xl">
          <b>Yay! You have seen it all 🤩</b>
        </p>
      }
      style={{ overflow: 'hidden' }}
      className="flex flex-wrap justify-center gap-8 overflow-hidden sm:justify-start"
      scrollableTarget="scrollableDiv"
    >
      {Array.isArray(data?.data.topAlbums) &&
        data?.data.topAlbums?.map((album: z.infer<typeof AlbumModel>) => {
          return <AlbumCard key={album.id} {...album} />;
        })}
    </InfiniteScroll>
  );
}
