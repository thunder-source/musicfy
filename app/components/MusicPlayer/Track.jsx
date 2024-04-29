import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className='flex-1 flex items-center justify-start'>
    <div
      className={`${
        isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
      }  sm:block h-16 w-16 mr-4`}>
      <img
        src={activeSong?.image[2].url}
        alt='cover art'
        className='rounded-full'
      />
    </div>
    <div className=' sm:w-4/5 md:max-w-[250px]  max-w-[115px]'>
      <p className='truncate text-white font-bold text-lg'>
        {activeSong?.name ? activeSong?.name : 'No active Song'}
      </p>
      <p className='truncate text-gray-300'>
        {activeSong?.artists?.primary[0].name
          ? activeSong?.artists?.primary[0].name
          : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
