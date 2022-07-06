import { createReducer, createAction } from '@reduxjs/toolkit'

export type lyricsWithTimestamp = { seconds: number, lyrics: string };

export type songLyrics = lyricsWithTimestamp[] | string[];

export type Song = { 
  id: string, 
  lyrics: songLyrics,
  lyricsType: LyricTypes,
  length: number, 
  name: string, 
  artist: string 
};

export type playerDetails = { currentTime: number, error: string };

export enum LyricTypes {
	Timestamped,
	NoTimestamp,
	None
}

export interface PlayerState {
  playing: boolean;
	song: Song;
  playerDetails: playerDetails;
}

export interface SetPlaying {
  payload: {
    playing: boolean;
  },
  type: string;
}

export interface SetSongLyricsAction {
  payload: {
    id: string,
    lyrics: songLyrics;
    name?: string;
    artist?: string
  },
  type: string;
}

export interface SetCurrentTime {
  payload: {
    position: number;
  },
  type: string;
}

export interface SetSongData {
  payload: {
    id: string,
    length: number,
    name: string,
    artist: string
  },
  type: string
}

export interface SetPlayerError {
  payload: {
    error: string;
  },
  type: string;
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSongLyrics = createAction('spotifyPlayer/setSongLyrics');
const setCurrentTime = createAction('spotifyPlayer/setCurrentTime');
const setSongData = createAction('spotifyPlayer/setSongData');
const setPlayerError = createAction('spotifyPlayer/setPlayerError');

const initialState = { 
	playing: false,
  song: {
    id: '',
    lyrics: [],
    lyricsType: LyricTypes.None,
    length: 0,
    name: '',
    artist: ''
  },
  playerDetails: {
    currentTime: 0,
    error: ''
  }
} as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPlaying, (state, action: SetPlaying) => {
      state.playing = action.payload.playing
    })
    .addCase(setCurrentSongLyrics, (state, action: SetSongLyricsAction) => {
      state.playerDetails.error = '';
      state.song.lyrics = action.payload.lyrics;

      if(action.payload.lyrics.length < 1) state.song.lyricsType = LyricTypes.None
      else state.song.lyricsType = (action.payload.lyrics[0] as lyricsWithTimestamp)?.seconds ? 
        LyricTypes.Timestamped : 
        LyricTypes.NoTimestamp   

      state.playing = true
		})
    .addCase(setCurrentTime, (state, action: SetCurrentTime) => {
			state.playerDetails.currentTime = action.payload.position;
		})
    .addCase(setSongData, (state, action: SetSongData) => {
      state.song = {
        id: action.payload.id,
        name: action.payload.name,
        artist: action.payload.artist,
        length: action.payload.length,
        lyrics: state.song.lyrics,
        lyricsType: state.song.lyricsType
      }
    })
    .addCase(setPlayerError, (state, action: SetPlayerError) => {
			state.playerDetails.error = action.payload.error;
      state.song.lyricsType = LyricTypes.Empty
		})
});

export default spotifyPlayerReducer