import React from 'react';
import { Jersey } from '@/assets/fonts';
import LikeDislikeHandler from '@/components/common/LikeDislikeHandler';
import { Avatar, Box, Button, IconButton, Separator, Skeleton, Tabs } from '@radix-ui/themes';
import { IoMusicalNote } from 'react-icons/io5';
import { FaFacebookF, FaWikipediaW } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { setActiveSong } from '@/redux/features/playerSlice';
import { z } from 'zod';
import { AlbumModel, ArtistModel, SongModel } from '@/types';
import { beautifyNumber, convertSecondsToVisualTime, isLink } from '@/lib/utils';
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

export default function SongAlbumArtistHeader({ song, artist, album, isLoading, type }: Props) {
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
    <div className="mb-8 flex flex-col items-center gap-8  lg:flex-row lg:justify-start">
      <div className="custom-filter group relative flex  w-min transform cursor-pointer flex-col rounded-full border-2 border-transparent bg-accent_a4  bg-opacity-80 p-4 transition-all duration-500">
        <Skeleton loading={isLoading}>
          <Avatar
            className="h-56 w-56 rounded-full"
            src={artistImage}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Skeleton loading={isLoading} className="h-10 w-56">
          <div className="flex w-full items-start justify-center gap-2 lg:items-center">
            <h2
              className="text-5xl font-bold text-accent_10 lg:text-7xl   lg:leading-[3.5rem]"
              style={Jersey.style}
            >
              {data?.name}{' '}
            </h2>
            <div className="text-accent_10">
              {data?.isVerified && <RiVerifiedBadgeFill size={20} />}{' '}
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <h4 className="flex w-full  items-center justify-center gap-2 text-center text-xl font-semibold capitalize text-accent_10 lg:justify-start lg:text-left">
            {data?.type} <Separator orientation="vertical" className="text-xl font-bold" size="1" />{' '}
            {data?.fanCount && beautifyNumber(data?.fanCount)} Listeners
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <div className="mt-4 flex w-full items-center justify-center gap-4 lg:justify-start ">
            <Button
              onClick={() => {
                if (Array.isArray(data?.topSongs))
                  dispatch(setActiveSong({ songs: data?.topSongs, index: 0 }));
              }}
              variant="soft"
              size="4"
              className="hidden lg:flex"
              highContrast
            >
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size="4"
              onClick={() => {
                if (Array.isArray(data?.topSongs))
                  dispatch(setActiveSong({ songs: data?.topSongs, index: 0 }));
              }}
              variant="soft"
              className="cursor-pointer rounded-full lg:hidden"
            >
              <BsFillPlayFill size={35} />
            </IconButton>
            <div className="">
              <IconButton
                variant="soft"
                size="4"
                color="gray"
                className="cursor-pointer rounded-full"
              >
                <LikeDislikeHandler />
              </IconButton>
            </div>
            {isWikiLinkAvailable && (
              <Link prefetch={false} target="_blank" href={data?.wiki ? data?.wiki : ''}>
                <IconButton variant="soft" size="4" className="cursor-pointer rounded-full">
                  <FaWikipediaW />
                </IconButton>
              </Link>
            )}
            {isTwitterLinkAvailable && (
              <Link prefetch={false} target="_blank" href={data?.twitter ? data?.twitter : ''}>
                <IconButton variant="soft" size="4" className="cursor-pointer rounded-full">
                  <FaXTwitter />
                </IconButton>
              </Link>
            )}
            {isFBLinkAvailable && (
              <Link prefetch={false} target="_blank" href={data?.fb ? data?.fb : ''}>
                <IconButton variant="soft" size="4" className="cursor-pointer rounded-full">
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
    <div className="mb-8 flex flex-col items-center gap-8  lg:flex-row lg:justify-start ">
      <div className="custom-filter group relative flex  w-min transform cursor-pointer flex-col rounded-radius_4 border-2 border-transparent bg-accent_surface bg-opacity-80  p-4 shadow-lg transition-all duration-500">
        <Skeleton loading={isLoading}>
          <Avatar
            className="h-56 w-56 rounded-radius_4"
            src={Array.isArray(data?.image) ? data?.image[2].url : ''}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 lg:items-start">
        <Skeleton loading={isLoading} className="h-10 w-96">
          <h2
            className="flex items-center gap-2 text-center text-5xl  font-bold text-accent_10 lg:text-left  lg:text-7xl"
            style={Jersey.style}
          >
            {data?.name}
          </h2>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-60">
          <h4 className="flex flex-col  flex-wrap items-center gap-2 text-left text-xl font-semibold capitalize text-accent_10 lg:flex-row">
            By
            {Array.isArray(data?.artists?.primary) &&
              data?.artists.primary.slice(0, 5).map((ele, index) => {
                return (
                  <Link prefetch={false} href={`/artists/${ele.id}`} key={ele.id}>
                    <span>{ele.name}</span>
                    <span className="text-accent_8">
                      {index + 1 !== data?.artists.primary.length && ','}
                    </span>
                  </Link>
                );
              })}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-96">
          <h4 className="flex items-center  gap-2 text-center text-xl font-semibold capitalize text-accent_10 lg:text-left ">
            {data?.type} | {data?.playCount && beautifyNumber(data?.playCount)} Plays |{' '}
            {data?.duration && convertSecondsToVisualTime(data?.duration)} | {data?.language}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-72">
          <h4 className="flex items-center  gap-2 text-left text-xl font-semibold capitalize text-accent_10">
            {data?.copyright}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-80">
          <div className="mt-4 flex items-center gap-4 ">
            <Button
              onClick={() => {
                if (data) dispatch(setActiveSong({ songs: [data], index: 0 }));
              }}
              variant="soft"
              size="4"
              className="hidden lg:flex"
              highContrast
            >
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size="4"
              onClick={() => {
                if (data) dispatch(setActiveSong({ songs: [data], index: 0 }));
              }}
              variant="soft"
              className="cursor-pointer rounded-full lg:hidden"
            >
              <BsFillPlayFill size={35} />
            </IconButton>
            <div className="">
              <IconButton
                variant="soft"
                size="4"
                color="gray"
                className="cursor-pointer rounded-full"
              >
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
  return (
    <div className="mb-8 flex flex-col items-center gap-8  lg:flex-row lg:justify-start ">
      <div className="custom-filter group relative flex  w-min transform cursor-pointer flex-col rounded-radius_4 border-2 border-transparent bg-accent_surface bg-opacity-80  p-4 shadow-lg transition-all duration-500">
        <Skeleton loading={isLoading}>
          <Avatar
            className="h-56 w-56 rounded-radius_4"
            src={Array.isArray(data?.image) ? data?.image[2].url : ''}
            fallback={data?.name ? data.name : ''}
          />
        </Skeleton>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 lg:items-start">
        <Skeleton loading={isLoading} className="h-10 w-96">
          <h2
            className="flex items-center gap-2 text-5xl  font-bold text-accent_10 max-lg:text-center  lg:text-6xl"
            style={Jersey.style}
          >
            {data?.name}
          </h2>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-60">
          <h4 className="flex flex-col  flex-wrap items-center gap-2 text-left text-xl font-semibold capitalize text-accent_10 lg:flex-row">
            By
            {Array.isArray(data?.artists?.primary) &&
              data?.artists.primary.slice(0, 5).map((ele, index) => {
                return (
                  <Link prefetch={false} href={`/artists/${ele.id}`} key={ele.id}>
                    <span>{ele.name}</span>
                    <span className="text-accent_8">
                      {index + 1 !== data?.artists.primary.length && ','}
                    </span>
                  </Link>
                );
              })}
          </h4>
        </Skeleton>
        <Skeleton loading={isLoading} className="h-10 w-96">
          <h4 className="flex items-center  gap-2 text-center text-xl font-semibold capitalize text-accent_10 lg:text-left ">
            {data?.type} | {data?.playCount && <> {beautifyNumber(data?.playCount)} Plays | </>}{' '}
            {data?.songCount && <> {data?.songCount} Songs </>} | {data?.language}
          </h4>
        </Skeleton>

        <Skeleton loading={isLoading} className="h-10 w-80">
          <div className="mt-4 flex items-center gap-4 ">
            <Button
              onClick={() => {
                if (Array.isArray(data?.songs))
                  dispatch(setActiveSong({ songs: data.songs, index: 0 }));
              }}
              variant="soft"
              size="4"
              className="hidden lg:flex"
              highContrast
            >
              <IoMusicalNote /> Play Songs
            </Button>
            <IconButton
              size="4"
              onClick={() => {
                if (Array.isArray(data?.songs))
                  dispatch(setActiveSong({ songs: data.songs, index: 0 }));
              }}
              variant="soft"
              className="cursor-pointer rounded-full lg:hidden"
            >
              <BsFillPlayFill size={35} />
            </IconButton>
            <div className="">
              <IconButton
                variant="soft"
                size="4"
                color="gray"
                className="cursor-pointer rounded-full"
              >
                <LikeDislikeHandler />
              </IconButton>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
