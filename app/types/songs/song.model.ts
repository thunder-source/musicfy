import { z } from 'zod';
import { LyricsModel } from '../songs/song-lyrics.model';
import { ArtistMapModel } from '../artist/artist-map.model';
import { DownloadLinkModel } from '../common/download.model';

export const SongModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  year: z.string().nullable(),
  releaseDate: z.string().nullable(),
  duration: z.number().nullable(),
  label: z.string().nullable(),
  explicitContent: z.boolean(),
  playCount: z.number().nullable(),
  language: z.string(),
  hasLyrics: z.boolean(),
  lyricsId: z.string().nullable(),
  lyrics: LyricsModel.optional(),
  url: z.string(),
  copyright: z.string().nullable(),
  album: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    url: z.string().nullable(),
  }),
  artists: z.object({
    primary: z.array(ArtistMapModel),
    featured: z.array(ArtistMapModel),
    all: z.array(ArtistMapModel),
  }),
  image: z.array(DownloadLinkModel),
  downloadUrl: z.array(DownloadLinkModel),
});
