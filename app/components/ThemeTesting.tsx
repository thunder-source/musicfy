'use client';
import { Flex, Select, Skeleton } from '@radix-ui/themes';

let colors = [
  'bg-accent_1',
  'bg-accent_2',
  'bg-accent_3',
  'bg-accent_4',
  'bg-accent_5',
  'bg-accent_6',
  'bg-accent_7',
  'bg-accent_8',
  'bg-accent_9',
  'bg-accent_10',
  'bg-accent_11',
  'bg-accent_12',
  'bg-accent_a1',
  'bg-accent_a2',
  'bg-accent_a3',
  'bg-accent_a4',
  'bg-accent_a5',
  'bg-accent_a6',
  'bg-accent_a7',
  'bg-accent_a8',
  'bg-accent_a9',
  'bg-accent_a10',
  'bg-accent_a11',
  'bg-accent_a12',
  'bg-accent_contrast',
  'bg-accent_surface',
  'bg-accent_indicator',
  'bg-accent_track',
  'bg-gray_1',
  'bg-gray_2',
  'bg-gray_3',
  'bg-gray_4',
  'bg-gray_5',
  'bg-gray_6',
  'bg-gray_7',
  'bg-gray_8',
  'bg-gray_9',
  'bg-gray_10',
  'bg-gray_11',
  'bg-gray_12',
  'bg-gray_a1',
  'bg-gray_a2',
  'bg-gray_a3',
  'bg-gray_a4',
  'bg-gray_a5',
  'bg-gray_a6',
  'bg-gray_a7',
  'bg-gray_a8',
  'bg-gray_a9',
  'bg-gray_a10',
  'bg-gray_a11',
  'bg-gray_a12',
  'bg-gray_contrast',
  'bg-gray_surface',
  'bg-gray_indicator',
  'bg-gray_track',
];

const radius = [
  'rounded-radius_1',
  'rounded-radius_2',
  'rounded-radius_3',
  'rounded-radius_4',
  'rounded-radius_5',
  'rounded-radius_6',
];

export const ThemeTesting = () => {
  return (
    <div className=' p-4'>
      <Flex
        gap='2'
        direction='row'
        className='flex-wrap gap-4 justify-between w-full'>
        {colors.map((color) => {
          return (
            <div
              key={color}
              className={`${color} rounded-lg text-center border-2 p-2 px-4`}>
              {color}
            </div>
          );
        })}
        {radius.map((radius) => {
          return (
            <div
              key={radius}
              className={`${radius} bg-accent_1 text-center border-2 p-2 px-4 `}>
              {radius}
            </div>
          );
        })}
      </Flex>
    </div>
  );
};
