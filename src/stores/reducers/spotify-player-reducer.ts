import { createReducer, createAction } from '@reduxjs/toolkit'

interface PlayerState {
  playing: boolean,
	currentSong: string
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSong = createAction('spotifyPlayer/setCurrentSong');

const initialState = { 
	playing: false 
} as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(setPlaying, (state) => {
          state.playing = !state.playing
      })
			.addCase(setCurrentSong, (state, action) => {
				state.currentSong = action.payload;
		})
});

export default spotifyPlayerReducer