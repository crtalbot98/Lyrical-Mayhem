import { createReducer, createAction } from '@reduxjs/toolkit'

interface PlayerState {
    isPlaying: boolean
}

const setIsPlaying = createAction('player/setIsPlaying');

const initialState = { isPlaying: false } as PlayerState;
 
const spotifyPlayerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIsPlaying, (state, action) => {
            state.isPlaying = action.payload
        })
});

export default spotifyPlayerReducer