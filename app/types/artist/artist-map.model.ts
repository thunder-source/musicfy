import { z } from 'zod';
import { DownloadLinkModel } from '../common/download.model';

export const ArtistMapModel = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.string(),
  image: z.array(DownloadLinkModel),
  url: z.string(),
});
