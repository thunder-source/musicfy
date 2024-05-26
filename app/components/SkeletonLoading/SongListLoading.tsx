import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  quantity?: number;
};

export default function SongListLoading({ quantity = 5 }: Props) {
  return Array.apply(0, Array(quantity)).map((_, i) => (
    <Skeleton key={i} className="my-2 h-16 rounded-radius_2 py-2" />
  ));
}
