import { Sprite, Graphics, Text } from 'pixi.js';
import { Position, Size, Velocity } from 'src/types';
import { genPosition } from '../../utils/positions';

export default abstract class Entity {
    protected _initialPosition: Position;
    protected _velocity: number = 0;
    protected _entity: any;
    protected _color: number;
    protected _size: Size;
    protected _destroyed: boolean = false;

    constructor(pos: Position, color: number, size: Size) {
        this._initialPosition = pos || genPosition();
        this._color = color || 0xff0000;
        this._size = size;
    }

    set initialPosition(pos: Position) {
        this._initialPosition = pos
    }

    get entity(): any {
        return this._entity
    }

    get size(): Size {
        return this._size
    }

    get destroyed(): boolean{
        return this._destroyed
    }

    set destroyed(val: boolean) {
        this._destroyed = val
    }
}