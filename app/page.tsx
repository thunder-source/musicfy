'use client';
import { Select } from '@radix-ui/themes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { mainApi, useGetNewReleasesQuery } from '@/redux/services/main';
import { useState } from 'react';
import { Jersey } from './assets/fonts';
import { languages } from '@/data/constants';
import { useAppDispatch, useAppSelector } from './hooks/reduxHandlers';
import AlbumCard from './components/albums/AlbumCard';
import AlbumCardLoading from './components/SkeletonLoading/AlbumCardLoading';
import IsPlayerOpenBottomMargin from './components/common/IsPlayerOpenBottomMargin';
import Error from './components/Error';
import { ThemeTesting } from './components';

export default function Discover() {
  const dispatch = useAppDispatch();

  const { musicLanguage } = useAppSelector((state) => state.main);

  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('For Me');

  const { data, error, isLoading, isFetching, currentData } = useGetNewReleasesQuery({
    language: language === 'For Me' ? musicLanguage.join(',') : language,
    page: page,
    limit: 50,
  });

  const resetParams = (newLanguage: string) => {
    setLanguage(newLanguage);
    setPage(1);
    dispatch(mainApi.util.resetApiState());
  };

  console.log(currentData);

  return (
    <>
      {/* <ThemeTesting /> */}
      <div className="flex items-start justify-between">
        <h2 className="mb-8 text-left text-5xl font-bold text-accent_10" style={Jersey.style}>
          Discover
        </h2>
        <div className="mt-2 ">
          <Select.Root
            onValueChange={(value) => {
              resetParams(value);
            }}
            defaultValue={language}
          >
            <Select.Trigger className="max-w-32 capitalize">{language}</Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item className="capitalize" value={'For Me'}>
                  For Me
                </Select.Item>
                {languages.map((lang) => (
                  <Select.Item className="capitalize" value={lang} key={lang}>
                    {lang}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      {currentData ? (
        <>
          <InfiniteScroll
            dataLength={data?.result?.length ? data.result.length : 0} //This is important field to render the next data
            next={() => {
              setPage(page + 1);
            }}
            hasMore={data?.lastPage === true ? false : true}
            loader={error ? <Error /> : <AlbumCardLoading />}
            endMessage={
              <p style={{ textAlign: 'center' }} className="w-full text-2xl">
                <b>Yay! You have seen it all 🤩</b>
              </p>
            }
            style={{ overflow: 'hidden' }}
            className="flex flex-wrap justify-center gap-8 lg:justify-start"
            scrollableTarget="scrollableDiv"
          >
            {data?.result?.map((album) => {
              return <AlbumCard key={album.id} {...album} />;
            })}
          </InfiniteScroll>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
          <AlbumCardLoading />
        </div>
      )}

      <IsPlayerOpenBottomMargin />
    </>
  );
}
