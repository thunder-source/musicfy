'use client';
import { useSearchArtistByNameQuery } from '@/redux/services/search';
import { Jersey } from '@/assets/fonts';
import Error from '@/components/Error';
import ArtistCardLoading from '@/components/SkeletonLoading/ArtistCardLoading';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArtistCard from '@/components/artists/ArtistCard';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useSearchArtistByNameQuery({
    query: params.slug,
  });

  let hasMoreSongs = true;

  if (Array.isArray(data?.results) && data?.results.length >= data?.total) {
    hasMoreSongs = false;
  }

  if (Array.isArray(data?.results) && data?.results.length === 0) {
    return <div className="my-10 text-center">No Album Found</div>;
  }

  return (
    <div>
      <h2 className="mb-2 text-3xl font-semibold lg:text-6xl" style={Jersey.style}>
        Search Result for " {params.slug} "
      </h2>
      <InfiniteScroll
        dataLength={data?.results?.length ? data?.results.length : 0} //This is important field to render the next data
        next={() => {
          setPage(page + 1);
        }}
        hasMore={hasMoreSongs}
        loader={isError ? <Error /> : <ArtistCardLoading quantity={10} />}
        endMessage={
          <p style={{ textAlign: 'center' }} className="mt-8 w-full overflow-hidden text-2xl">
            {Array.isArray(data?.results) && data.results.length > 50 && (
              <b>Yay! You have seen it all 🤩</b>
            )}
          </p>
        }
        style={{ overflow: 'hidden' }}
        className="flex flex-wrap justify-center gap-8 lg:justify-start"
      >
        {Array.isArray(data?.results) &&
          data.results.map((result) => {
            return <ArtistCard key={result.id} {...result} />;
          })}
      </InfiniteScroll>
    </div>
  );
}
