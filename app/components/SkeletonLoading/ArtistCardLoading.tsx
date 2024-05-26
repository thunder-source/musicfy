import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  quantity?: number;
};

export default function ArtistCardLoading({ quantity = 5 }: Props) {
  return Array.apply(0, Array(quantity)).map((_, i) => (
    <Skeleton key={i} className="h-[250px] w-[250px] rounded-full p-4" />
  ));
}
