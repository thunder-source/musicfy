import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {};

export default function AlbumCardLoading({}: Props) {
  return Array.apply(0, Array(10)).map((_, i) => (
    <Skeleton
      key={i}
      className='flex flex-col w-[250px]  h-80 p-4 bg-accent_a7 border-accent_a2 border-2 animate-slideup rounded-radius_6 '
    />
  ));
}
