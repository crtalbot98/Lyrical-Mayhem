import { createReducer, createAction } from '@reduxjs/toolkit'
import { lyrics } from '../../types';

type currentSong = {
  lyrics?: lyrics[],
  length?: number
}

type playerDetails = {
  currentTime: number,
  error: string,
  deviceId: string
}

interface PlayerState {
  playing: boolean,
	currentSong?: currentSong,
  playerDetails?: playerDetails
}

interface SetPlaying {
  payload: {
    playing: boolean
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

interface SetDeviceId {
  payload: {
    deviceId: string
  },
  type: string
}

const setPlaying = createAction('spotifyPlayer/setPlaying');
const setCurrentSongLyrics = createAction('spotifyPlayer/setCurrentSongLyrics');
const setSongLengthAndCurrentTime = createAction('spotifyPlayer/setSongLengthAndCurrentTime');
const setPlayerError = createAction('spotifyPlayer/setPlayerError');
const setDeviceId = createAction('spotifyPlayer/setDeviceId')

const initialState = { 
	playing: false,
  currentSong: {
    lyrics: [],
    length: 0
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
        state.playing = true
		  })
      .addCase(setSongLengthAndCurrentTime, (state, action: SetSongLengthAndCurrentTime) => {
				state.playerDetails.currentTime = action.payload.position;
        state.currentSong.length = action.payload.length;
		  })
      .addCase(setPlayerError, (state, action: SetPlayerError) => {
				state.playerDetails.error = action.payload.error;
		  })
      .addCase(setDeviceId, (state, action: SetDeviceId) => {
				state.playerDetails.deviceId = action.payload.deviceId;
		  })
});

export default spotifyPlayerReducer