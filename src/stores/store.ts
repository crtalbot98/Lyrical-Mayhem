import { configureStore } from '@reduxjs/toolkit'
import spotifyPlayerReducer from './reducers/spotify-player-reducer'

export const store = configureStore({
    reducer: {
        spotifyPlayer: spotifyPlayerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch