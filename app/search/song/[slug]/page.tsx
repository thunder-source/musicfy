'use client';
import { Jersey } from '@/assets/fonts';
import Error from '@/components/Error';
import SongListLoading from '@/components/SkeletonLoading/SongListLoading';
import SongsList from '@/components/songs/SongsList';
import { useSearchSongByNameQuery } from '@/redux/services/search';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params, searchParams }: Props) {
  const [page, setPage] = useState(0);
  const { data, isFetching, isError } = useSearchSongByNameQuery({
    query: params.slug,
    limit: 50,
    page: page,
  });

  let hasMoreSongs = true;

  if (Array.isArray(data?.results) && data?.results.length >= data?.total) {
    hasMoreSongs = false;
  }

  if (Array.isArray(data?.results) && data?.results.length === 0) {
    return <div className="my-10 text-center">No Songs Found</div>;
  }

  return (
    <>
      <h2 className="mb-2 text-3xl font-semibold lg:text-6xl" style={Jersey.style}>
        Search Result for " {params.slug} "
      </h2>
      <InfiniteScroll
        dataLength={data?.results?.length ? data?.results.length : 0} //This is important field to render the next data
        next={() => {
          setPage(page + 1);
        }}
        hasMore={hasMoreSongs}
        loader={isError ? <Error /> : <SongListLoading quantity={10} />}
        endMessage={
          <p style={{ textAlign: 'center' }} className="mt-8 w-full overflow-hidden text-2xl">
            {Array.isArray(data?.results) && data.results.length > 50 && (
              <b>Yay! You have seen it all 🤩</b>
            )}
          </p>
        }
        style={{ overflow: 'hidden' }}
        className="mb-8 flex w-full flex-col justify-center sm:justify-start"
      >
        {Array.isArray(data?.results) && <SongsList songs={data?.results} />}
      </InfiniteScroll>
    </>
  );
}
