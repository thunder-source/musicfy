'use client';
import { useSearchByNameQuery } from '@/redux/services/search';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  const { data, isLoading } = useSearchByNameQuery({
    query: params.slug,
  });

  console.log(data);
  return <div className='w-full h-full my-auto '>page {params.slug}</div>;
}
