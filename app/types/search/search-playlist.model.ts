import { z } from 'zod';
import { DownloadLinkModel } from '../common/download.model';

export const SearchPlaylistModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(
    // TODO: Do this for all search models
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      image: z.array(DownloadLinkModel),
      url: z.string(),
      songCount: z.number().nullable(),
      language: z.string(),
      explicitContent: z.boolean(),
    })
  ),
});

export const SearchPlaylistModelApiResponse = z.object({
  success: z.boolean(),
  data: SearchPlaylistModel,
});

export type SearchPlaylistModelApiParameters = {
  query: string;
  page?: number;
  limit?: number;
};
