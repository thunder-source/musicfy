'use client';
import { useSearchSongByNameQuery } from '@/redux/services/search';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isLoading } = useSearchSongByNameQuery({
    query: params.slug,
  });

  console.log(data);
  return <div className='w-full h-full my-auto '>page {params.slug}</div>;
}
