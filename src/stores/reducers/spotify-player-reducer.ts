import { createReducer, createAction } from '@reduxjs/toolkit'

interface PlayerState {
  playing: boolean,
	currentSong: string
}

interface SetCurrentSongAction {
  payload: {
    newSong: string
  },
  type: string
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSong = createAction('spotifyPlayer/setCurrentSong');

const initialState = { 
	playing: false,
  currentSong: ''
} as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(setPlaying, (state) => {
        state.playing = !state.playing
      })
			.addCase(setCurrentSong, (state, action: SetCurrentSongAction) => {
				state.currentSong = action.payload.newSong
		})
});

export default spotifyPlayerReducer