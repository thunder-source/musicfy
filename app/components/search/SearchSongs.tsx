import { useSearchSongByNameQuery } from '@/redux/services/search';
import React, { useState } from 'react';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error from '../Error';
import SongsList from '../songs/SongsList';

type Props = {
  search: string;
};

export default function SearchSongs({ search }: Props) {
  const [page, setPage] = useState(0);
  const { data, isFetching, error } = useSearchSongByNameQuery({
    query: search,
    limit: 50,
    page: page,
  });

  console.log('search ', search);

  let hasMoreSongs = true;

  if (Array.isArray(data?.results) && data?.results.length >= data?.total) {
    hasMoreSongs = false;
  }

  if (Array.isArray(data?.results) && data?.results.length === 0) {
    return <div className="my-10 text-center">No Songs Found</div>;
  }
  console.log('page', page);

  return (
    <InfiniteScroll
      dataLength={data?.results?.length ? data?.results.length : 0} //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={hasMoreSongs}
      loader={error ? <Error /> : <SongListLoading quantity={10} />}
      endMessage={
        <p style={{ textAlign: 'center' }} className="w-full text-2xl">
          {Array.isArray(data?.results) && data.results.length > 50 && (
            <b>Yay! You have seen it all 🤩</b>
          )}
        </p>
      }
      style={{ overflow: 'hidden' }}
      className="mb-8 flex w-full flex-col justify-center sm:justify-start"
      // scrollableTarget="scrollableDiv"
    >
      {Array.isArray(data?.results) && <SongsList songs={data?.results} />}
    </InfiniteScroll>
  );
}
