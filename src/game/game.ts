import * as PIXI from 'pixi.js';
import { InteractionEvent } from 'pixi.js';
import Bullet from './entities/bullet';
import Player from './entities/player';
import { spriteCenterPosition } from '../utils/positions';
export default class Game {

    private _app: any;
    private _player: Player;
    private _gameSpeed: number = 8;
    private _bullets: Bullet[] = [];

    constructor(){
        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0xE8E8E8
        });
        this._player = new Player(this._gameSpeed, { x: this._app.renderer.width / 2, y: this._app.renderer.height / 2 })
    }

    public init(): void {
        document.body.appendChild(this._app.view);

        this.initStageListeners();

        this._player.create();
        this._app.stage.addChild(this._player.entity);

        this._app.ticker.add((delta: number) => {
            this._player.update(delta);
            this._bullets.forEach((bullet: Bullet) => {
                bullet.update(delta)
            })
        });
    }

    private initStageListeners() {
        this._app.renderer.plugins.interactive = true;

        this._app.renderer.plugins.interaction.on('mouseup', (evt: InteractionEvent) => {
            const playerPosition = spriteCenterPosition(this._player.entity.position, this._player.size);
            const mousePosition = { x: Math.floor(evt.data.global.x), y: Math.floor(evt.data.global.y) };

            if(this._bullets.length <= 10){
                const bullet = new Bullet(playerPosition, mousePosition);
                bullet.create();

                this._app.stage.addChild(bullet.entity);
                this._bullets.push(bullet)
            }
            else {
                const firstDestroyedBullet = this._bullets.findIndex((elm: Bullet) => { return elm.destroyed });
                console.log(firstDestroyedBullet)

                if(firstDestroyedBullet !== -1) {
                    this._app.stage.removeChild(this._bullets[firstDestroyedBullet]);
                    this._bullets[firstDestroyedBullet].initialPosition = playerPosition;
                    this._bullets[firstDestroyedBullet].targetPosition = mousePosition
                }
            }
        })
    }
}