'use client';
import { useSearchAlbumByNameQuery } from '@/redux/services/search';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isLoading } = useSearchAlbumByNameQuery({
    query: params.slug,
  });

  console.log(data);
  return <div className="my-auto h-full w-full ">page {params.slug}</div>;
}
