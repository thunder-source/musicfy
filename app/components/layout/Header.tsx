'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CheckboxGroup,
  Flex,
  Popover,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { IoMusicalNoteOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { setMusicLanguage } from '@/redux/features/mainSlice';
import { Jersey } from '@/assets/fonts';
import { languages } from '@/data/constants';

export default function Header() {
  return (
    <Flex
      justify='between'
      className='items-center justify-between w-full  border-border border-b-2 p-2 bg-accent_a2'>
      <Flex gap='3' className='  items-center  text-foreground  '>
        <Link prefetch={false} href={'/'}>
          <Flex className='items-center gap-2 group  pl-3 pr-4 '>
            <Image
              src={logo}
              className='w-8 h-8  transition-all group-hover:animate-bounce'
              alt='logo'
            />
            <Text className={'text-3xl'} style={Jersey.style}>
              MusicFy
            </Text>
          </Flex>
        </Link>
      </Flex>
      <SearchBox />
      <Flex gap={'4'} className='items-center'>
        <MusicLanguage />
        {/* <AuthHandlers /> */}
      </Flex>
    </Flex>
  );
}

const SearchBox = () => {
  return (
    <Box className='w-2/4 relative  items-center transition-all hidden lg:flex'>
      <input
        type='search'
        placeholder='Search'
        className='p-2 rounded-radius_6 focus:bg-accent_a3 bg-accent_a1 focus:border-accent_9 border-accent_8 px-4 pl-8 placeholder:text-center peer outline-none max-w-6/12 w-full  border-[1.5px]  font-mono'
      />
      <BiSearch className='w-6 h-6 absolute m-auto  text-accent_a8 top-1/2 transform left-2 -translate-y-1/2 peer-focus:text-accent  peer-focus:animate-pulse' />
    </Box>
  );
};

const MusicLanguage = () => {
  const musicLanguage = useAppSelector((state) => state.main.musicLanguage);
  const dispatch = useAppDispatch();
  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>(musicLanguage);
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant='soft'>
          <IoMusicalNoteOutline width='16' height='16' />
          Music Language
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Box flexGrow='1' className='select-none'>
          <Text align='center'>Preferred Music</Text>
          <Flex gap='3' justify='between' direction='column'>
            <CheckboxGroup.Root
              defaultValue={musicLanguage}
              onValueChange={(ele) => {
                setSelectedLanguages(ele);
              }}>
              <Flex gap='4' align='center'>
                <Box>
                  {languages.slice(0, languages.length / 2).map((lang) => {
                    return (
                      <CheckboxGroup.Item
                        key={lang}
                        value={lang}
                        className='items-center capitalize mt-1'>
                        {lang}
                      </CheckboxGroup.Item>
                    );
                  })}
                </Box>
                <Box>
                  {languages.slice(languages.length / 2).map((lang) => {
                    return (
                      <CheckboxGroup.Item
                        key={lang}
                        value={lang}
                        className='items-center capitalize mt-1'>
                        {lang}
                      </CheckboxGroup.Item>
                    );
                  })}
                </Box>
              </Flex>
              <Popover.Close>
                <Button
                  disabled={selectedLanguages.length === 0}
                  onClick={() => {
                    dispatch(setMusicLanguage(selectedLanguages));
                  }}
                  size='1'>
                  Update
                </Button>
              </Popover.Close>
            </CheckboxGroup.Root>
          </Flex>
        </Box>
      </Popover.Content>
    </Popover.Root>
  );
};

const AuthHandlers = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='hidden lg:flex'>
      {isLogin ? (
        <Avatar size='2' fallback='A' radius='full' />
      ) : (
        <>
          <Button size='2'>Log in</Button>
          <Button size='2'>Sign up</Button>
        </>
      )}
    </div>
  );
};
