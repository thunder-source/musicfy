import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {};

export default function ArtistCardLoading({}: Props) {
  return (
    <Skeleton
      loading={true}
      className='w-[250px] h-[250px] p-4 rounded-full'></Skeleton>
  );
}
