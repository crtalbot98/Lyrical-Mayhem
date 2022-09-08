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
    private _lyricHandler: LyricHandler;

    constructor(){
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this._player = new Player(new PlayerController());
        this._lyricHandler = new LyricHandler();
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

    public destroyStage(): void {
        PixiApp.destroy(true);
        PixiApp.stage = null
    }

    private checkCollisions(): void {
        for(let i = 0; i < this._lyricHandler.lyrics.length; i++) {
            const lyric = this._lyricHandler.lyrics[i];

            if(lyric._destroyed) continue;

            for(let j = 0; j < this._player._bullets.pool.length; j++) {
                const bullet = this._player._bullets.pool[j];

                if(bullet._destroyed) continue;

                if(detectCollisions(bullet._entity, lyric._entity)){
                    lyric._health.decrement();
                    bullet._destroyed = true;
                    PixiApp.stage.removeChild(bullet._entity)
                }
            }

            if(detectCollisions(this._player._entity, lyric._entity)) {
                lyric._destroyed = true;
                this._player._health.decrement();
                PixiApp.stage.removeChild(lyric._entity);
            }
        }
    }
}