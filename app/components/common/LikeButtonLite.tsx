import { IconButton } from '@radix-ui/themes';
import React, { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

type Props = {};

export default function LikeButtonLite({}: Props) {
  const getRandomBoolean = () => Math.random() >= 0.5;
  const [liked, setLiked] = useState(getRandomBoolean());
  return (
    <IconButton
      variant="ghost"
      radius="full"
      size="2"
      // color='gray'
      className="transform cursor-pointer bg-accent_surface p-2 transition duration-500 hover:scale-110"
      onClick={() => {
        setLiked(!liked);
      }}
    >
      {liked ? <FcLike size={25} /> : <FcLikePlaceholder size={25} />}
    </IconButton>
  );
}
