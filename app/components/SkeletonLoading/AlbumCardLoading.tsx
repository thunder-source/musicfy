import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {};

export default function AlbumCardLoading({}: Props) {
  return Array.apply(0, Array(10)).map((_, i) => (
    <Skeleton
      key={i}
      className="animate-slideup flex h-80  w-[250px] flex-col rounded-radius_6 border-2 border-accent_a2 bg-accent_a7 p-4 "
    />
  ));
}
