import { Jersey } from '@/assets/fonts';
import { ArtistModel } from '@/types';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';
import { FaWikipediaW } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { isLink } from '@/lib/utils';

type Props = {
  data: z.infer<typeof ArtistModel>;
};

export default function BiographyPage({ data }: Props) {
  let isWikiLinkAvailable = false;
  let isTwitterLinkAvailable = false;

  if (data?.wiki && isLink(data.wiki)) {
    isWikiLinkAvailable = true;
  }

  if (data?.twitter && isLink(data.twitter)) {
    isTwitterLinkAvailable = true;
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between md:w-1/2 ">
        <div>
          <h2 className="my-1 text-4xl" style={Jersey.style}>
            Born
          </h2>
          <p className="text-base">{data?.dob ? data?.dob : 'N/A'}</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          {isWikiLinkAvailable && (
            <Link prefetch={false} target="_blank" href={data?.wiki ? data?.wiki : ''}>
              <Button variant="soft" size="2" className="cursor-pointer">
                <FaWikipediaW /> Get Info on Wiki
              </Button>
            </Link>
          )}
          {isTwitterLinkAvailable && (
            <Link prefetch={false} target="_blank" href={data?.twitter ? data?.twitter : ''}>
              <Button variant="soft" size="2" className="cursor-pointer">
                <FaXTwitter /> Twitter
              </Button>
            </Link>
          )}
        </div>
      </div>
      {Array.isArray(data?.bio) &&
        data.bio.map(({ sequence, text, title }) => {
          let paragraphs;
          if (typeof text === 'string') {
            paragraphs = text.split(/\n+/).map((paragraph, index) => {
              return (
                <p className="mb-4" key={index}>
                  {paragraph}
                </p>
              );
            });
          }
          return (
            <div key={sequence} className="mb-6  md:w-1/2 ">
              <h2 className="my-1 text-5xl" style={Jersey.style}>
                {title}
              </h2>
              {paragraphs}
            </div>
          );
        })}
    </>
  );
}
