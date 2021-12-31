import { Sprite, Graphics, Text } from 'pixi.js';
import { Position, Size } from 'src/types';
import { genPosition } from '../../utils/positions';

export default abstract class Entity {
    protected _initialPosition: Position;
    protected _speed: number;
    protected _entity: any;
    public _color: number;
    public _size: Size;

    constructor(pos: Position, color: number, size: Size, speed: number) {
        this._initialPosition = pos || genPosition();
        this._color = color || 0xff0000;
        this._size = size;
        this._speed = speed
    }

    set position(pos: Position) {
        this._entity.position.set(pos.x, pos.y)
    }

    get entity(): any {
        return this._entity
    }
}