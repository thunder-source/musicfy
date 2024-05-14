import { useAppDispatch } from '@/hooks/reduxHandlers';
import { setActiveSong } from '@/redux/features/playerSlice';
import { mainApi } from '@/redux/services/main';
import { Spinner } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { Toaster, useToaster } from 'react-hot-toast';
import { FaPlayCircle } from 'react-icons/fa';

type Props = {
  id: String;
  type: 'artist' | 'album';
};

export default function PlaySongHandler({ id, type }: Props) {
  switch (type) {
    case 'album':
      return <AlbumPlaySongHandler id={id} />;

    case 'artist':
      return <ArtistPlaySongHandler id={id} />;

    default:
      break;
  }
}

const AlbumPlaySongHandler = ({ id }: { id: String }) => {
  const dispatch = useAppDispatch();

  const [trigger, { data, isFetching, isError }] =
    mainApi.endpoints.getAlbumById.useLazyQuery();

  useEffect(() => {
    if (data) {
      dispatch(setActiveSong(data.data));
    }
  }, [isFetching, data, dispatch]);

  return (
    <Spinner loading={isFetching} size={'3'}>
      <FaPlayCircle
        size={35}
        className='text-gray-300 hover:scale-125 transform transition duration-500'
        onClick={() => {
          trigger(id);
        }}
      />
    </Spinner>
  );
};

const ArtistPlaySongHandler = ({ id }: { id: String }) => {
  const dispatch = useAppDispatch();

  const [trigger, { data, isFetching, isError }] =
    mainApi.endpoints.getArtistById.useLazyQuery();

  const toast = useToaster();

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.data.topSongs) && data.data.topSongs.length > 0) {
        dispatch(
          setActiveSong({
            songs: data.data.topSongs,
            index: 0,
          })
        );
      } else {
      }
    }
  }, [isFetching, data, dispatch]);

  return (
    <Spinner loading={isFetching} size={'3'}>
      <FaPlayCircle
        size={35}
        className='text-gray-300 hover:scale-125 transform transition duration-500'
        onClick={() => {
          trigger({ artistId: id });
        }}
      />
    </Spinner>
  );
};
