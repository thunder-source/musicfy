import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import SongAlbumCarouselCard from '../common/SongAlbumCarouselCard';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { z } from 'zod';
import { AlbumModel, SongModel } from '@/types';
import { Jersey } from '@/assets/fonts';
import { IconButton, Progress } from '@radix-ui/themes';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
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
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className='my-4'>
      <h2
        className='text-5xl text-accent_8 mb-2 capitalize'
        style={Jersey.style}>
        {headerName}
      </h2>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container h-full  '>
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className='embla__slide  flex-[0_0_50%] sm:flex-[0_0_25%] md: lg:flex-[0_0_16.6666666667%] xl:flex-[0_0_16.2857142857%] '>
                <SongAlbumCarouselCard data={item} />
              </div>
            );
          })}
        </div>
        <div className='inline-flex my-4 gap-2 items-center justify-between w-full'>
          <div className='flex gap-2 flex-[0_0_80%]'>
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
          <Progress value={scrollProgress} className='w-1/6' size='3' />
        </div>
      </div>
    </div>
  );
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
