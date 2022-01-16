import { Text } from 'pixi.js';
import { TimestampedLyrics } from 'src/types';
import Lyric from './entities/lyric';

export default class TextHandler {

    private _currentSongLyrics: TimestampedLyrics[];
    private _currentLyrics: Lyric[] = [];

    constructor(data: []) {
        this._currentSongLyrics = data || [
            {
                "time": 19090,
                "words": "What do you mean?"
            },
            {
                "time": 22050,
                "words": "I'm sorry by the way"
            },
            {
                "time": 25790,
                "words": "I'm never coming back down"
            },
            {
                "time": 29440,
                "words": "Can't you see?"
            },
            {
                "time": 31590,
                "words": "I could, but wouldn't stay"
            },
        ];
    }

    private addLyric(stage: any): void {
        const text = this._currentSongLyrics[2].words

        if(this._currentLyrics.length <= 20){
            const nextLyric = new Lyric(text);

            stage.addChild(nextLyric.entity);
            this._currentLyrics.push(nextLyric)
        }
        else {
            const firstDestroyedLyric = this._currentLyrics.findIndex((elm: Lyric) => { return elm.destroyed });

            if(firstDestroyedLyric !== -1) {
                const destroyedLyric = this._currentLyrics[firstDestroyedLyric];

                destroyedLyric.reset(text);
                stage.addChild(destroyedLyric.entity)
            }
        }
    }
}