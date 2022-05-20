import { State } from './types';

export const appState: State = {
    loading: true,
    paused: true,
}

export function set(key: string, newState: string | number): void {
    appState[key] = newState
}

export function remove(key: string): void {
    delete appState[key]
}

export function state(): State {
    return appState
}