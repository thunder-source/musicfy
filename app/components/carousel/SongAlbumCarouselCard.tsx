/* eslint-disable @next/next/no-img-element */
import { AlbumModel, SongModel } from '@/types';
import { AspectRatio, Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';
import LikeButtonLite from '../common/LikeButtonLite';
import { PlaySongHandler } from '../common/PlaySongHandler';

type Props = {
  data: z.infer<typeof AlbumModel> | z.infer<typeof SongModel>;
};

export default function SongAlbumCarouselCard({ data }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-radius_6 border-2  border-gray_5">
      <div className=" h-full w-full overflow-hidden">
        <img
          src={data.image[0].url}
          alt=""
          className="absolute -z-50 m-auto h-full w-full transform transition duration-1000 group-hover:scale-125"
        />
      </div>
      <div className="custom-filter group relative  flex h-full w-full  flex-col  overflow-hidden bg-accent_surface">
        <AspectRatio ratio={1 / 1}>
          <div className="relative flex h-full items-center justify-center overflow-hidden ">
            <Avatar
              src={data.image[2].url}
              fallback={data.name}
              variant="soft"
              className="h-full w-full transform  rounded-none bg-none text-center transition duration-500 group-hover:scale-125"
            />
            <div className=" absolute left-0 top-0  h-full w-full group-hover:bg-accent_surface "></div>
            <p className="absolute  left-1/2 top-1/2 hidden max-w-[200px] -translate-x-1/2 -translate-y-1/2 break-words  text-center text-lg font-semibold text-accent_a9 opacity-100 group-hover:block">
              <PlaySongHandler id={data.id} type={data.type} />
            </p>
            {/* <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute bottom-4 left-4  opacity-100'>
              <LikeButtonLite />
            </p> */}
          </div>
        </AspectRatio>

        <div className="mt-4 flex-col px-2 pb-4 text-center">
          <p className="w-full truncate text-sm font-semibold">
            <Link prefetch={false} href={`/song/${data.id}`}>
              {data.name}
            </Link>
          </p>
          <p className="mt-1 truncate text-sm">
            {Array.isArray(data?.artists.primary) && data.artists.primary.length > 0 && (
              <Link prefetch={false} href={`/artists/${data.artists.primary[0].id}`}>
                {data?.artists?.primary[0]?.name}
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
