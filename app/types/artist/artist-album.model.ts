import { z } from 'zod';
import { AlbumModel } from '../album/album.model';

export const ArtistAlbumModel = z.object({
  total: z.number(),
  albums: z.array(AlbumModel),
  lastPage: z.boolean(),
});

export const ArtistAlbumModelApiResponse = z.object({
  success: z.boolean(),
  data: ArtistAlbumModel,
});

export interface ArtistAlbumModelApiParameters {
  artistId: String;
  page?: Number;
  sortBy?: 'popularity' | 'latest' | 'alphabetical';
  sortOrder?: 'asc' | 'desc';
}
