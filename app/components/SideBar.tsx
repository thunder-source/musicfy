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
import { IoIosAdd } from 'react-icons/io';

type navTypes = {
  handleClick?: Function;
};

const NavLinks = ({ handleClick }: navTypes) => {
  const pathname = usePathname();
  return (
    <div className=''>
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.to}
          className={` ${
            item.to == pathname ? 'active-Link' : 'unActive-Link'
          } flex flex-row my-6 justify-start items-center text-sm font-medium hover:text-cyan-500 text-gray-300 `}
          onClick={() => handleClick && handleClick()}>
          <item.icon className='w-6 h-6 mr-2' />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className='h-full'>
      <div className='md:flex hidden py-4 flex-col w-[200px]  px-4 bg-[#000000]  m-1 rounded-lg'>
        <div className='text-2xl ' style={Jersey.style}>
          BROWSE
        </div>
        <NavLinks />
      </div>
      <div className='md:flex hidden py-4 flex-col w-[200px]  px-4 bg-[#000000]  m-1 rounded-lg'>
        <div className='flex items-center justify-between bg-pink-300 '>
          <div className='text-2xl ' style={Jersey.style}>
            PLAYLIST
          </div>
          <IoIosAdd className='w-8 h-8 ' />
        </div>
        <NavLinks />
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
