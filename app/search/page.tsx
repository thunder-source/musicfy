'use client';
import { Jersey } from '@/assets/fonts';
import SongListLoading from '@/components/SkeletonLoading/SongListLoading';
import IsPlayerOpenBottomMargin from '@/components/common/IsPlayerOpenBottomMargin';
import { PlaySongHandler } from '@/components/common/PlaySongHandler';
import { useSearchByNameQuery } from '@/redux/services/search';
import { Avatar, Button, IconButton, Separator } from '@radix-ui/themes';
import { AnimatePresence, MotionValue, motion } from 'framer-motion';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { RiSearchLine } from 'react-icons/ri';

export default function Page() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const { data, isError, currentData, isLoading, isFetching } = useSearchByNameQuery(
    {
      query: debouncedSearchTerm,
    },
    { skip: !debouncedSearchTerm },
  );

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsInputActive(false);
    setDebouncedSearchTerm('');
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((term) => {
      setDebouncedSearchTerm(term);
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  return (
    <div>
      <motion.div
        // whileHover={{ scale: 1.1 }}
        // animate={searchTerm || isInputActive ? { scale: 1.1 } : { scale: 1 }}
        layoutId="search"
        // initial={isInputActive ? { scale: 1.1 } : { scale: 1 }}
        className="relative  mx-auto flex w-full max-w-screen-sm items-center justify-center"
      >
        <IconButton variant="ghost" className="absolute left-2 rounded-full">
          <RiSearchLine size={20} />
        </IconButton>
        <input
          type="search"
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="peer h-full w-full rounded-full bg-gray_a3 p-2 px-10 outline-none"
          placeholder="Search"
          onFocus={() => setIsInputActive(true)}
        />
        {isInputActive && (
          <IconButton
            onClick={handleClearSearch}
            variant="soft"
            className="absolute right-1 rounded-full"
          >
            <IoIosClose size={30} />
          </IconButton>
        )}
      </motion.div>

      {searchTerm ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-8 grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-8"
          >
            <div className="">
              <div className="flex h-72 w-full flex-col ">
                <h2 className="mb-2 text-2xl font-bold">Top Query Results</h2>
                {isFetching ? (
                  <SongListLoading quantity={3} />
                ) : Array.isArray(data?.topQuery.results) && data?.topQuery.results.length === 0 ? (
                  <div className="my-auto text-center">No Songs found</div>
                ) : (
                  data?.topQuery.results.map(renderResult)
                )}
              </div>
              <Separator size="4" className="mb-4" />
              <div className="flex h-72 w-full flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="mb-2 text-2xl font-bold">Songs</h2>
                  <Link href={`search/song/${debouncedSearchTerm}`}>
                    <Button variant="outline" className="cursor-pointer rounded-radius_6">
                      View All
                    </Button>
                  </Link>
                </div>
                {isFetching ? (
                  <SongListLoading quantity={3} />
                ) : Array.isArray(data?.songs.results) && data?.songs.results.length === 0 ? (
                  <div className="my-auto text-center">No Songs found</div>
                ) : (
                  data?.songs.results.map(renderResult)
                )}
              </div>
              <Separator size="4" className="mb-4  lg:hidden" />
            </div>
            <div className="">
              <div className="flex h-72 w-full flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="mb-2 text-2xl font-bold">Albums</h2>
                  <Link href={`search/album/${debouncedSearchTerm}`}>
                    <Button variant="outline" className="cursor-pointer rounded-radius_6">
                      View All
                    </Button>
                  </Link>
                </div>
                {isFetching ? (
                  <SongListLoading quantity={3} />
                ) : Array.isArray(data?.albums.results) && data?.albums.results.length === 0 ? (
                  <div className="my-auto text-center">No albums found</div>
                ) : (
                  data?.albums.results.map(renderResult)
                )}
              </div>
              <Separator size="4" className="mb-4" />
              <div className="flex h-72 w-full flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="mb-2 text-2xl font-bold">Artists</h2>
                  <Link href={`search/artist/${debouncedSearchTerm}`}>
                    <Button variant="outline" className="cursor-pointer rounded-radius_6">
                      View All
                    </Button>
                  </Link>
                </div>
                {isFetching ? (
                  <SongListLoading quantity={3} />
                ) : Array.isArray(data?.artists.results) && data?.artists.results.length === 0 ? (
                  <div className="my-auto text-center">No artists found</div>
                ) : (
                  data?.artists.results.map(renderResult)
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform lg:pl-[210px]">
          Search something
        </div>
      )}

      <IsPlayerOpenBottomMargin />
    </div>
  );
}

type Result = {
  id: string;
  title: string;
  image: { quality: string; url: string }[];
  type: string;
  description: string;
};

const renderResult = (result: Result) => (
  <div className="group my-2 flex  w-full items-center justify-start rounded-radius_2 px-2 py-2 hover:bg-accent_a4">
    <div className="relative   ml-0 h-[44px] min-h-[44px] w-[44px] min-w-[44px] overflow-hidden  rounded-radius_2">
      <Avatar
        src={result.image[0].url}
        alt={result.title}
        fallback={result.title.slice(0, 1)}
        className="h-[44px] w-[44px] rounded-radius_2"
      />
      <p className="absolute  left-1/2 top-1/2 hidden max-w-[44px] -translate-x-1/2 -translate-y-1/2 break-words  text-center text-lg font-semibold text-accent_a9 opacity-100 group-hover:block">
        {(result.type === 'song' || result.type === 'artist' || result.type === 'album') && (
          <PlaySongHandler id={result.id} type={result.type} key={result.id} />
        )}
      </p>
    </div>
    <div className="flex w-full flex-col">
      <div className=" w-full min-w-[50px]  max-w-xl   flex-1 overflow-hidden truncate  text-ellipsis  px-4 pr-12 ">
        <Link prefetch={false} href={`/song/${result.id}`}>
          {result.title}
        </Link>
      </div>
      <div className=" w-full min-w-[50px] max-w-xl   flex-1 overflow-hidden truncate  text-ellipsis  px-4 pr-12 ">
        {result.description}
      </div>
    </div>
  </div>
);
