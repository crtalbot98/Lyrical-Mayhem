import { createReducer, createAction } from '@reduxjs/toolkit'

interface LoginState {
    loggedIn: boolean,
		accessToken: string,
		refreshToken: string
}

const setLoggedIn = createAction('auth/setLoggedIn');
const setTokens = createAction('auth/setTokens');

const initialState = {  
    loggedIn: false,
    accessToken: null,
    refreshToken: null
} as LoginState;
 
const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setLoggedIn, (state) => {
          const url = new URLSearchParams(location.href);

          for (const [key, value] of url) {
						if(key.includes('code')) {
								state.accessToken = value || null;
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