import * as PIXI from 'pixi.js';
import Entity from './entity';
import Vector2D from '../vector2D';
import { Position } from 'src/types';

export default class Player extends Entity {

    protected _position: Vector2D;

    constructor(gameSpeed: number, initialPosition: Position) {
        super(initialPosition, 0x29A600, { h: 30, w: 50 });
    }

    public create(): void{
        this._entity = new PIXI.Graphics()
            .beginFill(this._color)
            .drawRect(this._initialPosition.x, this._initialPosition.y, this._size.w, this._size.h);
    
        this._entity.position.set(this._initialPosition.x, this._initialPosition.y);
        this._entity.pivot.set(this._entity.position.x + this._size.w / 2, this._entity.position.y + this._size.h / 2); 
    }
}