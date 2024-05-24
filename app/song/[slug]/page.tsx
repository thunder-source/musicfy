'use client';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import SongAlbumArtistHeader from '@/components/common/SongAlbumArtistHeader';
import LyricsPage from '@/components/songs/LyricsPage';
import SongDetailsPage from '@/components/songs/SongDetailsPage';
import { useGetSongByIdQuery } from '@/redux/services/main';
import { Box, Tabs } from '@radix-ui/themes';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isLoading } = useGetSongByIdQuery({
    songId: params.slug,
    lyrics: true,
  });

  return (
    <div className="relative flex w-full flex-col overflow-y-auto p-4 lg:p-8" id="scrollableDiv">
      <SongAlbumArtistHeader
        song={Array.isArray(data?.data) ? data?.data[0] : undefined}
        isLoading={isLoading}
        type="song"
      />
      <Tabs.Root defaultValue="details">
        <Tabs.List size="2">
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
          {Array.isArray(data?.data) && data?.data[0].hasLyrics && (
            <Tabs.Trigger value="lyric">Lyric</Tabs.Trigger>
          )}
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="details" className="outline-none">
            <SongDetailsPage
              isLoading={isLoading}
              data={Array.isArray(data?.data) ? data.data[0] : undefined}
            />
          </Tabs.Content>

          <Tabs.Content value="lyric" className="outline-none">
            {Array.isArray(data?.data) ? <LyricsPage song={data?.data[0]} /> : 'No Lyrics Found'}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      <IsPlayerOpenBottomMargin />
    </div>
  );
}
