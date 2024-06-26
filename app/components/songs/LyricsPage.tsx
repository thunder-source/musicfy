import { Jersey } from '@/assets/fonts';
import { ArtistModel, LyricsModel, SongModel } from '@/types';
import React from 'react';
import { z } from 'zod';

type Props = {
  song: z.infer<typeof SongModel>;
};

export default function LyricsPage({ song }: Props) {
  const getLines = (text: string) => {
    return text.split('<br>').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="mb-6 flex select-text  flex-col">
      <h2 className="my-1 text-5xl" style={Jersey.style}>
        {song.name} Lyrics
      </h2>
      <p className="w-full text-lg">{song.lyrics?.lyrics && getLines(song.lyrics?.lyrics)}</p>
      <p className="my-1 text-xl text-accent_8">
        {song.lyrics?.copyright && getLines(song.lyrics?.copyright)}
      </p>
    </div>
  );
}
