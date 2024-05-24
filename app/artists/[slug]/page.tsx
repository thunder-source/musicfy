'use client';
import { useGetArtistByIdQuery } from '@/redux/services/main';
import { Box, Tabs } from '@radix-ui/themes';
import React from 'react';
import SongsInfiniteScroll from '@/components/songs/SongsInfiniteScroll';
import ArtistOverViewPage from '@/components/artists/ArtistOverViewPage';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import AlbumsInfiniteScroll from '@/components/albums/AlbumsInfiniteScroll';
import BiographyPage from '@/components/artists/BiographyPage';
import SongAlbumArtistHeader from '@/components/common/SongAlbumArtistHeader';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isLoading } = useGetArtistByIdQuery({
    artistId: params.slug,
  });

  let isBioAvailable = false;

  if (Array.isArray(data?.data.bio) && data.data.bio.length > 0) {
    isBioAvailable = true;
  }

  return (
    <div
      className='flex flex-col relative w-full overflow-y-auto'
      id='scrollableDiv'>
      <SongAlbumArtistHeader
        artist={data?.data && data?.data}
        isLoading={isLoading}
        type={'artist'}
      />

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
                <SongsInfiniteScroll id={data?.data.id} />
              </div>
            ) : (
              'Something went wrong'
            )}
          </Tabs.Content>

          <Tabs.Content value='albums' className='outline-none py-4'>
            {data?.data.id ? (
              <div className=''>
                <AlbumsInfiniteScroll id={data?.data.id} />
              </div>
            ) : (
              'Something went wrong'
            )}
          </Tabs.Content>

          {isBioAvailable && (
            <Tabs.Content
              value='biography'
              className='outline-none select-text'>
              {data?.data ? (
                <BiographyPage data={data?.data} />
              ) : (
                'Something went wrong'
              )}
            </Tabs.Content>
          )}
        </Box>
      </Tabs.Root>
      <IsPlayerOpenBottomMargin />
    </div>
  );
}
