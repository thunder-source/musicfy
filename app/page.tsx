'use client';
import { Flex, Select, Skeleton, Slider } from '@radix-ui/themes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Error, SongCard } from '@/components';
import { mainApi, useGetNewReleasesQuery } from '@/redux/services/main';
import { useState } from 'react';
import { Jersey } from './assets/fonts';
import { languages } from '@/data/constants';
import { useAppDispatch, useAppSelector } from './hooks/reduxHandlers';
import AlbumCard from './components/AlbumCard';
import { ThemeTesting } from './components/ThemeTesting';
import Image from 'next/image';
import Fallback from '@/assets/fallback/fallback.jpg';
import AlbumCardLoading from './components/SkeletonLoading/AlbumCardLoading';

export default function Discover() {
  const dispatch = useAppDispatch();

  const { musicLanguage } = useAppSelector((state) => state.main);

  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(musicLanguage[0]);

  const { data, error } = useGetNewReleasesQuery({
    language: language === 'For Me' ? musicLanguage.join(',') : language,
    page: page,
    limit: 20,
  });

  const resetParams = (newLanguage: string) => {
    setLanguage(newLanguage);
    setPage(1);
    dispatch(mainApi.util.resetApiState());
  };

  return (
    <div className='flex flex-col p-4 px-8 relative h-screen'>
      {/* <ThemeTesting /> */}
      <div className='flex justify-between items-start'>
        <h2
          className='font-bold text-5xl text-accent_10 text-left mb-8'
          style={Jersey.style}>
          Discover
        </h2>
        <div className='mt-2 '>
          <Select.Root
            onValueChange={(value) => {
              resetParams(value);
            }}
            defaultValue={language}>
            <Select.Trigger className='capitalize max-w-32'>
              {language}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item className='capitalize' value={'For Me'}>
                  For Me
                </Select.Item>
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
      <div className=''>
        <InfiniteScroll
          dataLength={data?.result?.length ? data.result.length : 0} //This is important field to render the next data
          next={() => {
            setPage(page + 1);
          }}
          hasMore={data?.lastPage === true ? false : true}
          loader={error ? <Error /> : <AlbumCardLoading />}
          endMessage={
            <p style={{ textAlign: 'center' }} className='my-4 w-full'>
              <b>Yay! You have seen it all 🤩</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
          className='flex flex-wrap sm:justify-start justify-center gap-8 mb-8 overflow-hidden'
          scrollableTarget='scrollableDiv'>
          {data?.result?.map((album) => {
            return <AlbumCard key={album.id} {...album} />;
          })}
        </InfiniteScroll>
      </div>
      <div className='mt-14 h-14 block'>&nbsp;</div>
    </div>
  );
}
