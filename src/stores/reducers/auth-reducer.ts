import { createReducer, createAction } from '@reduxjs/toolkit'

interface AuthState {
    loggedIn: boolean,
		accessToken: string,
		refreshToken: string,
		expiresIn: string
}

const setLoggedIn = createAction('auth/setLoggedIn');
const setTokens = createAction('auth/setTokens');

const initialState = {  
    loggedIn: false,
    accessToken: null,
    refreshToken: null,
		expiresIn: null,
} as AuthState;
 
const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setLoggedIn, (state) => {
          const url = new URLSearchParams(location.href);

          for (const [key, value] of url) {
						console.log(key)
						if(key.includes('access_token')) {
								state.accessToken = value || null;
						}
						else if(key.includes('expires_in')){
							state.expiresIn = value || null;
						}
						else if(key.includes('refresh_token')) {
							state.refreshToken = value || null;
						}
          }
					
          state.loggedIn = Boolean(state.accessToken);
        })
				.addCase(setTokens, (state) => {
					state.accessToken = state.accessToken;
					state.refreshToken = state.refreshToken
        })
});

export default authReducer