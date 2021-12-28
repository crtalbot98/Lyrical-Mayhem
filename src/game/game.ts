import * as PIXI from 'pixi.js';
import Player from './entities/player';

export default class Game {

    private _app: any;
    private _player: Player;

    constructor(){
        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0x1099bb
        });
        this._player = new Player;
    }

    public init(): void {
        document.body.appendChild(this._app.view);

        this._app.stage.addChild(this._player.init());

        this._player.allowMovement();

        this._app.ticker.add((delta: any) => {
            this.update()
        });
    }

    public update(): void {
        this._player.update()
    }
}