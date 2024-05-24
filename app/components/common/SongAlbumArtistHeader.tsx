import React from 'react';
import { Jersey } from '@/assets/fonts';
import LikeDislikeHandler from '@/components/common/LikeDislikeHandler';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Separator,
  Skeleton,
  Tabs,
} from '@radix-ui/themes';
import { IoMusicalNote } from 'react-icons/io5';
import { FaFacebookF, FaWikipediaW } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { setActiveSong } from '@/redux/features/playerSlice';
import { z } from 'zod';
import { AlbumModel, ArtistModel, SongModel } from '@/types';
import {
  beautifyNumber,
  convertSecondsToVisualTime,
  isLink,
} from '@/lib/utils';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { BsFillPlayFill } from 'react-icons/bs';
import SanitizedText from './SanitizedText';

const options = { maximumFractionDigits: 2 };

type Props = {
  song?: z.infer<typeof SongModel> | undefined;
  artist?: z.infer<typeof ArtistModel> | undefined;
  album?: z.infer<typeof AlbumModel> | undefined;
  isLoading: boolean;
  type: 'album' | 'artist' | 'song' | undefined;
};

export default function SongAlbumArtistHeader({
  song,
  artist,
  album,
  isLoading,
  type,
}: Props) {
  switch (type) {
    case 'artist':
      return <ArtistHeader data={artist} isLoading={isLoading} />;

    case 'song':
      return <SongHeader data={song} isLoading={isLoading} />;

    case 'album':
      return <AlbumHeader data={album} isLoading={isLoading} />;

    default:
      break;
  }
}

type artistProps = {
  data: z.infer<typeof ArtistModel> | undefined;
  isLoading: boolean;
};

