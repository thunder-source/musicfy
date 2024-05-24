import { Skeleton } from '@radix-ui/themes';
import React from 'react';

type Props = {};

export default function ArtistCardLoading({}: Props) {
  return <Skeleton loading={true} className="h-[250px] w-[250px] rounded-full p-4"></Skeleton>;
}
