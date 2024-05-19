'use client';
import { Jersey } from '@/assets/fonts';
import LikeDislikeHandler from '@/components/common/LikeDislikeHandler';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import {
  useGetArtistAlbumByIdQuery,
  useGetArtistByIdQuery,
} from '@/redux/services/main';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Separator,
  Skeleton,
  Tabs,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMusicalNote } from 'react-icons/io5';
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
import { FaFacebookF, FaWikipediaW } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlbumCardLoading from '@/components/SkeletonLoading/AlbumCardLoading';
import { z } from 'zod';
import { AlbumModel } from '@/types';
import SongsList from '@/components/common/SongsList';
import { isLink } from '@/lib/utils';
import SongListLoading from '@/components/SkeletonLoading/SongListLoading';
import SongsInfiniteScroll from '@/components/songs/SongsInfiniteScroll';
import { setActiveSong } from '@/redux/features/playerSlice';
import ArtistOverViewPage from '@/components/artists/ArtistOverViewPage';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import AlbumCard from '@/components/albums/AlbumCard';
import Error from '@/components/Error';

export default function Page({ params, searchParams }: Props) {
  const dispatch = useAppDispatch();

  // const [trigger, { data, isFetching, isError }] =
  //   mainApi.endpoints.getArtistById.useLazyQuery();

  const { data, isError, isLoading } = useGetArtistByIdQuery({
    artistId: params.slug,
  });

  // params.slug;
  // useEffect(() => {
  //   if (data && !isFetching) {
  //     if (Array.isArray(data.data.topSongs) && data.data.topSongs.length > 0) {
  //       console.log(data);
  //     } else {
  //       toast.error('oops Something went wrong');
  //     }
  //   }
  // }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('oops Something went wrong');
    }
  }, [isError]);

  const artistImage =
    Array.isArray(data?.data.image) && data.data.image.length > 0
      ? data.data.image[data.data.image.length - 1].url
      : '';

  const options = { maximumFractionDigits: 2 };
  let formattedNumber = '';
  let isWikiLinkAvailable = false;
  let isTwitterLinkAvailable = false;
  let isFBLinkAvailable = false;
  let isBioAvailable = false;

  if (typeof data?.data.fanCount === 'string') {
    formattedNumber = Intl.NumberFormat('en-US', options).format(
      parseFloat(data.data.fanCount)
    );
  } else if (typeof data?.data.fanCount === 'number') {
    formattedNumber = Intl.NumberFormat('en-US', options).format(
      data.data.fanCount
    );
  }

  if (Array.isArray(data?.data.bio) && data.data.bio.length > 0) {
    isBioAvailable = true;
  }

  if (data?.data.wiki && isLink(data.data.wiki)) {
    isWikiLinkAvailable = true;
  }

  if (data?.data.twitter && isLink(data.data.twitter)) {
    isTwitterLinkAvailable = true;
  }

  if (data?.data.fb && isLink(data.data.fb)) {
    isFBLinkAvailable = true;
  }

  return (
    <div
      className='flex flex-col p-8 relative w-full overflow-y-auto'
      id='scrollableDiv'>
      {Header()}

      <Tabs.Root defaultValue='overview'>
        <Tabs.List size='2'>
          <Tabs.Trigger value='overview'>Overview</Tabs.Trigger>
          <Tabs.Trigger value='songs'>Songs</Tabs.Trigger>
          <Tabs.Trigger value='albums'>Albums</Tabs.Trigger>
          {isBioAvailable && (
            <Tabs.Trigger value='biography'>Biography</Tabs.Trigger>
          )}
        </Tabs.List>

        <Box pt='3'>
          <Tabs.Content value='overview' className='outline-none'>
            <ArtistOverViewPage data={data} isLoading={isLoading} />
          </Tabs.Content>

          <Tabs.Content value='songs' className='outline-none'>
            {data?.data.id ? (
              <div className='w-full '>
                {/* <SongsInfiniteScrollV2 id={data?.data.id} /> */}
                <SongsInfiniteScroll id={data?.data.id} />
              </div>
            ) : (
              'Something went wrong'
            )}
          </Tabs.Content>

          <Tabs.Content value='albums' className='outline-none py-4'>
            {data?.data.id ? (
              <div className=''>
                {/* <AlbumInfiniteScroll
                  id={data?.data.id}
                  topAlbums={data.data.topAlbums ? data.data.topAlbums : []}
                /> */}
                <AlbumInfiniteScrollV1 id={data?.data.id} />
              </div>
            ) : (
              'Something went wrong'
            )}
          </Tabs.Content>

          {isBioAvailable && (
            <Tabs.Content
              value='biography'
              className='outline-none select-text'>
              <div className='mb-6 flex justify-between items-center md:w-1/2 '>
                <div>
                  <h2 className='text-4xl my-1' style={Jersey.style}>
                    Born
                  </h2>
                  <p className='text-base'>
                    {data?.data.dob ? data?.data.dob : 'N/A'}
                  </p>
                </div>
                <div className='flex flex-col justify-center gap-2 items-end'>
                  {isWikiLinkAvailable && (
                    <Link
                      prefetch={false}
                      target='_blank'
                      href={data?.data.wiki ? data?.data.wiki : ''}>
                      <Button
                        variant='soft'
                        size='2'
                        className='cursor-pointer'>
                        <FaWikipediaW /> Get Info on Wiki
                      </Button>
                    </Link>
                  )}
                  {isTwitterLinkAvailable && (
                    <Link
                      prefetch={false}
                      target='_blank'
                      href={data?.data.twitter ? data?.data.twitter : ''}>
                      <Button
                        variant='soft'
                        size='2'
                        className='cursor-pointer'>
                        <FaXTwitter /> Twitter
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              {Array.isArray(data?.data.bio) &&
                data.data.bio.map(({ sequence, text, title }) => {
                  let paragraphs;
                  if (typeof text === 'string') {
                    paragraphs = text.split(/\n+/).map((paragraph, index) => {
                      return (
                        <p className='mb-4' key={index}>
                          {paragraph}
                        </p>
                      );
                    });
                  }
                  return (
                    <div key={sequence} className='mb-6  md:w-1/2 '>
                      <h2 className='text-5xl my-1' style={Jersey.style}>
                        {title}
                      </h2>
                      {paragraphs}
                    </div>
                  );
                })}
            </Tabs.Content>
          )}
        </Box>
      </Tabs.Root>
      <IsPlayerOpenBottomMargin />
    </div>
  );

  function Header() {
    return (
      <div className='flex flex-wrap gap-8 mb-8'>
        <div className='flex transform transition-all duration-500  group relative flex-col w-min p-4 bg-accent_a4 bg-opacity-80 backdrop-blur-sm  cursor-pointer rounded-full border-transparent border-2'>
          <Skeleton loading={isLoading}>
            <Avatar
              className='w-56 h-56 rounded-full'
              src={artistImage}
              fallback={data?.data.name ? data.data.name : ''}
            />
          </Skeleton>
        </div>
        <div className='flex items-start justify-center flex-col gap-2'>
          <Skeleton loading={isLoading} className='h-10 w-56'>
            <h2
              className='font-bold text-7xl text-accent_10 text-left flex items-center leading-10 gap-2'
              style={Jersey.style}>
              {data?.data.name}{' '}
              <div>
                {data?.data.isVerified && <RiVerifiedBadgeFill size={20} />}{' '}
              </div>
            </h2>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <h4 className='font-semibold text-xl  capitalize text-accent_10 text-left flex items-center gap-2'>
              {data?.data.type}{' '}
              <Separator
                orientation='vertical'
                className='font-bold text-xl'
                size='1'
              />{' '}
              {formattedNumber} Listeners
            </h4>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <div className='flex mt-4 items-center gap-4 '>
              <Button
                onClick={() => {
                  if (Array.isArray(data?.data.topSongs))
                    dispatch(
                      setActiveSong({ songs: data?.data.topSongs, index: 0 })
                    );
                }}
                variant='soft'
                size='4'
                highContrast>
                <IoMusicalNote /> Play Songs
              </Button>
              <div className=''>
                <IconButton
                  variant='soft'
                  size='4'
                  color='gray'
                  className='rounded-full cursor-pointer'>
                  <LikeDislikeHandler />
                </IconButton>
              </div>
              {isWikiLinkAvailable && (
                <Link
                  prefetch={false}
                  target='_blank'
                  href={data?.data.wiki ? data?.data.wiki : ''}>
                  <IconButton
                    variant='soft'
                    size='4'
                    className='rounded-full cursor-pointer'>
                    <FaWikipediaW />
                  </IconButton>
                </Link>
              )}
              {isTwitterLinkAvailable && (
                <Link
                  prefetch={false}
                  target='_blank'
                  href={data?.data.twitter ? data?.data.twitter : ''}>
                  <IconButton
                    variant='soft'
                    size='4'
                    className='cursor-pointer rounded-full'>
                    <FaXTwitter />
                  </IconButton>
                </Link>
              )}
              {isFBLinkAvailable && (
                <Link
                  prefetch={false}
                  target='_blank'
                  href={data?.data.fb ? data?.data.fb : ''}>
                  <IconButton
                    variant='soft'
                    size='4'
                    className='cursor-pointer rounded-full'>
                    <FaFacebookF />
                  </IconButton>
                </Link>
              )}
            </div>
          </Skeleton>
        </div>
      </div>
    );
  }
}

const SongsInfiniteScrollV1 = ({ id }: { id: string }) => {
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
      loader={error ? <Error /> : <SongListLoading times={10} />}
      endMessage={
        <p style={{ textAlign: 'center' }} className='text-2xl w-full'>
          <b>Yay! You have seen it all 🤩</b>
        </p>
      }
      style={{ overflow: 'hidden' }}
      className='flex flex-wrap sm:justify-start flex-col justify-center mb-8'
      scrollableTarget='scrollableDiv'>
      {Array.isArray(data?.data.topSongs) && (
        <div>
          <SongsList key={data?.data.id} songs={data?.data.topSongs} />
        </div>
      )}
    </InfiniteScroll>
  );
};

