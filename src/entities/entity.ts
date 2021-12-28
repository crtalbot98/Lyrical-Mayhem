import { Position, Size } from 'src/types';
import { genPosition } from 'src/utils/positions';

export default abstract class Entity {
    private _position: Position;
    private _speed: Number;
    public _color: String;
    public _size: Size;

    constructor() {
        this._position = new genPosition();
        this._speed = 5;
        this._color = 'red'
        this._size = {
            h: 20,
            w: 25
        }
    }

    public set position(pos: Position) {
        this._position = pos
    }

    public set speed(newSpeed: Number) {
        this._speed = newSpeed
    }

    public get position(): Position {
        return this._position
    }

    public get speed(): Number {
        return this._speed
    }
}