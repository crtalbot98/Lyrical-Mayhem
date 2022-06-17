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
			let nextLyricText: string | lyrics;

      if(!currentSongLyrics || currentSongLyrics.length < 1){
				return
			}
			else if(currentSongLyrics[0].seconds) {
				nextLyricText = this.getLyricsWithTimestamp(currentSongLyrics)
			}
			else if(typeof currentSongLyrics[0] === 'string') {
				nextLyricText = this.getLyricsWithoutTimestamp(currentSongLyrics)
			}

      this.poolLyrics(stage, nextLyricText);
    }

		private getLyricsWithTimestamp(currentSongLyrics: lyrics[]): string {
			const currentTimestamp = store.getState().spotifyPlayer.currentTime;

			const nextLyricIndex = currentSongLyrics.findIndex((line: lyrics) => {
				return line.seconds.toString() === currentTimestamp.toString()
			});
			if(nextLyricIndex === -1) return;

			const currentLyricsMatchIndex = this._currentLyrics.findIndex((elm: Lyric) => {
					return elm.text === currentSongLyrics[nextLyricIndex].lyrics
			});
			if(currentLyricsMatchIndex !== -1) return;

			return currentSongLyrics[nextLyricIndex].lyrics
		}

		private getLyricsWithoutTimestamp(currentSongLyrics: lyrics[]): lyrics {
			const lyricLength = currentSongLyrics.length;
			const currentSongLength = store.getState().spotifyPlayer.currentSong.length;
			const currentPlayerTime = store.getState().spotifyPlayer.currentTime;
			const lyricToTimeAvg = Math.floor(currentSongLength / lyricLength);

			if(currentPlayerTime % lyricToTimeAvg === 0) {
				const currentLyricsMatchIndex = this._currentLyrics.findIndex((elm: Lyric) => {
					return elm.text === currentSongLyrics[currentPlayerTime / lyricToTimeAvg].toString()
				});
				if(currentLyricsMatchIndex !== -1) return;
				console.log(currentSongLyrics[currentPlayerTime / lyricToTimeAvg])
				return currentSongLyrics[currentPlayerTime / lyricToTimeAvg]
			}
		}

    private poolLyrics(stage: any, lyric: string | lyrics): void {
      if(this._currentLyrics.length <= 20){
          const nextLyricSprite = new Lyric(lyric.toString());
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