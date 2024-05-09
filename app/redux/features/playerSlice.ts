import { createSlice } from '@reduxjs/toolkit';

interface Song {
  // Define the structure of a song
}

interface State {
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song | {};
}

const initialState: State = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, { payload }) => {
      console.log(payload);
      state.activeSong = payload.songs[0];

      state.currentSongs = payload.data;
      // if (action.payload?.data?.tracks?.hits) {
      //   state.currentSongs = action.payload.data.tracks.hits;
      // } else if (action.payload?.data?.properties) {
      //   state.currentSongs = action.payload?.data?.tracks;
      // } else {
      //   state.currentSongs = action.payload.data;
      // }

      // state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      // if (state.currentSongs[action.payload]?.track) {
      //   state.activeSong = state.currentSongs[action.payload]?.track;
      // } else {
      //   state.activeSong = state.currentSongs[action.payload];
      // }

      state.activeSong = state.currentSongs[action.payload];

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      // if (state.currentSongs[action.payload]) {
      //   state.activeSong = state.currentSongs[action.payload];
      // } else {
      // }
      state.activeSong = state.currentSongs[action.payload];

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } =
  playerSlice.actions;

export default playerSlice.reducer;
