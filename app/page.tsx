'use client';
import { Flex, Select, Skeleton } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Error, SongCard } from '@/components';

import { mainApi, useGetNewReleasesQuery } from '@/redux/services/main';
import { useState } from 'react';
import { Jersey } from './assets/fonts';
import { languages } from '@/data/constants';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from './hooks/reduxHandlers';

export default function Discover() {
  const dispatch = useAppDispatch();

  const { musicLanguage } = useAppSelector((state) => state.main);
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);

  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(musicLanguage[0]);

  const { data, isFetching, error, refetch } = useGetNewReleasesQuery({
    language: language,
    page: page,
    limit: 20,
  });

  const resetParams = (newLanguage: string) => {
    setLanguage(newLanguage);
    setPage(1);
    // refetch();
    dispatch(mainApi.util.resetApiState());
  };

  // console.log(data);

  // if (isFetching) return <Loader title='Loading songs...' />;
  if (error) return <Error />;

  return (
    <div className='flex flex-col p-4 px-8 h-screen'>
      {/* <ThemeDemo />; */}
      <div className='flex justify-between items-start'>
        <h2
          className='font-bold text-5xl text-accent_10 text-left mb-8'
          style={Jersey.style}
          onClick={() => {
            toast.success('Hello World');
            toast.error('Hello World');
          }}>
          Discover
        </h2>
        <div className='mt-2 '>
          <Select.Root
            onValueChange={(value) => {
              resetParams(value);
              // console.log('resetParams called');
            }}
            defaultValue={language}>
            <Select.Trigger className='capitalize'>{language}</Select.Trigger>
            <Select.Content>
              <Select.Group>
                {languages.map((lang) => (
                  <Select.Item className='capitalize' value={lang} key={lang}>
                    {lang}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data?.data?.result.length || 0} //This is important field to render the next data
        next={() => {
          setPage(page + 1);
        }}
        hasMore={data?.data?.lastPage === true ? false : true}
        loader={<SoundCardLoader />}
        endMessage={
          <p style={{ textAlign: 'center' }} className='my-4'>
            <b>Yay! You have seen it all 🤩</b>
          </p>
        }
        scrollableTarget='scrollableDiv'>
        {data?.data && (
          <div className='flex flex-wrap sm:justify-start justify-center gap-8 mb-8'>
            {data?.data?.result?.map((song, i) => {
              return (
                <SongCard
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  key={i}
                  song={song}
                  i={i}
                  data={data.data.result}
                />
              );
            })}
          </div>
        )}
      </InfiniteScroll>
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

const SoundCardLoader = () => {
  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8 '>
      {Array.apply(0, Array(10)).map((_, i) => (
        <Skeleton key={i}>
          <div className='flex flex-col w-[250px]  h-80 p-4 bg-accent_a7 border-accent_a2 border-2 animate-slideup rounded-radius_6 '></div>
        </Skeleton>
      ))}
    </div>
  );
};
