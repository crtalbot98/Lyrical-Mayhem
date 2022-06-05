import Lyric from './entities/lyric';
import { store } from '../stores/store';
import { lyrics } from '../types';

export default class TextHandler {

    private _currentLyrics: Lyric[];

    constructor() {
        this._currentLyrics = []
    }

    public addLyric(stage: any): void {
        const currentSongLyrics = store.getState().spotifyPlayer.currentSong.lyrics;
        const currentTimestamp = store.getState().spotifyPlayer.currentTime;

        if(!currentSongLyrics || currentSongLyrics.length < 1) return;

        const nextLyricIndex = currentSongLyrics.findIndex((line: lyrics) => {
            return line.seconds.toString() === currentTimestamp.toString()
        });
        if(nextLyricIndex === -1) return;

        const currentLyricsMatchIndex = this._currentLyrics.findIndex((elm: Lyric) => {
            return elm.text === currentSongLyrics[nextLyricIndex].lyrics
        });
        if(currentLyricsMatchIndex !== -1) return;

        const lyricText = currentSongLyrics[nextLyricIndex].lyrics

        this.poolLyrics(stage, lyricText);
    }

    private poolLyrics(stage: any, lyric: string): void {
        if(this._currentLyrics.length <= 20){
            const nextLyricSprite = new Lyric(lyric);
            stage.addChild(nextLyricSprite.entity);
            this._currentLyrics.push(nextLyricSprite)
        }
        else {
            const firstDestroyedLyric = this._currentLyrics.findIndex((elm: Lyric) => { 
                return elm.destroyed 
            });
            if(firstDestroyedLyric === -1) return;
            
            const destroyedLyric = this._currentLyrics[firstDestroyedLyric];
            destroyedLyric.reset(lyric);
            stage.addChild(destroyedLyric.entity)
        }
    }

    get lyrics(): Lyric[] {
        return this._currentLyrics
    }
}