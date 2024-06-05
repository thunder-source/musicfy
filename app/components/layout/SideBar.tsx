import { links } from '../../data/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Jersey } from '../../assets/fonts';
import { IoIosAdd, IoIosHeartEmpty } from 'react-icons/io';
import { Button, IconButton, ScrollArea } from '@radix-ui/themes';
import MellowSvg from '@/assets/mellow.svg';

type navTypes = {
  handleClick?: Function;
};

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-16 z-50 hidden h-[calc(100vh_-_64px)] w-[210px] min-w-[210px]  flex-col gap-1 p-1 lg:flex">
      <div className="flex h-full flex-col rounded-lg border-2 border-gray_a5 bg-accent_a2 px-4 py-2 pb-4 ">
        <div className="text-2xl text-accent_10" style={Jersey.style}>
          BROWSE
        </div>
        <NavLinks />
      </div>
      {/* <div className=' flex p-4 flex-col  border-gray_a5 border-2 h-full bg-accent_a2 rounded-lg relative'>
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
      </div> */}
    </div>
  );
};

const NavLinks = ({ handleClick }: navTypes) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full w-full flex-col gap-2">
      {links.map(({ icon: Icon, activeIcon: ActiveIcon, name, to }) => (
        <Link key={name} href={to} className="w-full ">
          <Button
            onClick={() => handleClick && handleClick()}
            variant={to == pathname ? 'solid' : 'soft'}
            className="w-full cursor-pointer justify-between"
          >
            {to == pathname ? <ActiveIcon /> : <Icon />}
            {name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
