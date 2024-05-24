'use client';
import { ArtistMapModel, DownloadLinkModel } from '@/types';
import React from 'react';
import { useDotButton } from './EmblaCarouselDotButton';
import { UsePrevNextButtons } from './EmblaCarousel';
import { TypeOf, z } from 'zod';
import { Jersey } from '@/assets/fonts';
import { IconButton, Skeleton } from '@radix-ui/themes';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { TbCircle } from 'react-icons/tb';
import ArtistCarouselCard from './ArtistCarouselCard';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  headerName: string;
  data: z.infer<typeof ArtistMapModel>[];
  delay?: string;
  isLoading?: boolean;
};

export default function ArtistCarousel({ headerName, data, isLoading }: Props) {
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

  let MergedArtistData = mergeArtistRoles(data);

  return (
    <div className="my-4">
      <h2 className="mb-2 text-5xl capitalize text-accent_8" style={Jersey.style}>
        {headerName}
      </h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container -ml-6 h-full  ">
          {MergedArtistData?.map((item) => {
            return (
              <div
                key={item.id}
                className="embla__slide md:  flex-[0_0_50%] pl-6 sm:flex-[0_0_25%] lg:flex-[0_0_16.6666666667%] xl:flex-[0_0_14.2857142857%] "
              >
                <ArtistCarouselCard data={item} />
              </div>
            );
          })}
        </div>
        <div className="my-4 flex w-full items-center justify-between gap-2 ">
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
          <div className="embla__dots hidden lg:block">
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
                  className={`rounded-full border-2  fill-transparent   ${
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
function mergeArtistRoles(data: z.infer<typeof ArtistMapModel>[]) {
  const artistMap = new Map();

  data.forEach((artist) => {
    if (artistMap.has(artist.id)) {
      const existingArtist = artistMap.get(artist.id);

      // Merge roles
      const rolesSet = new Set([...existingArtist.role.split(', '), ...artist.role.split(', ')]);
      existingArtist.role = Array.from(rolesSet).join(', ');

      // Merge images
      const imageMap = new Map(
        existingArtist.image.map((img: z.infer<typeof DownloadLinkModel>) => [img.url, img]),
      );
      artist.image.forEach((img) => {
        if (!imageMap.has(img.url)) {
          existingArtist.image.push(img);
          imageMap.set(img.url, img);
        }
      });
    } else {
      artistMap.set(artist.id, { ...artist });
    }
  });

  return Array.from(artistMap.values());
}
