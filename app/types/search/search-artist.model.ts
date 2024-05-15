import { z } from 'zod';
import { DownloadLinkModel } from '../common/download.model';

export const SearchArtistModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      type: z.string(),
      image: z.array(DownloadLinkModel),
      url: z.string(),
    })
  ),
});