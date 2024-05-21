import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import SongAlbumCarouselCard from './SongAlbumCarouselCard';
import { z } from 'zod';
import { AlbumModel, SongModel } from '@/types';
import { Jersey } from '@/assets/fonts';
import { IconButton, Progress } from '@radix-ui/themes';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { UsePrevNextButtons } from './EmblaCarousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { TbCircle } from 'react-icons/tb';
type Props = {
  headerName: string;
  data: z.infer<typeof AlbumModel>[] | z.infer<typeof SongModel>[];
  delay?: string;
};

export default function SongAlbumCarousel({ data, headerName, delay }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 'auto',
      // breakpoints:['' :]
    }
    // [Autoplay({ delay: delay })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = UsePrevNextButtons(emblaApi);

  return (
    <div className='my-4'>
      <h2
        className='text-5xl text-accent_8 mb-2 capitalize'
        style={Jersey.style}>
        {headerName}
      </h2>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container -ml-4 h-full  '>
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className='embla__slide pl-4  flex-[0_0_50%] sm:flex-[0_0_25%] md: lg:flex-[0_0_16.6666666667%] xl:flex-[0_0_16.2857142857%] '>
                <SongAlbumCarouselCard data={item} />
              </div>
            );
          })}
        </div>
        <div className='flex my-4 gap-2 items-center justify-between w-full'>
          <div className='flex gap-2 '>
            <IconButton
              variant='soft'
              size='4'
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
              className='rounded-full cursor-pointer'>
              <MdNavigateBefore size={30} />
            </IconButton>
            <IconButton
              variant='soft'
              size='4'
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
              className='rounded-full cursor-pointer'>
              <MdNavigateNext size={30} />
            </IconButton>
          </div>
          <div className='embla__dots hidden lg:flex'>
            {scrollSnaps.map((_, index) => (
              <IconButton
                key={index}
                size='4'
                variant='ghost'
                onClick={() => onDotButtonClick(index)}
                className='mr-2  rounded-full cursor-pointer'>
                <TbCircle
                  size={30}
                  className={`border-2 fill-transparent  rounded-full  ${
                    index === selectedIndex
                      ? ' border-accent_9'
                      : ' border-accent_a6'
                  } `}
                />
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
