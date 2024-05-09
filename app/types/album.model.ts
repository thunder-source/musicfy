import { z } from 'zod';
import { SongModel } from './song.model';
import { DownloadLinkModel } from './download.model';

export const AlbumModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  year: z.number().nullable(),
  type: z.string(),
  playCount: z.number().nullable(),
  language: z.string(),
  explicitContent: z.boolean(),
  artists: z.object(SongModel.shape.artists.shape),
  songCount: z.number().nullable(),
  url: z.string(),
  image: z.array(DownloadLinkModel),
  songs: z.array(SongModel).nullable(),
});
