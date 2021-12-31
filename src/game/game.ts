import * as PIXI from 'pixi.js';
import PlayerController from './controller';
import Player from './entities/player';
export default class Game {

    private _app: any;
    private _player: Player;
    private _gameSpeed: number = 8;

    constructor(){
        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0x1099bb
        });
        this._player = new Player(this._gameSpeed);
    }

    public init(): void {
        document.body.appendChild(this._app.view);

        this._player.create();

        this._app.stage.addChild(this._player.entity);

        this._app.ticker.add((delta: any) => {
            this.update()
        });
    }

    public update(): void {
        this._player.update();
    }
}