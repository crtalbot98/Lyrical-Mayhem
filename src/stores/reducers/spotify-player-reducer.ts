import { createReducer, createAction } from '@reduxjs/toolkit'

type currentSong = {
  id: string,
  artist: string,
  name: string,
  uri: string,
  lyrics?: any
}

interface PlayerState {
  playing: boolean,
	currentSong: currentSong
}

interface SetCurrentSongAction {
  payload: {
    id: string,
    artist: string,
    name: string,
    uri: string,
    lyrics?: any
  },
  type: string
}

interface SetCurrentSongLyricsAction {
  payload: {
    lyrics?: any
  },
  type: string
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSong = createAction('spotifyPlayer/setCurrentSong');
const setCurrentSongLyrics = createAction('spotifyPlayer/setCurrentSongLyrics');

const initialState = { 
	playing: false,
  currentSong: {
    id: '',
    artist: '',
    name: '',
    uri: '',
    lyrics: {}
  }
} as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(setPlaying, (state) => {
        state.playing = !state.playing
      })
			.addCase(setCurrentSong, (state, action: SetCurrentSongAction) => {
				state.currentSong = { ...action.payload }
		  })
      .addCase(setCurrentSongLyrics, (state, action: SetCurrentSongLyricsAction) => {
				state.currentSong.lyrics = action.payload.lyrics;
        state.playing = true
		  })
});

export default spotifyPlayerReducer