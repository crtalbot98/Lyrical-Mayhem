import * as PIXI from 'pixi.js';
import { InteractionEvent } from 'pixi.js';
import Bullet from './entities/bullet';
import Player from './entities/player';
import Controller from './controller';
import { spriteCenterPosition } from '../utils/positions';
import LyricHandler from './lyricHandler';
export default class Game {

    private _app: any;
    private _player: Player;
    private _gameSpeed: number = 8;
    private _bullets: Bullet[] = [];
    private _lyricHandler = new LyricHandler(null);

    constructor(){
        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0xE8E8E8
        });
        this._player = new Player({ x: this._app.renderer.width / 2, y: this._app.renderer.height / 2 })
    }

    public init(): void {
        this._app.renderer.plugins.interactive = true;
        
        document.body.appendChild(this._app.view);

        this.initStageListeners();

        this._player.create();
        this._app.stage.addChild(this._player.entity);

        this._app.ticker.add((delta: number) => {
            this._player.update(delta);

            this._bullets.forEach((bullet: Bullet) => {
                if(bullet.destroyed) this._app.stage.removeChild(bullet.entity)
                else bullet.update(delta)
            })
        });
    }

    private initStageListeners() {
        this._app.renderer.plugins.interaction.on('mouseup', (evt: InteractionEvent) => {
            const mousePosition = { 
                x: Math.floor(evt.data.global.x), 
                y: Math.floor(evt.data.global.y) 
            };

            if(this._bullets.length <= 10){
                const bullet = new Bullet(this._player.entity.position, mousePosition);

                bullet.create();
                this._app.stage.addChild(bullet.entity);
                this._bullets.push(bullet)
            }
            else {
                const firstDestroyedBullet = this._bullets.findIndex((elm: Bullet) => { return elm.destroyed });

                if(firstDestroyedBullet !== -1) {
                    const destroyedBullet = this._bullets[firstDestroyedBullet];

                    destroyedBullet.reset(this._player.entity.position, mousePosition);
                    this._app.stage.addChild(destroyedBullet.entity)
                }
            }
        })
    }
}