import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  quantity?: number;
};

export default function AlbumCardLoading({ quantity = 5 }: Props) {
  return Array.apply(0, Array(quantity)).map((_, i) => (
    <Skeleton
      key={i}
      className="animate-slideup flex h-80  w-[250px] flex-col rounded-radius_6 border-2 border-accent_a2 bg-accent_a7 p-4 "
    />
  ));
}
