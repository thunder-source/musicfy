'use client';
import { Jersey } from '@/assets/fonts';
import LikeDislikeHandler from '@/components/LikeDislikeHandler';
import { useAppDispatch } from '@/hooks/reduxHandlers';
import { useGetArtistByIdQuery } from '@/redux/services/main';
import {
  Avatar,
  Box,
  Button,
  Separator,
  Spinner,
  Tabs,
  Text,
} from '@radix-ui/themes';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { IoMusicalNote } from 'react-icons/io5';
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params, searchParams }: Props) {
  const dispatch = useAppDispatch();

  // const [trigger, { data, isFetching, isError }] =
  //   mainApi.endpoints.getArtistById.useLazyQuery();

  const { data, isFetching, isError } = useGetArtistByIdQuery({
    artistId: params.slug,
  });

  // params.slug;
  useEffect(() => {
    if (data && !isFetching) {
      if (Array.isArray(data.data.topSongs) && data.data.topSongs.length > 0) {
        // dispatch(
        //   setActiveSong({
        //     songs: data.data.topSongs,
        //     index: 0,
        //   })
        // );
        console.log(data);
      } else {
        toast.error('oops Something went wrong');
      }
    }
  }, [isFetching, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error('oops Something went wrong');
    }
  }, [isError]);

  if (isFetching) {
    return <>loading</>;
  }

  const artistImage =
    Array.isArray(data?.data.image) && data.data.image.length > 0
      ? data.data.image[data.data.image.length - 1].url
      : '';

  const options = { maximumFractionDigits: 2 };
  let formattedNumber = '';

  if (typeof data?.data.fanCount === 'string') {
    formattedNumber = Intl.NumberFormat('en-US', options).format(
      parseFloat(data.data.fanCount)
    );
  } else if (typeof data?.data.fanCount === 'number') {
    formattedNumber = Intl.NumberFormat('en-US', options).format(
      data.data.fanCount
    );
  }

  console.log(data?.data);
  return (
    <div className='flex flex-col p-8'>
      <div className='flex flex-wrap gap-8 mb-8'>
        <div className='flex transform transition-all duration-500  group relative flex-col w-[250px] p-4 bg-accent_a4 bg-opacity-80 backdrop-blur-sm  cursor-pointer rounded-full border-transparent border-2'>
          <Avatar
            className='w-full h-56 rounded-full'
            src={artistImage}
            fallback={data?.data.name ? data.data.name : ''}
          />
        </div>
        <div className='flex items-start justify-center flex-col gap-2'>
          <h2
            className='font-bold text-7xl text-accent_10 text-left '
            style={Jersey.style}>
            {data?.data.name}
          </h2>
          <h4 className='font-semibold text-xl -mt-2 capitalize text-accent_10 text-left flex items-center gap-2'>
            {data?.data.type}{' '}
            <Separator
              orientation='vertical'
              className='font-bold text-xl'
              size='1'
            />{' '}
            {formattedNumber} Listeners
          </h4>
          <div className='flex mt-4 items-center gap-8 '>
            <Button variant='soft' size='4' highContrast>
              <IoMusicalNote /> Play Songs
            </Button>
            <LikeDislikeHandler />
          </div>
        </div>
      </div>

      <Tabs.Root defaultValue='albums'>
        <Tabs.List size='2'>
          <Tabs.Trigger value='songs'>Songs</Tabs.Trigger>
          <Tabs.Trigger value='albums'>Albums</Tabs.Trigger>
          <Tabs.Trigger value='biography'>Biography</Tabs.Trigger>
        </Tabs.List>

        <Box pt='3'>
          <Tabs.Content value='songs'>
            <Text size='2'>Make changes to your account.</Text>
          </Tabs.Content>

          <Tabs.Content value='albums'>
            <Text size='2'>Access and update your documents.</Text>
          </Tabs.Content>

          <Tabs.Content value='biography' className='outline-none select-text'>
            <div className='mb-6  md:w-1/2 '>
              <h2 className='text-4xl my-1' style={Jersey.style}>
                Born
              </h2>
              <p className='text-base'>
                {data?.data.dob ? data?.data.dob : 'N/A'}
              </p>
            </div>
            {Array.isArray(data?.data.bio) &&
              data.data.bio.map(({ sequence, text, title }) => {
                let paragraphs;
                if (typeof text === 'string') {
                  paragraphs = text.split(/\n+/).map((paragraph, index) => {
                    return (
                      <p className='mb-4' key={index}>
                        {paragraph}
                      </p>
                    );
                  });
                }
                return (
                  <div key={sequence} className='mb-6  md:w-1/2 '>
                    <h2 className='text-5xl my-1' style={Jersey.style}>
                      {title}
                    </h2>
                    {paragraphs}
                    {/* <pre className='text-base w-1/2 break-words'>{text}</pre> */}
                  </div>
                );
              })}
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      <div className='mt-14 h-14 block'>&nbsp;</div>
    </div>
  );
}
