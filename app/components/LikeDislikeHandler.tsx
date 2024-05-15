import React, { useState } from 'react';
import { LikeButton } from './LikeButton';

type Props = {};

export default function LikeDislikeHandler({}: Props) {
  const [mockLike, setMockLke] = useState(false);
  return (
    <div className='w-7 h-7'>
      <LikeButton
        isLiked={mockLike}
        size={2}
        handleLike={() => {
          setMockLke(!mockLike);
        }}
      />
    </div>
  );
}
