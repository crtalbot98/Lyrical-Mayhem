import * as PIXI from 'pixi.js';
import { Position, Size } from 'src/types';
import { genPosition } from '../../utils/positions';

export default abstract class Entity {
    protected _position: Position;
    protected _speed: number;
    protected _entity: any;
    public _color: number;
    public _size: Size;

    constructor(pos: Position, color: number, size: Size) {
        this._position = pos || genPosition();
        this._speed = 5;
        this._color = color || 0xff0000;
        this._size = size;
    }

    public update(): void {
        this._entity.position.set(this._position.x, this._position.y);
    }

    set position(pos: Position) {
        this._position = pos
    }

    set speed(newSpeed: number) {
        this._speed = newSpeed
    }

    get entity(){
        return this._entity
    }
}