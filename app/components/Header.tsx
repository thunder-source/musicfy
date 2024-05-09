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
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { Jersey } from '../assets/fonts';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { IoMusicalNoteOutline } from 'react-icons/io5';
import { languages } from '../data/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHandlers';
import { setMusicLanguage } from '@/redux/features/mainSlice';
import toast from 'react-hot-toast';

export default function Header() {
  return (
    <Flex
      justify='between'
      className='items-center justify-between w-full  border-border border-b-2 p-2 bg-accent_a2'>
      <Flex gap='3' className='  items-center  text-foreground  '>
        <Link href={'/'}>
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
        {/* <NavigationMenuDemo /> */}
      </Flex>
      <SearchBox />
      <Flex gap={'4'} className='items-center'>
        <MusicLanguage />
        <AuthHandlers />
      </Flex>
    </Flex>
  );
}

const SearchBox = () => {
  return (
    <Box className='w-2/4 relative flex items-center transition-all '>
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
        <Box flexGrow='1'>
          <Text align='center'>Preferred Music</Text>
          <Flex gap='3' justify='between' direction='column'>
            <CheckboxGroup.Root
              defaultValue={selectedLanguages}
              onValueChange={(ele) => {
                if (ele.length === 0) {
                  toast.error('No Language Selected');
                  return;
                }
                setSelectedLanguages(ele);
                dispatch(setMusicLanguage(ele));
              }}>
              <Flex gap='4' align='center'>
                <Box>
                  {languages.slice(0, languages.length / 2).map((lang) => {
                    return (
                      <CheckboxGroup.Item
                        key={lang}
                        value={lang}
                        // mt='1'
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
    <>
      {isLogin ? (
        <Avatar size='2' fallback='A' radius='full' />
      ) : (
        <>
          <Button size='2'>Log in</Button>
          <Button size='2'>Sign up</Button>
        </>
      )}
    </>
  );
};

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className='relative z-[1] flex justify-start'>
      <NavigationMenu.List className='center shadow-blackA4 m-0 flex  list-none rounded-[6px] bg-background p-1 '>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='text-foreground hover:bg-accent   focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
            Music
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='border-border border-2 rounded-md data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto'>
            <ul className='one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]'>
              <li className='row-span-3 grid'>
                <NavigationMenu.Link asChild>
                  <a
                    className='focus:shadow-violet7 from-red-700 to-black flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]'
                    href='/'>
                    <svg
                      aria-hidden
                      width='38'
                      height='38'
                      viewBox='0 0 25 25'
                      fill='white'>
                      <path d='M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z'></path>
                      <path d='M12 0H4V8H12V0Z'></path>
                      <path d='M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z'></path>
                    </svg>
                    <div className='mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] text-white'>
                      Radix Primitives
                    </div>
                    <p className='text-mauve4 text-[14px] leading-[1.3]'>
                      Unstyled, accessible components for React.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href='https://stitches.dev/' title='Stitches'>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href='/colors' title='Colors'>
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href='https://icons.radix-ui.com/' title='Icons'>
                A crisp set of 15x15 icons, balanced and consistent.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='text-foreground hover:bg-accent  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
            Navigate
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='border-border border-2 rounded-md absolute top-0 left-0 w-full sm:w-auto'>
            <ul className='m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3'>
              <ListItem
                title='Introduction'
                href='/primitives/docs/overview/introduction'>
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title='Getting started'
                href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem title='Styling' href='/primitives/docs/guides/styling'>
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title='Animation'
                href='/primitives/docs/guides/animation'>
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title='Accessibility'
                href='/primitives/docs/overview/accessibility'>
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title='Releases'
                href='/primitives/docs/overview/releases'>
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
          <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-background' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className='perspective-[2000px] absolute top-full left-0 flex w-auto  justify-start'>
        <NavigationMenu.Viewport className='data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-background transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]' />
      </div>
    </NavigationMenu.Root>
  );
};

type ListItemProps = {
  className?: string;
  children?: React.ReactNode;
  title: string;
} & React.HTMLProps<HTMLAnchorElement>;

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, children, title, ...props }: ListItemProps, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            ' focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
          ref={forwardedRef}>
          <div className='text-violet12 mb-[5px] font-medium leading-[1.2]'>
            {title}
          </div>
          <p className='text-mauve11 leading-[1.4]'>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);
ListItem.displayName = 'ListItem';
