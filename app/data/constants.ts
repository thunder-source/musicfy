import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi';
import { RiHomeSmileFill, RiHomeSmileLine, RiSearchLine, RiSearchFill } from 'react-icons/ri';

export const links = [
  {
    name: 'Discover',
    to: '/',
    icon: RiHomeSmileLine,
    activeIcon: RiHomeSmileFill,
  },
  {
    name: 'Search',
    to: '/search',
    icon: RiSearchLine,
    activeIcon: RiSearchFill,
  },
  {
    name: 'Top Artists',
    to: '/top-artists',
    icon: HiOutlineUserGroup,
    activeIcon: HiUserGroup,
  },
];

export const mobileNavigationLinks = [
  {
    name: 'Discover',
    to: '/',
    icon: RiHomeSmileLine,
    activeIcon: RiHomeSmileFill,
  },
  {
    name: 'Search',
    to: '/search',
    icon: RiSearchLine,
    activeIcon: RiSearchFill,
  },
  {
    name: 'Top Artists',
    to: '/top-artists',
    icon: HiOutlineUserGroup,
    activeIcon: HiUserGroup,
  },
];

export const languages = [
  'hindi',
  'english',
  'tamil',
  'telugu',
  'marathi',
  'gujarati',
  'bengali',
  'kannada',
  'bhojpuri',
  'punjabi',
  'malayalam',
  'urdu',
  'rajasthani',
  'odia',
  'assamese',
  'haryanvi',
];