const AlbumInfiniteScrollV1 = ({ id }: { id: string }) => {
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

  return (
    <InfiniteScroll
      dataLength={
        data?.data?.topAlbums?.length ? data?.data.topAlbums.length : 0
      } //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={hasMoreTopAlbums}
      loader={error ? <Error /> : <AlbumCardLoading />}
      endMessage={
        <p style={{ textAlign: 'center' }} className='text-2xl w-full'>
          <b>Yay! You have seen it all 🤩</b>
        </p>
      }
      style={{ overflow: 'hidden' }}
      className='flex flex-wrap sm:justify-start justify-center gap-8 overflow-hidden'
      scrollableTarget='scrollableDiv'>
      {Array.isArray(data?.data.topAlbums) &&
        data?.data.topAlbums?.map((album: z.infer<typeof AlbumModel>) => {
          return <AlbumCard key={album.id} {...album} />;
        })}
    </InfiniteScroll>
  );
};

const AlbumInfiniteScroll = ({
  topAlbums,
  id,
}: {
  id: string;
  topAlbums: z.infer<typeof AlbumModel>[];
}) => {
  const [page, setPage] = useState(0);
  // const [sortBy, setSortBy] = useState(1);
  // const [sortOrder, setSortOrder] = useState(1);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const [dataLength, setDataLength] = useState(10);

  const { data, error } = useGetArtistAlbumByIdQuery({
    artistId: id,
    page: page,
    sortBy: undefined,
    sortOrder: undefined,
  });

  console.log('useGetArtistAlbumByIdQuery', data);

  return (
    <InfiniteScroll
      dataLength={data?.data?.albums?.length ? data?.data.albums.length : 0} //This is important field to render the next data
      next={() => {
        setPage(page + 1);
      }}
      hasMore={data?.data.lastPage === true ? false : true}
      loader={error ? <Error /> : <AlbumCardLoading />}
      endMessage={
        <p style={{ textAlign: 'center' }} className='text-2xl w-full'>
          <b>Yay! You have seen it all 🤩</b>
        </p>
      }
      style={{ overflow: 'hidden' }}
      className='flex flex-wrap sm:justify-start justify-center gap-8 overflow-hidden'
      scrollableTarget='scrollableDiv'>
      {Array.isArray(topAlbums) &&
        topAlbums.map((album: z.infer<typeof AlbumModel>) => {
          return <AlbumCard key={album.id} {...album} />;
        })}
      {Array.isArray(data?.data.albums) &&
        data?.data.albums?.map((album: z.infer<typeof AlbumModel>) => {
          return <AlbumCard key={album.id} {...album} />;
        })}
    </InfiniteScroll>
  );
};
