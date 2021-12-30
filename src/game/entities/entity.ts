import { Position, Size } from 'src/types';
import { genPosition } from '../../utils/positions';

export default abstract class Entity {
    protected _initialPosition: Position;
    protected _speed: number;
    protected _entity: any;
    public _color: number;
    public _size: Size;

    constructor(pos: Position, color: number, size: Size) {
        this._initialPosition = pos || genPosition();
        this._color = color || 0xff0000;
        this._size = size;
    }

    set position(pos: Position) {
        this._entity.position.set(pos.x, pos.y)
    }

    get entity(): Entity{
        return this._entity
    }
}