const ArtistHeader = ({ data, isLoading }: artistProps) => {
  const dispatch = useAppDispatch();
  const artistImage =
    Array.isArray(data?.image) && data.image.length > 0
      ? data.image[data.image.length - 1].url
      : '';

  let isWikiLinkAvailable = false;
  let isTwitterLinkAvailable = false;
  let isFBLinkAvailable = false;

  if (data?.wiki && isLink(data.wiki)) {
    isWikiLinkAvailable = true;
  }

  if (data?.twitter && isLink(data.twitter)) {
    isTwitterLinkAvailable = true;
  }

  if (data?.fb && isLink(data.fb)) {
    isFBLinkAvailable = true;
  }
  return (
    <div className='flex flex-col lg:flex-row gap-8 mb-8  items-center lg:justify-start'>
      <div className='flex transform transition-all duration-500  group relative flex-col w-min p-4 bg-accent_a4 bg-opacity-80 custom-filter  cursor-pointer rounded-full border-transparent border-2'>
        <Skeleton loading={isLoading}>
          <Avatar
            className='w-56 h-56 rounded-full'
            src={artistImage}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className='flex items-start justify-center flex-col gap-2'>
        <Skeleton loading={isLoading} className='h-10 w-56'>
          <div className='flex items-start lg:items-center gap-2 justify-center w-full'>
            <h2
              className='font-bold text-5xl lg:text-7xl text-accent_10   lg:leading-[3.5rem]'
              style={Jersey.style}>
              {data?.name}{' '}
            </h2>
            <div className='text-accent_10'>
              {data?.isVerified && <RiVerifiedBadgeFill size={20} />}{' '}
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 w-full justify-center lg:justify-start lg:text-left flex items-center gap-2 text-center'>
            {data?.type}{' '}
            <Separator
              orientation='vertical'
              className='font-bold text-xl'
              size='1'
            />{' '}
            {data?.fanCount && beautifyNumber(data?.fanCount)} Listeners
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <div className='flex mt-4 items-center gap-4 justify-center lg:justify-start w-full '>
            <Button
              onClick={() => {
                if (Array.isArray(data?.topSongs))
                  dispatch(setActiveSong({ songs: data?.topSongs, index: 0 }));
              }}
              variant='soft'
              size='4'
              className='hidden lg:flex'
              highContrast>
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size='4'
              onClick={() => {
                if (Array.isArray(data?.topSongs))
                  dispatch(setActiveSong({ songs: data?.topSongs, index: 0 }));
              }}
              variant='soft'
              className='rounded-full cursor-pointer lg:hidden'>
              <BsFillPlayFill size={35} />
            </IconButton>
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
                href={data?.wiki ? data?.wiki : ''}>
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
                href={data?.twitter ? data?.twitter : ''}>
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
                href={data?.fb ? data?.fb : ''}>
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
};

type songProps = {
  data: z.infer<typeof SongModel> | undefined;
  isLoading: boolean;
};

const SongHeader = ({ data, isLoading }: songProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col lg:flex-row gap-8 mb-8  items-center lg:justify-start '>
      <div className='flex transform transition-all duration-500  group relative flex-col w-min p-4 bg-accent_surface shadow-lg bg-opacity-80 custom-filter  cursor-pointer rounded-radius_4 border-transparent border-2'>
        <Skeleton loading={isLoading}>
          <Avatar
            className='w-56 h-56 rounded-radius_4'
            src={Array.isArray(data?.image) ? data?.image[2].url : ''}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className='flex lg:items-start items-center justify-center flex-col gap-2'>
        <Skeleton loading={isLoading} className='h-10 w-96'>
          <h2
            className='font-bold text-5xl lg:text-7xl text-accent_10  text-center flex items-center  gap-2'
            style={Jersey.style}>
            {data?.name}
          </h2>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-60'>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 text-left flex items-center gap-2 flex-col lg:flex-row flex-wrap'>
            By
            {Array.isArray(data?.artists?.primary) &&
              data?.artists.primary.slice(0, 5).map((ele, index) => {
                return (
                  <Link
                    prefetch={false}
                    href={`/artists/${ele.id}`}
                    key={ele.id}>
                    <span>{ele.name}</span>
                    <span className='text-accent_8'>
                      {index + 1 !== data?.artists.primary.length && ','}
                    </span>
                  </Link>
                );
              })}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-96'>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 flex items-center gap-2 text-center lg:text-left '>
            {data?.type} | {data?.playCount && beautifyNumber(data?.playCount)}{' '}
            Plays |{' '}
            {data?.duration && convertSecondsToVisualTime(data?.duration)} |{' '}
            {data?.language}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-72'>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 text-left flex items-center gap-2'>
            {data?.copyright}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-80'>
          <div className='flex mt-4 items-center gap-4 '>
            <Button
              onClick={() => {
                if (data) dispatch(setActiveSong({ songs: [data], index: 0 }));
              }}
              variant='soft'
              size='4'
              className='hidden lg:flex'
              highContrast>
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size='4'
              onClick={() => {
                if (data) dispatch(setActiveSong({ songs: [data], index: 0 }));
              }}
              variant='soft'
              className='rounded-full cursor-pointer lg:hidden'>
              <BsFillPlayFill size={35} />
            </IconButton>
            <div className=''>
              <IconButton
                variant='soft'
                size='4'
                color='gray'
                className='rounded-full cursor-pointer'>
                <LikeDislikeHandler />
              </IconButton>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

type AlbumProps = {
  data: z.infer<typeof AlbumModel> | undefined;
  isLoading: boolean;
};

const AlbumHeader = ({ data, isLoading }: AlbumProps) => {
  const dispatch = useAppDispatch();
  console.log(data);
  return (
    <div className='flex flex-col lg:flex-row gap-8 mb-8  items-center lg:justify-start '>
      <div className='flex transform transition-all duration-500  group relative flex-col w-min p-4 bg-accent_surface shadow-lg bg-opacity-80 custom-filter  cursor-pointer rounded-radius_4 border-transparent border-2'>
        <Skeleton loading={isLoading}>
          <Avatar
            className='w-56 h-56 rounded-radius_4'
            src={Array.isArray(data?.image) ? data?.image[2].url : ''}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className='flex lg:items-start items-center justify-center flex-col gap-2'>
        <Skeleton loading={isLoading} className='h-10 w-96'>
          <h2
            className='font-bold text-5xl lg:text-6xl text-accent_10  max-lg:text-center flex items-center  gap-2'
            style={Jersey.style}>
            {data?.name}
          </h2>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-60'>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 text-left flex items-center gap-2 flex-col lg:flex-row flex-wrap'>
            By
            {Array.isArray(data?.artists?.primary) &&
              data?.artists.primary.slice(0, 5).map((ele, index) => {
                return (
                  <Link
                    prefetch={false}
                    href={`/artists/${ele.id}`}
                    key={ele.id}>
                    <span>{ele.name}</span>
                    <span className='text-accent_8'>
                      {index + 1 !== data?.artists.primary.length && ','}
                    </span>
                  </Link>
                );
              })}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className='h-10 w-96'>
          <h4 className='font-semibold text-xl  capitalize text-accent_10 flex items-center gap-2 text-center lg:text-left '>
            {data?.type} |{' '}
            {data?.playCount && (
              <> {beautifyNumber(data?.playCount)} Plays | </>
            )}{' '}
            {data?.songCount && <> {data?.songCount} Songs </>} |{' '}
            {data?.language}
          </h4>
        </Skeleton>

        <Skeleton loading={isLoading} className='h-10 w-80'>
          <div className='flex mt-4 items-center gap-4 '>
            <Button
              onClick={() => {
                if (Array.isArray(data?.songs))
                  dispatch(setActiveSong({ songs: data.songs, index: 0 }));
              }}
              variant='soft'
              size='4'
              className='hidden lg:flex'
              highContrast>
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size='4'
              onClick={() => {
                if (Array.isArray(data?.songs))
                  dispatch(setActiveSong({ songs: data.songs, index: 0 }));
              }}
              variant='soft'
              className='rounded-full cursor-pointer lg:hidden'>
              <BsFillPlayFill size={35} />
            </IconButton>
            <div className=''>
              <IconButton
                variant='soft'
                size='4'
                color='gray'
                className='rounded-full cursor-pointer'>
                <LikeDislikeHandler />
              </IconButton>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
