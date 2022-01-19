import * as PIXI from 'pixi.js';
import { InteractionEvent } from 'pixi.js';
import Bullet from './entities/bullet';
import Lyric from './entities/lyric';
import Player from './entities/player';
import LyricHandler from './lyricHandler';
import { detectCollisions } from '../utils/collisions';
export default class Game {

    private _app: any;
    private _player: Player;
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
        const stage = this._app.stage;
        this._app.renderer.plugins.interactive = true;
        document.body.appendChild(this._app.view);

        this._lyricHandler.addLyric(stage);

        this.initStageListeners();

        this._player.create();
        stage.addChild(this._player.entity);

        this._app.ticker.add((delta: number) => {
            this._player.update(delta);

            this._lyricHandler.lyrics.forEach((lyric: Lyric) => {
                if(lyric.destroyed) stage.removeChild(lyric.entity);
                else lyric.update(delta);

                this._bullets.forEach((bullet: Bullet) => {
                    if(detectCollisions(bullet.entity, lyric.entity)){
                        lyric.destroyed = true;
                        bullet.destroyed = true
                    }
                })
            });

            this._bullets.forEach((bullet: Bullet) => {
                if(bullet.destroyed) stage.removeChild(bullet.entity);
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