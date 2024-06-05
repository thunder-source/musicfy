import { z } from 'zod';
import { SongModel } from '../songs/song.model';
import { DownloadLinkModel } from '../common/download.model';

export const NewReleasesItem = z.object({
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
});

export const NewReleasesModelApiBase = z.object({
  total: z.number(),
  lastPage: z.boolean(),
  result: z.array(NewReleasesItem),
});

export const NewReleasesApiResponseModel = z.object({
  success: z.boolean(),
  data: NewReleasesModelApiBase,
});

export interface NewReleasesApiParameters {
  language: string;
  limit: number;
  page: number;
}
