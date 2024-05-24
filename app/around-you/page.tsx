'use client';
import React from 'react';
import { Jersey } from '@/assets/fonts';

export default function AroundYou() {
  // ArtistAlbumModel
  return (
    <div className="flex flex-col p-4 px-8">
      <h2 className="mb-8 text-left text-5xl font-bold text-accent_10" style={Jersey.style}>
        Top artists
      </h2>

      <div className="flex flex-wrap gap-8 "></div>
    </div>
  );
}
