import Lyric from './entities/lyric';
import { store } from '../stores/store';
import { songLyrics } from '../stores/reducers/spotify-player-reducer';

enum LyricTypes {
	Timestamped,
	NoTimestamp,
	None
}

export default class TextHandler {

    private _currentLyrics: Lyric[];
		private _currentSongLyrics: any[];
		private _currentSongLyricsType: LyricTypes;
		private _currentTimestamp: number;
		private _currentSongLength: number;
		private _currentSongNameAndArtist: { name: string, artist: string };

    constructor() {
      this._currentLyrics = [];
			this._currentSongLyrics = [];
			store.subscribe(() => { this.handleStateUpdates() })
    }

    public addLyric(stage: any): void {
			if(this._currentSongLyrics.length < 1) return;

			let nextLyricText: string;
			
			if(this._currentSongLyricsType === LyricTypes.Timestamped) {
				nextLyricText = this.getLyricsWithTimestamp()
			}
			else if(this._currentSongLyricsType === LyricTypes.NoTimestamp) {
				nextLyricText = this.getLyricsWithoutTimestamp()
			}

      if(nextLyricText) this.poolLyrics(stage, nextLyricText);
    }

		private getLyricsWithTimestamp(): string {
			const nextLyricIndex = this._currentSongLyrics.findIndex((elm: any) => {
				return elm.seconds.toString() === this._currentTimestamp.toString()
			});
			if(nextLyricIndex === -1) return;
			console.log(nextLyricIndex)

			const currentLyricsMatchIndex = this._currentLyrics.findIndex((elm: Lyric) => {
				return elm.text === this._currentSongLyrics[nextLyricIndex]?.lyric
			});
			if(currentLyricsMatchIndex !== -1) return;

			return this._currentSongLyrics[nextLyricIndex]?.lyric
		}

		private getLyricsWithoutTimestamp(): string {
			const lyricLength = this._currentSongLyrics.length;
			const lyricToTimeAvg = Math.floor(this._currentSongLength / lyricLength);
	
			if(this._currentTimestamp % lyricToTimeAvg === 0) {
				const nextPossibleLyric = this._currentSongLyrics[this._currentSongLength / lyricToTimeAvg].toString();

				const currentLyricsMatchIndex = this._currentLyrics.findIndex(({text}) => {
					return text === nextPossibleLyric
				});
				if(currentLyricsMatchIndex !== -1) return;

				return nextPossibleLyric
			}
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

		private handleStateUpdates(): void {
			const { lyrics, name, artist, length } = store.getState().spotifyPlayer.currentSong;
			let nextTimestamp = store.getState().spotifyPlayer.playerDetails.currentTime;
			nextTimestamp = Number(nextTimestamp);

			if(this._currentSongNameAndArtist?.name !== name && this._currentSongNameAndArtist?.artist !== artist) {
				this._currentSongNameAndArtist = { name, artist };
				this._currentSongLyrics = lyrics;
				this._currentSongLength = length;
				this._currentSongLyricsType = typeof this._currentSongLyrics[0] === 'string' ? LyricTypes.NoTimestamp : LyricTypes.Timestamped;
			}

			if(this._currentTimestamp !== nextTimestamp) this._currentTimestamp = nextTimestamp
		}

    get lyrics(): Lyric[] {
      return this._currentLyrics
    }
}