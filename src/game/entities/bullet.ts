import * as PIXI from 'pixi.js';
import { Position } from "src/types";
import Entity from "./entity";
import { angleBetweenTwoPoints, distanceBetweenTwoPoints } from '../../utils/positions';

export default class Bullet extends Entity {

    private _targetPosition: Position;
    private _destroyed: boolean = false;
    private _angle: number;

    constructor(initialPosition: Position, targetPosition: Position) {
        super({ x: initialPosition.x, y: initialPosition.y }, 0xBBCC3D, { h: 6, w: 9 });
        this._targetPosition = targetPosition;
        this._velocity = 10;
        this._angle = (angleBetweenTwoPoints(this._initialPosition, this._targetPosition) * Math.PI) / 180
    }

    public create(): void{
        this._entity = new PIXI.Graphics()
            .beginFill(this._color)
            .drawRect(this._initialPosition.x, this._initialPosition.y, this._size.w, this._size.h);

        this._entity.position.set(this._initialPosition.x, this._initialPosition.y);
        this._entity.pivot.set(this._entity.position.x + this._size.w / 2, this._entity.position.y + this.size.h / 2)
        this._entity.rotation = this._angle
    }

    public update(delta: number) {
        if(this._destroyed) return;

        const distance = distanceBetweenTwoPoints(this._entity.position, this._targetPosition);

        if (distance <= this._velocity) {
            this._destroyed = true
        }
        else {         
            this._entity.position.x += this._velocity * Math.cos(this._angle) * delta;
            this._entity.position.y += this._velocity * Math.sin(this._angle) * delta
        }
    }

    set targetPosition(position: Position) {
        this._targetPosition = position
    }

    get destroyed(): boolean{
        return this._destroyed
    }
}