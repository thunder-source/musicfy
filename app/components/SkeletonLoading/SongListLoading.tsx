import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  times: number;
};

const Loading = () => <Skeleton className="my-2 h-16 rounded-radius_2 py-2 "></Skeleton>;

export default function SongListLoading({ times }: Props) {
  if (times) {
    return Array.apply(null, Array(times)).map((_, index) => {
      return <Loading key={index} />;
    });
  }
  return <Loading />;
}
