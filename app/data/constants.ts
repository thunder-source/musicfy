import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi';
import { RiHomeSmileFill, RiHomeSmileLine } from 'react-icons/ri';
import { TbPhoto, TbPhotoFilled } from 'react-icons/tb';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  {
    name: 'Discover',
    to: '/',
    icon: RiHomeSmileLine,
    activeIcon: RiHomeSmileFill,
  },
  {
    name: 'Around You',
    to: '/around-you',
    icon: TbPhoto,
    activeIcon: TbPhotoFilled,
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
