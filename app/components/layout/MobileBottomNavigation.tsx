import { mobileNavigationLinks } from '@/data/constants';
import { IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

export default function MobileBottomNavigation({}: Props) {
  const pathname = usePathname();
  return (
    <>
      <div className="mt-12 lg:hidden" />
      <div className="custom-filter fixed bottom-0 left-0 flex w-full  items-center justify-center border-t-2 border-gray_a3 bg-accent_surface p-2 px-4 py-2 lg:hidden">
        {mobileNavigationLinks.map(({ icon: Icon, activeIcon: ActiveIcon, name, to }) => (
          <Link
            key={name}
            href={to}
            className={`mt-1 flex w-full flex-col items-center gap-1 ${
              to == pathname && 'text-accent_8'
            }`}
          >
            <IconButton
              size="2"
              variant={to == pathname ? 'solid' : 'soft'}
              className="cursor-pointer"
            >
              {to == pathname ? <ActiveIcon size={20} /> : <Icon size={20} />}
            </IconButton>
            <span className="text-xs">{name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
