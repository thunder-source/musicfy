import { IconButton } from '@radix-ui/themes';
import React, { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

type Props = {};

export default function LikeButtonLite({}: Props) {
  const [liked, setLiked] = useState(false);
  return (
    <IconButton
      variant='ghost'
      radius='full'
      size='2'
      color='gray'
      className='cursor-pointer p-2'
      onClick={() => {
        setLiked(!liked);
      }}>
      {liked ? <FcLikePlaceholder size={25} /> : <FcLike size={25} />}
    </IconButton>
  );
}
