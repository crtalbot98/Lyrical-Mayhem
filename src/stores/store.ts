import { configureStore } from '@reduxjs/toolkit'
import spotifyPlayerReducer from './reducers/spotify-player-reducer'
import authReducer from './reducers/auth-reducer'

export const store = configureStore({
    reducer: {
        spotifyPlayer: spotifyPlayerReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch