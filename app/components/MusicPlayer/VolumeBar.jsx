import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Link,
  Slider,
  Text,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from 'react-icons/bs';

const VolumeBar = ({ value, setVolume }) => {
  const [prevSliderValue, setPrevSliderValue] = useState();
  return (
    <div className=' flex items-center  mx-4 '>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <IconButton
            variant='ghost'
            radius='full'
            size='2'
            color='gray'
            className='cursor-pointer p-2'>
            {value[0] <= 100 && value[0] > 79 && (
              <BsFillVolumeUpFill
                size={25}
                onClick={() => {
                  setPrevSliderValue([value]), setVolume([0]);
                }}
              />
            )}
            {value[0] <= 79 && value[0] > 0 && (
              <BsVolumeDownFill
                size={25}
                onClick={() => {
                  setPrevSliderValue([value]), setVolume([0]);
                }}
              />
            )}
            {value[0] <= 0 && (
              <BsFillVolumeMuteFill
                size={25}
                onClick={() => {
                  setVolume(prevSliderValue), setPrevSliderValue([value]);
                }}
              />
            )}
          </IconButton>
        </HoverCard.Trigger>
        <HoverCard.Content align='center' maxWidth='300px'>
          <div className='2xl:w-40 lg:w-32 md:w-32 ml-2 h-full '>
            <Slider
              value={value}
              min={0}
              max={100}
              defaultValue={[30]}
              onValueChange={(val) => {
                setVolume(val);
              }}
              step={1}
              variant='soft'
              className=''
            />
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    </div>
  );
};

export default VolumeBar;

{
  /* <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 bg-red-50"
      /> */
}
