import { createReducer, createAction } from '@reduxjs/toolkit'

interface LoginState {
    LoggedIn: boolean
}

const setLoggedIn = createAction('login/setLoggedIn');
const setTokens = createAction('login/setTokens');

const initialState = {  
    LoggedIn: false,
    accessToken: null,
    refreshToken: null
} as LoginState;
 
const loginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setLoggedIn, (state) => {
            const url = window.location.hash;
            console.log(url)
            state.LoggedIn = true;
        })
});

export default loginReducer