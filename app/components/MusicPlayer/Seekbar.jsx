import { Flex, Slider } from '@radix-ui/themes';
import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  // console.log(value);
  return (
    <div className='w-48'>
      {/* <Slider
        step='any'
        value={[value]}
        min={min}
        max={max}
        onInput={onInput}
        variant='soft'
        className='w-full bg-blue-600'
      /> */}

      {/* <button type="button" onClick={() => setSeekTime(appTime - 5)} className="hidden lg:mr-4 lg:block text-white">
        -
      </button> */}
      {/* <p className=''>{max === 0 ? '0:00' : getTime(max)}</p> /
      <p className=''>{value === 0 ? '0:00' : getTime(value)}</p> */}

      {/* <Slider
        type='range'
        step='any'
        // value={value}
        min={min}
        max={max}
        onInput={onInput}
        defaultValue={[0]}
        className='md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg'
      /> */}
      {/* <input
        type='range'
        step='any'
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className='md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg'
      /> */}
      {/* <button type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden lg:ml-4 lg:block text-white">
        +
      </button> */}
    </div>
  );
};

export default Seekbar;
