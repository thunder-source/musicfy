import React, { FC } from 'react';

const SimpleTextLoading: FC = () => {
  return (
    <div
      className="flex h-screen w-screen select-none items-center justify-center bg-black text-center text-white"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="text-6xl sm:text-9xl">Loading...</div>
    </div>
  );
};

export default SimpleTextLoading;
