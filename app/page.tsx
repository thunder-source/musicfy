'use client';

import { useState, useCallback } from 'react';
import { Select } from '@radix-ui/themes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { mainApi, useGetNewReleasesQuery } from '@/redux/services/main';
import { useAppDispatch, useAppSelector } from './hooks/reduxHandlers';
import { Jersey } from './assets/fonts';
import { languages } from '@/data/constants';
import AlbumCard from './components/albums/AlbumCard';
import AlbumCardLoading from './components/SkeletonLoading/AlbumCardLoading';
import IsPlayerOpenBottomMargin from './components/common/IsPlayerOpenBottomMargin';
import Error from './components/Error';

const DEFAULT_LANGUAGE = 'For Me';
const PAGE_LIMIT = 50;

export default function Discover() {
  const dispatch = useAppDispatch();
  const { musicLanguage } = useAppSelector((state) => state.main);

  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const { data, error, currentData } = useGetNewReleasesQuery({
    language: language === DEFAULT_LANGUAGE ? musicLanguage.join(',') : language,
    page,
    limit: PAGE_LIMIT,
  });

  const resetParams = useCallback(
    (newLanguage: string) => {
      setLanguage(newLanguage);
      setPage(1);
      dispatch(mainApi.util.resetApiState());
    },
    [dispatch],
  );

  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="mb-8 text-left text-5xl font-bold text-accent_10" style={Jersey.style}>
          Discover
        </h2>
        <div className="mt-2">
          <Select.Root onValueChange={resetParams} defaultValue={language}>
            <Select.Trigger className="max-w-32 capitalize">{language}</Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item className="capitalize" value={DEFAULT_LANGUAGE}>
                  {DEFAULT_LANGUAGE}
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
        <InfiniteScroll
          dataLength={data?.result?.length ?? 0}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={data?.lastPage !== true}
          loader={error ? <Error /> : <AlbumCardLoading quantity={10} />}
          endMessage={
            <p style={{ textAlign: 'center' }} className="mt-8 w-full overflow-hidden text-2xl">
              <b>Yay! You have seen it all 🤩</b>
            </p>
          }
          style={{ overflow: 'hidden' }}
          className="flex flex-wrap justify-center gap-8 lg:justify-start"
        >
          {data?.result?.map((album) => <AlbumCard key={album.id} {...album} />)}
        </InfiniteScroll>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
          <AlbumCardLoading quantity={20} />
        </div>
      )}
      <IsPlayerOpenBottomMargin />
    </>
  );
}
