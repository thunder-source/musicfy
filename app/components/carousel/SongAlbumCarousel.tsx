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
    },
    // [Autoplay({ delay: delay })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    UsePrevNextButtons(emblaApi);

  return (
    <div className="my-4">
      <h2 className="mb-2 text-5xl capitalize text-accent_8" style={Jersey.style}>
        {headerName}
      </h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container -ml-4 h-full  ">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="embla__slide md:  flex-[0_0_50%] pl-4 sm:flex-[0_0_25%] lg:flex-[0_0_16.6666666667%] xl:flex-[0_0_16.2857142857%] "
              >
                <SongAlbumCarouselCard data={item} />
              </div>
            );
          })}
        </div>
        <div className="my-4 flex w-full items-center justify-between gap-2">
          <div className="flex gap-2 ">
            <IconButton
              variant="soft"
              size="4"
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
              className="cursor-pointer rounded-full"
            >
              <MdNavigateBefore size={30} />
            </IconButton>
            <IconButton
              variant="soft"
              size="4"
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
              className="cursor-pointer rounded-full"
            >
              <MdNavigateNext size={30} />
            </IconButton>
          </div>
          <div className="embla__dots hidden lg:flex">
            {scrollSnaps.map((_, index) => (
              <IconButton
                key={index}
                size="4"
                variant="ghost"
                onClick={() => onDotButtonClick(index)}
                className="mr-2  cursor-pointer rounded-full"
              >
                <TbCircle
                  size={30}
                  className={`rounded-full border-2  fill-transparent  ${
                    index === selectedIndex ? ' border-accent_9' : ' border-accent_a6'
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
