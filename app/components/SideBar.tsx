'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../assets';
import { links } from '../data/constants';
import { HiOutlineMenu } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Jersey } from '../assets/fonts';
import { CgAdd } from 'react-icons/cg';
import { IoIosAdd, IoIosHeartEmpty } from 'react-icons/io';
import { Button, IconButton, ScrollArea, Text } from '@radix-ui/themes';
import MellowSvg from '../assets/mellow.svg';

type navTypes = {
  handleClick?: Function;
};

// className={` ${
//   item.to == pathname ? 'active-Link' : 'unActive-Link'
// } flex flex-row my-6 justify-start items-center text-sm font-medium hover:text-cyan-500 text-gray-300 `}

const NavLinks = ({ handleClick }: navTypes) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-2 w-full'>
      {links.map(({ icon: Icon, name, to }) => (
        <Link key={name} href={to} className='w-full '>
          <Button
            onClick={() => handleClick && handleClick()}
            variant='soft'
            className='w-full justify-between'>
            <Icon />
            {name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className=' w-[200px] flex flex-col h-full gap-1 p-1 '>
      <div className='md:flex hidden py-2 flex-col px-4 border-border border-2 rounded-lg'>
        <div className='text-2xl ' style={Jersey.style}>
          BROWSE
        </div>
        <NavLinks />
      </div>
      <div className='md:flex hidden py-4 flex-col  border-border border-2 h-full rounded-lg relative'>
        <div className='flex items-center px-4   justify-between'>
          <div className='text-2xl ' style={Jersey.style}>
            PLAYLIST
          </div>
          <IconButton radius='full' className='cursor-pointer' variant='soft'>
            <IoIosAdd className=' w-6 h-6' />
          </IconButton>
        </div>
        <ScrollArea
          type='hover'
          scrollbars='vertical'
          className='h-[calc(100vh_-_316px)] px-4 mt-4'>
          <div className='flex flex-col  gap-2'>
            {Array.apply(1, Array(1)).map((_, i) => {
              return (
                <Button key={i} variant='soft' className='justify-between'>
                  <IoIosHeartEmpty />
                  Liked Songs
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        <div className='bottom-[5px] z-[-1] fixed'>
          <MellowSvg className='w-[160px] h-full' alt='Marsh mallow' />
        </div>
      </div>
    </div>
  );
};

const MobileSideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  function closeNav() {
    setMobileMenuOpen(false);
  }
  return (
    <>
      <div className='absolute md:hidden block top-6 right-3'>
        {mobileMenuOpen ? (
          <RiCloseLine
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[black] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}>
        <Image
          priority
          src={logo}
          alt='logo'
          className='w-full h-20 object-contain hover:text-cyan-500'
        />
        <NavLinks handleClick={closeNav} />
      </div>
    </>
  );
};

export default Sidebar;
