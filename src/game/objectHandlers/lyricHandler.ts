import Lyric from '../entities/lyric';
import { store } from '../../stores/store';
import { lyricsWithTimestamp, LyricTypes, Song } from '../../stores/reducers/spotify-player-reducer';
import ObjectPool from './objectPool';
import { Entity } from '../entities/entity';

export default class LyricHandler{

		private _fakeLyrics: string[];
		private _lyrics: ObjectPool;

    constructor() {
			store.subscribe(() => {
				const song = store.getState().spotifyPlayer.song;
				const currentTime = Number(store.getState().spotifyPlayer.playerDetails.currentTime);
				this.addLyricToStage(song, currentTime)
			});
			(async() => {
				const data = await fetch('./fake-lyrics.json');
				const json = await data.json();
				this._fakeLyrics = json
			})();
			this._lyrics = new ObjectPool(Lyric)
    }

    public update(delta: number): void {
			if(this._lyrics.pool.length < 1) return;

			for(let i = 0; i < this._lyrics.pool.length; i++) {
				const lyric = this._lyrics.pool[i];
				if(lyric._destroyed) continue;
				lyric.update(delta);
			}
    }

		private getLyricsWithTimestamp(song: Song, currentTime: number): string {
			const lyrics = song.lyrics;
			const nextIndex = lyrics.findIndex((elm) => {
				return Number((elm as lyricsWithTimestamp).seconds) === currentTime
			});
			if(nextIndex === -1) return;

			if(this.entityWithLyricExists((lyrics[nextIndex] as lyricsWithTimestamp).lyrics)) return;
			return (lyrics[nextIndex] as lyricsWithTimestamp).lyrics
		}

		private getLyricsWithoutTimestamp(song: Song, currentTime: number): string {
			const lyrics = song.lyrics;
			const lyricToTime = Math.floor(song.length / lyrics.length);
	
			if(currentTime % lyricToTime !== 0) return;
			
			const nextLyric = lyrics[song.length / lyricToTime].toString();
			if(this.entityWithLyricExists(nextLyric)) return;
			return nextLyric
		}

		private getLyricsFromNone(song: Song, currentTime: number): string {
			if(song.length % currentTime === 0) {
				const random = Math.floor(Math.random() * this._fakeLyrics.length-1);

				if(this.entityWithLyricExists(this._fakeLyrics[random])) return;
				return this._fakeLyrics[random]
			}
		}

		private entityWithLyricExists(nextLyric: string): boolean {
			const matchingLyrics = this._lyrics.pool.findIndex(({_metrics}: Lyric) => {
				return _metrics.text === nextLyric
			});

			if(matchingLyrics === -1) return false;
			return true
		}

		private addLyricToStage(song: Song, currentTime: number): void {
			const nextLyricText = (() => {
				switch(song.lyricsType) {
					case LyricTypes.Timestamped:
						return this.getLyricsWithTimestamp(song, currentTime)
					case LyricTypes.NoTimestamp:
						return this.getLyricsWithoutTimestamp(song, currentTime)
					case LyricTypes.None:
						return this.getLyricsFromNone(song, currentTime)
					default:
						return null
				}
			})();

      if(!nextLyricText) return;

			const nextLyricEntity = this._lyrics.firstObject;
			const nextPosition = {
				x: Math.floor(Math.random() * ((window.innerWidth - 150) - 50 + 1) + 50),
				y: 50
			}

			nextLyricEntity.create(nextLyricText, nextPosition);
		}

		get lyrics(): Entity[] {
			return this._lyrics.pool
		}
}