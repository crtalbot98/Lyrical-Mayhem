import * as PIXI from "pixi.js";
import Bullet from './entities/bullet';
import Lyric from './entities/lyric';
import Player from './entities/player';
import LyricHandler from './lyricHandler';
import { detectCollisions } from '../utils/collisions';
import { appState } from "../stateHandler";
import Controller from "./controller";
export default class Game {

    private _app: PIXI.Application;
    private _player: Player;
    private _lyricHandler = new LyricHandler(null);
    private _controller: Controller;

    constructor(){
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0x737373
            
        });
        this._player = new Player({ 
            x: this._app.renderer.width / 2, 
            y: this._app.renderer.height / 2 
        });
        this._controller = new Controller(this._player)
    }

    public init(): void {
        const stage = this._app.stage;
        
        document.body.appendChild(this._app.view);

        this._player.create();

        this._lyricHandler.addLyric(stage);
        this._controller.initListeners(stage);

        stage.addChild(this._player.entity);

        this._app.ticker.add((delta: number) => {
            // if(appState.loading || appState.paused) return;

            this._controller.update(delta);
            this.checkCollisions(delta);
            this.updateAllProjectiles(delta)
        });
    }

    private checkCollisions(delta: number): void {
        this._lyricHandler.lyrics.forEach((lyric: Lyric) => {
            if(lyric.destroyed) this._app.stage.removeChild(lyric.entity);
            else lyric.update(delta);

            if(this._player.bullets.length >= 1) {
                this._player.bullets.forEach((bullet: Bullet) => {
                    if(detectCollisions(bullet.entity, lyric.entity)){
                        lyric.destroyed = true;
                        bullet.destroyed = true
                    }
                })
            }
        });
    }

    private updateAllProjectiles(delta: number) {
        this._player.bullets.forEach((bullet: Bullet) => {
            if(bullet.destroyed) this._app.stage.removeChild(bullet.entity);
            else bullet.update(delta);
        })
    }
}