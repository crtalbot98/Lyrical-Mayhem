import { createReducer, createAction } from '@reduxjs/toolkit'
import { lyrics } from '../../types';

type currentSong = {
  id: string,
  artist: string,
  name: string,
  uri: string,
  lyrics?: lyrics[],
  length?: number
}

interface PlayerState {
  playing: boolean,
	currentSong: currentSong,
  currentTime: number,
  error: string
}

interface SetCurrentSongAction {
  payload: {
    id: string,
    artist: string,
    name: string,
    uri: string,
    lyrics?: lyrics[],
    length?: number
  },
  type: string
}

interface SetCurrentSongLyricsAction {
  payload: {
    lyrics?: lyrics[]
  },
  type: string
}

interface SetSongLengthAndCurrentTime {
  payload: {
    position: number,
    length: number
  },
  type: string
}

interface SetPlayerError {
  payload: {
    error: string
  },
  type: string
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSong = createAction('spotifyPlayer/setCurrentSong');
const setCurrentSongLyrics = createAction('spotifyPlayer/setCurrentSongLyrics');
const setSongLengthAndCurrentTime = createAction('spotifyPlayer/setSongLengthAndCurrentTime');
const setPlayerError = createAction('spotifyPlayer/setPlayerError');

const initialState = { 
	playing: false,
  currentSong: {
    id: '',
    artist: '',
    name: '',
    uri: '',
    lyrics: [],
    length: 0
  },
  currentTime: 0,
  error: ''
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
      .addCase(setSongLengthAndCurrentTime, (state, action: SetSongLengthAndCurrentTime) => {
				state.currentTime = action.payload.position;
        state.currentSong.length = action.payload.length;
		  })
      .addCase(setPlayerError, (state, action: SetPlayerError) => {
				state.error = action.payload.error;
		  })
});

export default spotifyPlayerReducer