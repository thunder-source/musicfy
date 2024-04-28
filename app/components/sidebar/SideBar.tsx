import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../../assets';
import { links } from '../../data/constants';
import { HiOutlineMenu } from 'react-icons/hi';
// import { useLocation } from 'react-router-dom';
import Link from 'next/link';
import Image from 'next/image';

const NavLinks = ({ handleClick }) => {
  //   const location = useLocation();
  return (
    <div className='mt-10  '>
      {links.map((item) => (
        <Link
          key={item.icon}
          to={item.to}
          className={` ${
            item.to == location.pathname ? 'active-Link' : 'unActive-Link'
          } flex flex-row my-8 justify-start items-center text-sm font-medium hover:text-cyan-500 text-gray-300 `}
          onClick={() => handleClick && handleClick()}>
          <item.icon className='w-6 h-6 mr-2' />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className='md:flex hidden flex-col w-[180px] py-10 px-4 bg-[#000000] '>
        <Image
          src={logo}
          alt='logo'
          className='w-full h-48 -mb-8 -mt-8 object-contain'
        />
        <NavLinks />
      </div>
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
          src={logo}
          alt='logo'
          className='w-full h-20 object-contain hover:text-cyan-500'
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
