import { useGetSongSuggestionByIdQuery } from '@/redux/services/main';
import React from 'react';
import SongAlbumCarousel from './SongAlbumCarousel';

type Props = {
  id: string;
};

export default function SongSuggestions({ id }: Props) {
  const { data, isLoading } = useGetSongSuggestionByIdQuery({
    id: id,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    data?.data &&
    data?.data.length > 0 && (
      <SongAlbumCarousel delay="3500" headerName="You May Like" data={data?.data} />
    )
  );
}
