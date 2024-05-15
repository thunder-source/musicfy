import { useAppDispatch } from '@/hooks/reduxHandlers';
import { setActiveSong } from '@/redux/features/playerSlice';
import { mainApi } from '@/redux/services/main';
import { Spinner } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlayCircle } from 'react-icons/fa';

type Props = {
  id: String;
  type: 'artist' | 'album' | 'song';
};

export default function PlaySongHandler({ id, type }: Props) {
  switch (type) {
    case 'album':
      return <AlbumPlaySongHandler id={id} />;

    case 'artist':
      return <ArtistPlaySongHandler id={id} />;

    case 'song':
      return <PlayDiscoverSongHandler id={id} />;

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
      console.log(data);
      if (Array.isArray(data.data.songs) && data.data.songs.length > 0) {
        dispatch(
          setActiveSong({
            songs: data.data.songs,
            index: 0,
          })
        );
      } else {
        toast.error('oops Something went wrong');
      }
    }
  }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('oops Something went wrong');
    }
  }, [isError]);

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

const ArtistPlaySongHandler = ({ id }: { id: String }) => {
  const dispatch = useAppDispatch();

  const [trigger, { data, isFetching, isError }] =
    mainApi.endpoints.getArtistById.useLazyQuery();

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
        toast.error('oops Something went wrong');
      }
    }
  }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('oops Something went wrong');
    }
  }, [isError]);

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

const PlayDiscoverSongHandler = ({ id }: { id: String }) => {
  const dispatch = useAppDispatch();

  const [trigger, { data, isFetching, isError }] =
    mainApi.endpoints.getSongById.useLazyQuery();

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.data) && data.data.length > 0) {
        dispatch(
          setActiveSong({
            songs: data.data,
            index: 0,
          })
        );
      } else {
        toast.error('oops Something went wrong');
      }
    }
  }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('oops Something went wrong');
    }
  }, [isError]);

  return (
    <Spinner loading={isFetching} size={'3'}>
      <FaPlayCircle
        size={35}
        className='text-gray-300 hover:scale-125 transform transition duration-500'
        onClick={() => {
          trigger({ songId: id });
        }}
      />
    </Spinner>
  );
};
