import * as PIXI from "pixi.js";
import Player from './entities/player';
import LyricHandler from './objectHandlers/lyricHandler';
import { detectCollisions } from './utils/collisions';
import PlayerController from "./controllers/playerController";
import { store } from '../stores/store';

export const PixiApp: PIXI.Application = new PIXI.Application({ 
    resizeTo: window,
    backgroundColor: 0x1F2C28
});

export class Game {
    private _player: Player;
    private _playing: boolean;
    private _lyricHandler = new LyricHandler();

    constructor(){
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this._player = new Player(new PlayerController());
        store.subscribe(() => {
            this._playing = store.getState().spotifyPlayer.playing
        });
    }

    public init(): void {        
        document.body.appendChild(PixiApp.view);

        this._player.create();

        PixiApp.ticker.add((delta: number) => {
            if(!this._playing) return;
            this._lyricHandler.update(delta);
            this._player.update(delta);
            this.checkCollisions()
        });
    }

    private checkCollisions(): void {
        this._lyricHandler.lyrics.forEach((lyric) => {
            this._player._bullets.pool.forEach((bullet) => {
                if((!lyric._destroyed || !bullet._destroyed) && detectCollisions(bullet._entity, lyric._entity)){
                    lyric._destroyed = true;
                    bullet._destroyed = true;
                    PixiApp.stage.removeChild(bullet._entity, lyric._entity)
                }
            })
        });
    }
}