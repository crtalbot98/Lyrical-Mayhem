import * as PIXI from 'pixi.js';
import PlayerController from './controller';
export default class Game {

    private _app: any;
    private _Controller: PlayerController;
    private _gameSpeed: number = 8;

    constructor(){
        this._app = new PIXI.Application({ 
            resizeTo: window,
            backgroundColor: 0x1099bb
        });
        this._Controller = new PlayerController(this._gameSpeed);
    }

    public init(): void {
        document.body.appendChild(this._app.view);

        this._Controller.initListeners();

        this._app.stage.addChild(this._Controller.player.entity);

        this._app.ticker.add((delta: any) => {
            this.update()
        });
    }

    public update(): void {
        this._Controller.update();
    }
}