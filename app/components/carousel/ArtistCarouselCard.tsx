'use client';
import { ArtistMapModel } from '@/types';
import { AspectRatio, Avatar } from '@radix-ui/themes';
import React from 'react';
import { z } from 'zod';
import SanitizedText from '../common/SanitizedText';
import Link from 'next/link';
import { PlaySongHandler } from '../common/PlaySongHandler';

type Props = { data: z.infer<typeof ArtistMapModel> };

export default function ArtistCarouselCard({ data }: Props) {
  return (
    <div>
      <Link
        prefetch={false}
        href={`/artists/${data.id}`}
        className="custom-filter group relative flex  transform cursor-pointer flex-col   rounded-full border-2 border-transparent bg-accent_a4  bg-opacity-80 transition-all duration-500 hover:border-accent_10 hover:transition-all"
      >
        <AspectRatio ratio={1 / 1}>
          <Avatar
            src={data.image[2]?.url}
            fallback={data.name}
            className="h-full w-full rounded-full text-center"
          />
        </AspectRatio>
        <div className="absolute left-0 top-0 h-full w-full rounded-full group-hover:bg-accent_3 group-hover:opacity-70"></div>
        <p
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute  left-1/2 top-1/2 hidden max-w-[200px] -translate-x-1/2 -translate-y-1/2 break-words  text-center text-lg font-semibold text-accent_a9 opacity-100 group-hover:block"
        >
          <PlaySongHandler id={data.id} type={'artist'} />
        </p>
      </Link>
      <Link prefetch={false} href={`/artists/${data.id}`}>
        <SanitizedText
          value={data.name}
          as="h4"
          className="mt-2 truncate text-center hover:text-accent_indicator"
        />
      </Link>
      <SanitizedText value={data.role} as="h6" className="truncate text-center" />
    </div>
  );
}
