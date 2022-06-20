import { createReducer, createAction } from '@reduxjs/toolkit'

export type lyricsWithTimestamp = { seconds: number, lyric: string }

export type songLyrics = lyricsWithTimestamp[] | string[]

export type currentSong = { lyrics: songLyrics, length: number, name: string, artist: string }

export type playerDetails = { currentTime: number, error: string }

export interface PlayerState {
  playing: boolean;
	currentSong: currentSong;
  playerDetails: playerDetails;
}

export interface SetPlaying {
  payload: {
    playing: boolean;
  },
  type: string;
}

export interface SetCurrentSongLyricsAction {
  payload: {
    lyrics: songLyrics;
    name?: string;
    artist?: string
  },
  type: string;
}

export interface SetSongLengthAndCurrentTime {
  payload: {
    position: number;
    length: number;
  },
  type: string;
}

export interface SetPlayerError {
  payload: {
    error: string;
  },
  type: string;
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSongLyrics = createAction('spotifyPlayer/setCurrentSongLyrics');
const setSongLengthAndCurrentTime = createAction('spotifyPlayer/setSongLengthAndCurrentTime');
const setPlayerError = createAction('spotifyPlayer/setPlayerError');

const initialState = { 
	playing: false,
  currentSong: {
    lyrics: [],
    length: 0,
    name: '',
    artist: ''
  },
  playerDetails: {
    currentTime: 0,
  }
} as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPlaying, (state, action: SetPlaying) => {
      state.playing = action.payload.playing
    })
    .addCase(setCurrentSongLyrics, (state, action: SetCurrentSongLyricsAction) => {
			state.currentSong.lyrics = action.payload.lyrics;
      state.currentSong.name = action.payload.name;
      state.currentSong.artist = action.payload.artist;
      state.playing = true
		})
    .addCase(setSongLengthAndCurrentTime, (state, action: SetSongLengthAndCurrentTime) => {
			state.playerDetails.currentTime = action.payload.position;
      state.currentSong.length = action.payload.length;
		})
    .addCase(setPlayerError, (state, action: SetPlayerError) => {
			state.playerDetails.error = action.payload.error;
		})
});

export default spotifyPlayerReducer