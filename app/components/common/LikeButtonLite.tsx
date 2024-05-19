import { IconButton } from '@radix-ui/themes';
import React, { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

type Props = {};

export default function LikeButtonLite({}: Props) {
  const getRandomBoolean = () => Math.random() >= 0.5;
  const [liked, setLiked] = useState(getRandomBoolean());
  return (
    <IconButton
      variant='ghost'
      radius='full'
      size='2'
      // color='gray'
      className='cursor-pointer p-2 hover:scale-110 transform transition duration-500 bg-accent_surface'
      onClick={() => {
        setLiked(!liked);
      }}>
      {liked ? <FcLike size={25} /> : <FcLikePlaceholder size={25} />}
    </IconButton>
  );
}
