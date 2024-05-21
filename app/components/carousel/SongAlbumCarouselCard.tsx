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
    <div className='relative overflow-hidden rounded-radius_6 border-2 border-gray_5  group'>
      <div className=' overflow-hidden h-full w-full'>
        <img
          src={data.image[0].url}
          alt=''
          className='absolute -z-50 h-full w-full m-auto group-hover:scale-125 transform transition duration-1000'
        />
      </div>
      <div className='relative flex flex-col  w-full h-full bg-accent_surface  overflow-hidden  backdrop-blur-xl group'>
        <AspectRatio ratio={1 / 1}>
          <div className='relative flex items-center justify-center overflow-hidden h-full '>
            <Avatar
              src={data.image[2].url}
              fallback={data.name}
              variant='soft'
              className='w-full h-full bg-none  rounded-none text-center group-hover:scale-125 transform transition duration-500'
            />
            <div className=' absolute h-full w-full  left-0 top-0 group-hover:bg-accent_surface '></div>
            <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
              <PlaySongHandler id={data.id} type={data.type} />
            </p>
            {/* <p className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute bottom-4 left-4  opacity-100'>
              <LikeButtonLite />
            </p> */}
          </div>
        </AspectRatio>

        <div className='mt-4 flex-col text-center px-2 pb-4'>
          <p className='font-semibold text-sm w-full truncate'>
            <Link prefetch={false} href={`/song/${data.id}`}>
              {data.name}
            </Link>
          </p>
          <p className='text-sm truncate mt-1'>
            {Array.isArray(data?.artists.primary) &&
              data.artists.primary.length > 0 && (
                <Link
                  prefetch={false}
                  href={`/artists/${data.artists.primary[0].id}`}>
                  {data?.artists?.primary[0]?.name}
                </Link>
              )}
          </p>
        </div>
      </div>
    </div>
  );
}
