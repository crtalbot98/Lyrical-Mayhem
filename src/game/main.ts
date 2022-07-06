import * as PIXI from "pixi.js";
import Bullet from './entities/bullet';
import Lyric from './entities/lyric';
import Player from './entities/player';
import LyricHandler from './objectHandlers/lyricHandler';
import { detectCollisions } from './utils/collisions';
import PlayerController from "./playerController";
import { store } from '../stores/store';

export default class Game {

    private _app: PIXI.Application;
    private _player: Player;
    private _lyricHandler = new LyricHandler();

    constructor(){
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0x1F2C28
        });
        this._player = new Player(new PlayerController());
    }

    public init(): void {
        const stage = this._app.stage;
        
        document.body.appendChild(this._app.view);

        this._player.create(stage);

        this._app.ticker.add((delta: number) => {
            if(!store.getState().spotifyPlayer.playing) return;
            this._lyricHandler.update(stage, delta);
            this._player.update(delta, stage);
            // this.checkCollisions()
        });
    }

    // private checkCollisions(): void {
    //     this._lyricHandler.objects.forEach((lyric: Lyric) => {
    //         this._player.bullets.forEach((bullet: Bullet) => {
    //             if(lyric.destroyed && bullet.destroyed) return;

    //             if(detectCollisions(bullet.entity, lyric.entity)){
    //                 lyric.destroyed = true;
    //                 bullet.destroyed = true
    //             }
    //         })
    //     });
    // }

    get lyricHandler(): LyricHandler {
        return this._lyricHandler
    }
}