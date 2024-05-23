import { mobileNavigationLinks } from '@/data/constants';
import { IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

export default function MobileBottomNavigation({}: Props) {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 left-0 w-full bg-accent_surface custom-filter  flex px-4 py-2 items-center justify-center lg:hidden border-gray_a3 p-2 border-t-2'>
      {mobileNavigationLinks.map(
        ({ icon: Icon, activeIcon: ActiveIcon, name, to }) => (
          <Link
            key={name}
            href={to}
            className={`w-full flex flex-col items-center gap-1 mt-1 ${
              to == pathname && 'text-accent_8'
            }`}>
            <IconButton
              size='2'
              variant={to == pathname ? 'solid' : 'soft'}
              className='cursor-pointer'>
              {to == pathname ? <ActiveIcon size={20} /> : <Icon size={20} />}
            </IconButton>
            <span className='text-xs'>{name}</span>
          </Link>
        )
      )}
    </div>
  );
}
