import React from 'react';

type Props = {};

export default function SimpleTextLoading({}: Props) {
  return (
    <div className='select-none w-screen h-screen text-center flex justify-center items-center bg-black  text-white'>
      <div className='text-6xl sm:text-9xl'>Loading...</div>
    </div>
  );
}
