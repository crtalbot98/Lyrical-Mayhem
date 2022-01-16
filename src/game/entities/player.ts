import * as PIXI from 'pixi.js';
import Entity from './entity';
import Vector2D from '../vector2D';
import { Position } from 'src/types';
import Controller from '../controller';

export default class Player extends Entity {

    protected _position: Vector2D;
    private _controller = new Controller();

    constructor(initialPosition: Position) {
        super(initialPosition, 0x29A600, { h: 97, w: 107 });
    }

    public create(): void{
        const playerShip = PIXI.Texture.from('player-ship.png');
        this._entity = new PIXI.Sprite(playerShip);

        this._entity.position.x = this._initialPosition.x;
        this._entity.position.y = this._initialPosition.y;

        this._entity.width = this._size.w;
        this._entity.height = this._size.h;

        this._entity.anchor.set(0.5);
        this._entity.position.set(this._initialPosition.x, this._initialPosition.y);

        this._controller.initListeners();
    }

    public update(delta: number): void {
        this._controller.update(this._entity, delta)
    }
}