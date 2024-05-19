import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../../assets';
import { links } from '../../data/constants';
import { HiOutlineMenu } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Jersey } from '../../assets/fonts';
import { IoIosAdd, IoIosHeartEmpty } from 'react-icons/io';
import { Button, IconButton, ScrollArea } from '@radix-ui/themes';
import MellowSvg from '@/assets/mellow.svg';

type navTypes = {
  handleClick?: Function;
};

const Sidebar = () => {
  return (
    <div className=' min-w-[210px] max-h-screen gap-1 p-1  flex-col hidden lg:flex '>
      <div className='flex py-2 pb-4 flex-col px-4 border-border border-2 bg-accent_a2 rounded-lg '>
        <div className='text-2xl text-accent_10' style={Jersey.style}>
          BROWSE
        </div>
        <NavLinks />
      </div>
      <div className=' flex p-4 flex-col  border-border border-2 h-full bg-accent_a2 rounded-lg relative'>
        <div className='flex items-center text-accent_10 justify-between'>
          <div
            className='text-2xl '
            // style={Jersey.style}
          >
            PLAYLIST
          </div>
          <IconButton radius='full' className='cursor-pointer' variant='soft'>
            <IoIosAdd className=' w-6 h-6' />
          </IconButton>
        </div>
        <ScrollArea type='hover' scrollbars='vertical' className='w-full mt-4'>
          <div className='flex flex-col w-full gap-2'>
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

        <div className='bottom-0 z-[-1] absolute left-4'>
          <MellowSvg className='w-[160px] h-full' alt='Marsh mallow' />
        </div>
      </div>
    </div>
  );
};

// className={` ${
//   item.to == pathname ? 'active-Link' : 'unActive-Link'
// } flex flex-row my-6 justify-start items-center text-sm font-medium hover:text-cyan-500 text-gray-300 `}

const NavLinks = ({ handleClick }: navTypes) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-2 w-full h-full'>
      {links.map(({ icon: Icon, activeIcon: ActiveIcon, name, to }) => (
        <Link key={name} href={to} className='w-full '>
          <Button
            // disabled={to == pathname}
            onClick={() => handleClick && handleClick()}
            variant={to == pathname ? 'solid' : 'soft'}
            className='w-full justify-between cursor-pointer'>
            {to == pathname ? <ActiveIcon /> : <Icon />}
            {name}
          </Button>
        </Link>
      ))}
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
