import { useGetArtistByIdQuery } from '@/redux/services/main';
import React, { memo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error from '../Error';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import SongsList from '../SongsList';

type Props = {};

const SongsInfiniteScroll = ({ id }: { id: string }) => {
  const [page, setPage] = useState(0);
  // const [sortBy, setSortBy] = useState(1);
  // const [sortOrder, setSortOrder] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [dataLength, setDataLength] = useState(10);

  const { data, error } = useGetArtistByIdQuery({
    artistId: id,
    page: page,
    songCount: 50,
    sortBy: undefined,
    sortOrder: undefined,
  });

  let hasMoreTopSongs = true;

  if (data?.hasMoreTopSongs === false) {
    hasMoreTopSongs = false;
  }

  return (
    <InfiniteScroll
      dataLength={data?.data?.topSongs?.length ? data?.data.topSongs.length : 0} //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={hasMoreTopSongs}
      loader={error ? <Error /> : <SongListLoading times={5} />}
      endMessage={
        <p style={{ textAlign: 'center' }} className='my-4 w-full'>
          <b>Yay! You have seen it all 🤩</b>
        </p>
      }
      // style={{ overflow: 'hidden' }}
      className='flex flex-wrap sm:justify-start flex-col justify-center mb-8'
      scrollableTarget='scrollableDiv'>
      {Array.isArray(data?.data.topSongs) && (
        <SongsList key={data?.data.id} songs={data?.data.topSongs} />
      )}
    </InfiniteScroll>
  );
};

export default SongsInfiniteScroll;