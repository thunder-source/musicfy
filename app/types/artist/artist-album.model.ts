import { z } from 'zod';
import { AlbumModel } from '../album/album.model';

export const ArtistAlbumModel = z.object({
  total: z.number(),
  albums: z.array(AlbumModel),
});
