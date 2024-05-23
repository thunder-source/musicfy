'use client';
import { ArtistMapModel } from '@/types';
import { AspectRatio, Avatar } from '@radix-ui/themes';
import React from 'react';
import { z } from 'zod';
import SanitizedText from '../common/SanitizedText';
import Link from 'next/link';
import { PlaySongHandler } from '../common';

type Props = { data: z.infer<typeof ArtistMapModel> };

export default function ArtistCarouselCard({ data }: Props) {
  return (
    <div>
      <Link
        prefetch={false}
        href={`/artists/${data.id}`}
        className='flex transform transition-all duration-500  group relative flex-col   hover:transition-all bg-accent_a4 bg-opacity-80 custom-filter  cursor-pointer rounded-full hover:border-accent_10 border-transparent border-2'>
        <AspectRatio ratio={1 / 1}>
          <Avatar
            src={data.image[2]?.url}
            fallback={data.name}
            className='w-full h-full rounded-full text-center'
          />
        </AspectRatio>
        <div className='w-full h-full absolute rounded-full left-0 top-0 group-hover:bg-accent_3 group-hover:opacity-70'></div>
        <p
          onClick={(e) => {
            e.preventDefault();
          }}
          className='group-hover:block  hidden max-w-[200px] break-words text-center font-semibold text-lg text-accent_a9  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100'>
          <PlaySongHandler id={data.id} type={'artist'} />
        </p>
      </Link>
      <Link prefetch={false} href={`/artists/${data.id}`}>
        <SanitizedText
          value={data.name}
          as='h4'
          className='text-center truncate mt-2 hover:text-accent_indicator'
        />
      </Link>
      <SanitizedText
        value={data.role}
        as='h6'
        className='text-center truncate'
      />
    </div>
  );
}
