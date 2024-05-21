import { HoverCard, IconButton, Slider } from '@radix-ui/themes';
import React, { useState } from 'react';
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from 'react-icons/bs';

type props = {
  value: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

const VolumeBar = ({ value, setVolume }: props) => {
  const [prevSliderValue, setPrevSliderValue] = useState<number>(0);
  return (
    <div className='  items-center  mx-4  hidden lg:flex'>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <IconButton
            variant='ghost'
            radius='full'
            size='2'
            color='gray'
            className='cursor-pointer p-2'>
            {value <= 100 && value > 79 && (
              <BsFillVolumeUpFill
                size={25}
                onClick={() => {
                  setPrevSliderValue(value), setVolume(0);
                }}
              />
            )}
            {value <= 79 && value > 0 && (
              <BsVolumeDownFill
                size={25}
                onClick={() => {
                  setPrevSliderValue(value), setVolume(0);
                }}
              />
            )}
            {value <= 0 && (
              <BsFillVolumeMuteFill
                size={25}
                onClick={() => {
                  setVolume(prevSliderValue), setPrevSliderValue(value);
                }}
              />
            )}
          </IconButton>
        </HoverCard.Trigger>
        <HoverCard.Content align='center' maxWidth='300px'>
          <div className='2xl:w-40 lg:w-32 md:w-32 ml-2 h-full '>
            <Slider
              value={[value]}
              min={0}
              max={100}
              defaultValue={[30]}
              onValueChange={(newVolume) => {
                setVolume(newVolume[0]);
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
