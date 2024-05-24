/* eslint-disable jsx-a11y/media-has-caption */
import { SongModel } from '@/types';
import React, { useRef, useEffect } from 'react';
import { z } from 'zod';

type props = {
  activeSong: z.infer<typeof SongModel>;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  repeat: boolean;
  onEnded: () => void;
  onTimeUpdate: (event: any) => void;
  onLoadedData: (event: any) => void;
};

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  repeat,
  onEnded,
  onTimeUpdate,
  onLoadedData,
}: props) => {
  const ref = useRef<HTMLAudioElement>(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.volume = volume / 100;
    }
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current !== null) ref.current.currentTime = seekTime;
  }, [seekTime]);

  if (Array.isArray(activeSong?.downloadUrl) && activeSong.downloadUrl.length === 0) {
    return;
  }
  if (activeSong.downloadUrl === undefined) {
    return;
  }

  return (
    <audio
      className="hidden"
      src={activeSong?.downloadUrl[4]?.url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
