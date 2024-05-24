import { z } from 'zod';
import { SongModel } from '../songs/song.model';
import { DownloadLinkModel } from '../common/download.model';

export const SearchAlbumModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      year: z.number().nullable(),
      type: z.string(),
      playCount: z.number().nullable(),
      language: z.string(),
      explicitContent: z.boolean(),
      artists: z.object(SongModel.shape.artists.shape),
      url: z.string(),
      image: z.array(DownloadLinkModel),
    })
  ),
});

export const SearchAlbumModelApiResponse = z.object({
  success: z.boolean(),
  data: SearchAlbumModel,
});

export type SearchAlbumModelApiParameters = {
  query: string;
  page?: number;
  limit?: number;
};
