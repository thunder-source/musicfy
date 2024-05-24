import { z } from 'zod';
import { SongModel } from '@/types/songs/song.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  currentSongs: z.infer<typeof SongModel>[] | [];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: z.infer<typeof SongModel> | undefined;
  volume: number;
}

const initialState: State = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: undefined,
  volume: 30,
};

type setActiveSongPayloadType = {
  songs: z.infer<typeof SongModel>[];
  index: number;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, { payload }: PayloadAction<setActiveSongPayloadType>) => {
      state.activeSong = payload.songs[payload.index];
      state.currentIndex = payload.index;
      state.currentSongs = payload.songs;
      state.isActive = true;
      state.isPlaying = true;
    },

    nextSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;
