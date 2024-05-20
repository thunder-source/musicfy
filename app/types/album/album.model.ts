import { z } from 'zod';
import { SongModel } from '../songs/song.model';
import { DownloadLinkModel } from '../common/download.model';

export const AlbumModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  year: z.number().nullable(),
  type: z.union([z.literal('song'), z.literal('album')]),
  playCount: z.number().nullable(),
  language: z.string(),
  explicitContent: z.boolean(),
  artists: z.object(SongModel.shape.artists.shape),
  songCount: z.number().nullable(),
  url: z.string(),
  image: z.array(DownloadLinkModel),
  songs: z.array(SongModel).nullable(),
});

export const AlbumModelApiResponse = z.object({
  success: z.boolean(),
  data: AlbumModel,
});

export interface AlbumByIdApiParameters {
  albumId: String;
}
