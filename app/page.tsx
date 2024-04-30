'use client';
import { Callout, Flex } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '@/components';

import { useGetNewReleasesQuery } from '@/redux/services/main';
import { selectGenreListId } from '@/redux/features/playerSlice';
import { useState } from 'react';
import { Jersey } from './assets/fonts';

export default function Discover() {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetNewReleasesQuery({
    language: genreListId | '',
    page: 0,
    limit: 0,
  });

  if (isFetching) return <Loader title='Loading songs...' />;

  if (error) return <Error />;

  console.log(data.data.result);
  // const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  // return
  return (
    <div className='flex flex-col p-4 px-8'>
      <ThemeDemo />;
      <Callout.Root size='1'>
        <Callout.Icon>{/* <InfoCircledIcon  /> */}</Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>
      <h2
        className='font-bold text-5xl text-accent_10 text-left mb-8'
        style={Jersey.style}>
        Discover
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data.data?.result?.map((song, i) => {
          return (
            <SongCard
              isPlaying={isPlaying}
              activeSong={activeSong}
              key={song.id}
              song={song}
              i={i}
              data={data.data.result}
            />
          );
        })}
      </div>
    </div>
  );
}

const language = [
  'hindi',
  'tamil',
  'telugu',
  'marathi',
  'gujarati',
  'english',
  'bengali',
  'kannada',
  'bhojpuri',
  'punjabi',
  'malayalam',
  'urdu',
  'rajasthani',
  'odia',
  'assamese',
  'haryanvi',
];

let colors = [
  'bg-accent_1',
  'bg-accent_2',
  'bg-accent_3',
  'bg-accent_4',
  'bg-accent_5',
  'bg-accent_6',
  'bg-accent_7',
  'bg-accent_8',
  'bg-accent_9',
  'bg-accent_10',
  'bg-accent_11',
  'bg-accent_12',
  'bg-accent_a1',
  'bg-accent_a2',
  'bg-accent_a3',
  'bg-accent_a4',
  'bg-accent_a5',
  'bg-accent_a6',
  'bg-accent_a7',
  'bg-accent_a8',
  'bg-accent_a9',
];

const radius = [
  'rounded-radius_1',
  'rounded-radius_2',
  'rounded-radius_3',
  'rounded-radius_4',
  'rounded-radius_5',
  'rounded-radius_6',
];

export const ThemeDemo = () => {
  return (
    <div className=' p-4'>
      <Flex
        gap='2'
        direction='row'
        className='flex-wrap gap-4 justify-between'
        width='600px'>
        {colors.map((color) => {
          return (
            <div
              key={color}
              className={`${color} rounded-lg text-center border-2 p-2 px-4`}>
              {color}
            </div>
          );
        })}
        {radius.map((radius) => {
          return (
            <div
              key={radius}
              className={`${radius} bg-accent_1 text-center border-2 p-2 px-4 `}>
              {radius}
            </div>
          );
        })}
      </Flex>
    </div>
  );
};
