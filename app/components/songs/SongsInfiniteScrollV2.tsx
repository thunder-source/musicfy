import { Error } from '@/components';
import SongListLoading from '@/components/SkeletonLoading/SongListLoading';
import SongsList from '@/components/SongsList';
import { useGetArtistByIdQuery } from '@/redux/services/main';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from 'react-query';
type Props = {};

export default function SongsInfiniteScrollV2({ id }: { id: string }) {
  // const [page, setPage] = useState(0);

  // const {
  //   status,
  //   data,
  //   error,
  //   isFetching,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery(
  //   `http://localhost:3000/api/artists?id=${id}&page=${page}`,
  //   (ctx) => fetchServerPage(10, ctx.pageParam),
  //   {
  //     getNextPageParam: (_lastGroup, groups) => groups.length,
  //   }
  // );

  // const [sortBy, setSortBy] = useState(1);
  // const [sortOrder, setSortOrder] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [dataLength, setDataLength] = useState(10);

  // const { data, error } = useGetArtistByIdQuery({
  //   artistId: id,
  //   page: page,
  //   songCount: 20,
  //   sortBy: undefined,
  //   sortOrder: undefined,
  // });

  // let hasMoreTopSongs = true;

  // if (data?.hasMoreTopSongs === false) {
  //   hasMoreTopSongs = false;
  // }
  // console.log('SongsInfiniteScrollV2', data);
  // return (
  //   <ol>
  //     <InfiniteScroll
  //       pageStart={0}
  //       //   dataLength={data?.data?.topSongs?.length ? data?.data.topSongs.length : 0} //This is important field to render the next data
  //       loadMore={() => {
  //         // setPage(page + 1);
  //       }}
  //       hasMore={hasMoreTopSongs}
  //       loader={error ? <Error key={0} /> : <div>Loading...</div>}
  //       // <SongListLoading key={1} times={10} />
  //       // useWindow={false}
  //       // endMessage={
  //       //   <p style={{ textAlign: 'center' }} className='my-4 w-full'>
  //       //     <b>Yay! You have seen it all 🤩</b>
  //       //   </p>
  //       // }
  //       style={{ overflow: 'hidden' }}
  //       className='flex flex-wrap sm:justify-start flex-col justify-center mb-8'
  //       // scrollableTarget='scrollableDiv'
  //     >
  //       {Array.isArray(data?.data.topSongs) && (
  //         <SongsList key={data?.data.id} songs={data?.data.topSongs} />
  //       )}
  //     </InfiniteScroll>
  //   </ol>
  // );
  return <></>;
}

async function fetchServerPage(
  limit: number,
  offset: number = 0
): Promise<{ rows: string[]; nextOffset: number }> {
  const rows = new Array(limit)
    .fill(0)
    .map((e, i) => `Async loaded row #${i + offset * limit}`);

  await new Promise((r) => setTimeout(r, 500));

  return { rows, nextOffset: offset + 1 };
}
