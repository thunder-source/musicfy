import { SongModel } from '@/types';
import React from 'react';
import { z } from 'zod';
import SongListLoading from '../SkeletonLoading/SongListLoading';
import AlbumSongList from './AlbumSongList';
import ArtistCarousel from '../carousel/ArtistCarousel';
import SongSuggestions from '../carousel/SongSuggestions';

type Props = {
  isLoading: boolean;
  data: z.infer<typeof SongModel> | undefined;
};

export default function SongDetailsPage({ isLoading, data }: Props) {
  return (
    <div className=''>
      {isLoading ? (
        <SongListLoading times={5} />
      ) : (
        typeof data?.album.id == 'string' && (
          <AlbumSongList albumId={data?.album.id && data?.album.id} />
        )
      )}
      {data?.id && <SongSuggestions id={data?.id} />}

      {data?.artists.all && (
        <ArtistCarousel data={data?.artists.all} headerName='Artist' />
      )}
    </div>
  );
}
