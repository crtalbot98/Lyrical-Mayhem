import Lyric from '../entities/lyric';
import { store } from '../../stores/store';
import { songLyrics, lyricsWithTimestamp, LyricTypes } from '../../stores/reducers/spotify-player-reducer';
import ObjectPool from './objectPool';
import { SimpleVector2D } from 'src/types';

type SongData = {
	id: string,
	lyrics: songLyrics,
	lyricsType: LyricTypes,
	timestamp?: number,
	length?: number,
	name?: string,
	artist?: string,
}

export default class LyricHandler{

		private _currentSongData: SongData;
		private _fakeLyrics: string[];
		private _objectPool: ObjectPool;
		private _lyrics: Lyric[];

    constructor() {
			store.subscribe(() => {
				const storedSong = store.getState().spotifyPlayer.song;
				const currentTime = Number(store.getState().spotifyPlayer.playerDetails.currentTime);

				if(this._currentSongData?.id !== storedSong.id) this._currentSongData = { ...storedSong }
				this._currentSongData.timestamp = currentTime
			});
			this._objectPool = new ObjectPool();
			this._lyrics = []
    }

    public update(stage: any, delta: number): void {
			const nextLyricText = (() => {
				switch(this._currentSongData.lyricsType) {
					case LyricTypes.Timestamped:
						return this.getLyricsWithTimestamp()
					case LyricTypes.NoTimestamp:
						return this.getLyricsWithoutTimestamp()
					case LyricTypes.None:
						return this.getLyricsFromNone()
					default:
						return null
				}
			})();

      if(nextLyricText) this.addLyricToStage(stage, nextLyricText)

			if(this._lyrics.length < 1) return;

			this._lyrics.forEach((lyric) => {
				lyric.update(delta);
				if(lyric._destroyed) {
					this._objectPool.addToPool(lyric);
					stage.removeChild(lyric._entity);
				}
			})
    }

		private getLyricsWithTimestamp(): string {
			const lyrics = this._currentSongData.lyrics;
			const nextIndex = lyrics.findIndex((elm: any) => {
				return Number(elm.seconds) === Number(this._currentSongData.timestamp)
			});
			if(nextIndex === -1) return;

			if(this.objectWithLyricExists((lyrics[nextIndex] as lyricsWithTimestamp).lyrics)) return;

			return (lyrics[nextIndex] as lyricsWithTimestamp).lyrics
		}

		private getLyricsWithoutTimestamp(): string {
			const lyrics = this._currentSongData.lyrics;
			const lyricLength = lyrics.length;
			const lyricToTimeAvg = Math.floor(this._currentSongData.length / lyricLength);
	
			if(this._currentSongData.timestamp % lyricToTimeAvg === 0) {
				const nextLyric = lyrics[this._currentSongData.length / lyricToTimeAvg].toString();

				if(this.objectWithLyricExists(nextLyric)) return;
				return nextLyric
			}
		}

		private getLyricsFromNone(): string {
			if(this._fakeLyrics.length < 1) {
				(async() => {
					const data = await fetch('./fake-lyrics.json');
					const json = await data.json();
					this._fakeLyrics = json.data
				})()
			}
			else if(this._currentSongData.length % this._currentSongData.timestamp === 0) {
				const random = Math.floor(Math.random() * this._fakeLyrics.length-1);

				if(this.objectWithLyricExists(this._fakeLyrics[random])) return;
				return this._fakeLyrics[random]
			}
		}

    public addLyricToStage(stage: any, text: string): void {
			const nextLyric = this._objectPool.object;
			const nextPosition = (): SimpleVector2D => {
				return {
					x: 100,
					y: window.innerWidth / 2
				}
			}

			if(!nextLyric) {
				const nextLyricSprite = new Lyric(text, nextPosition());
				this._lyrics.push(nextLyricSprite)
				stage.addChild(nextLyricSprite._entity);
			}
			else {
				nextLyric.text = text;
				nextLyric.reset(nextPosition())
			}
    }

		private objectWithLyricExists(nextLyric: string): boolean {
			const matchingLyrics = this._lyrics.findIndex(({text}) => {
				return text === nextLyric
			});

			if(matchingLyrics === -1) return false;
			return true
		}
}