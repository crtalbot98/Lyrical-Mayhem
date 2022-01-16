import { Position } from "src/types";

export default class Vector2D {
    
    private _x: number;
    private _y: number;

    constructor(px: number, py: number) {
        this._x = px;
        this._y = py;
    }

    public magnitude(): number {
        const x = this._x;
        const y = this._y
        const len = x * x + y * y;

        if(len > 0){
            return Math.sqrt(len);
        }
    }

    public normalize(): void {
        const mag = this.magnitude();

        if(mag > 0){
           this._x /= mag;
           this._y /= mag
        }
    }

    public direction(): number {    
        return Math.atan2(this._x, this._y)
    }

    public multiplyByScalar(scalar: number): void {
        this._x *= scalar;
        this._y *= scalar
    }

    get points(): Position {
        return { x : this._x, y: this._y }
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    set x(px: number) {
        this._x = px
    }

    set y(py: number) {
        this._y = py
    }
}