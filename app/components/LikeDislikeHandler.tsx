import React, { useState } from 'react';
import { LikeButton } from './LikeButton';
import { IconButton } from '@radix-ui/themes';

type Props = {
  size?: number;
};

export default function LikeDislikeHandler({ size }: Props) {
  const [mockLike, setMockLke] = useState(false);
  return (
    <LikeButton
      isLiked={mockLike}
      size={size ? size : 1.5}
      handleLike={() => {
        setMockLke(!mockLike);
      }}
    />
  );
}
