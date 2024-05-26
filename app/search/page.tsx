'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { IoIosClose } from 'react-icons/io';
import { RiSearchLine } from 'react-icons/ri';
import { IconButton, SegmentedControl, Separator } from '@radix-ui/themes';
import { useSearchByNameQuery } from '@/redux/services/search';
import debounce from 'lodash/debounce';
import { Jersey } from '@/assets/fonts';
import SearchSongs from '@/components/search/SearchSongs';

export default function SearchPage() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState('song'); // State to manage active segment

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsInputActive(false);
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((term) => {
      setDebouncedSearchTerm(term);
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm, debouncedSetSearchTerm]);

  const { data, isFetching, error } = useSearchByNameQuery(
    { query: debouncedSearchTerm },
    { skip: !debouncedSearchTerm },
  );

  console.log(data);

  return (
    <>
      <div className="relative flex w-full items-center justify-center">
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
      </div>

      <SegmentedControl.Root
        defaultValue={activeSegment}
        size="3"
        className="my-4 w-full max-w-[800px] text-lg capitalize"
        style={Jersey.style}
        onValueChange={setActiveSegment} // Update active segment state
      >
        <SegmentedControl.Item className="text-lg" value="song">
          <span className="text-2xl">song</span>
        </SegmentedControl.Item>
        <SegmentedControl.Item className="text-lg" value="album">
          <span className="text-2xl">album</span>
        </SegmentedControl.Item>
        <SegmentedControl.Item className="text-lg" value="artist">
          <span className="text-2xl">artist</span>
        </SegmentedControl.Item>
        <SegmentedControl.Item className="text-lg" value="playlist">
          <span className="text-2xl">playlist</span>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <Separator size="4" />

      <div></div>

      {debouncedSearchTerm ? (
        <ReturnActiveSegment
          activeSegment={activeSegment}
          debouncedSearchTerm={debouncedSearchTerm}
        />
      ) : (
        <div className=" mt-52  h-full text-center text-xl text-gray_9">Enter a search term</div>
      )}
    </>
  );
}

type ReturnActiveSegmentProps = {
  activeSegment: string;
  debouncedSearchTerm: string;
};

const ReturnActiveSegment = ({ activeSegment, debouncedSearchTerm }: ReturnActiveSegmentProps) => {
  switch (activeSegment) {
    case 'song':
      return <SearchSongs search={debouncedSearchTerm} />;
    default:
      return <div className="text-center text-red-500">Unsupported segment type</div>;
  }
};
