import * as PIXI from 'pixi.js';
import { Position, Velocity } from "src/types";
import Entity from "./entity";
import { angleBetweenTwoPoints, distanceBetweenTwoPoints } from '../../utils/positions';

export default class Bullet extends Entity {

    private _targetPosition: Position;
    private _angle: number;
    protected _velocity: number = 0;

    constructor(initialPosition: Position, targetPosition: Position) {
        super({ x: initialPosition.x, y: initialPosition.y }, 0xBBCC3D, { h: 6, w: 9 });
        this._targetPosition = targetPosition;
        this._velocity = 10
    }

    public create(): void{
        const bulletSprite = PIXI.Texture.from('bullet.png');
        this._entity = new PIXI.Sprite(bulletSprite);

        this._entity.width = this._size.w;
        this._entity.height = this._size.h;

        this._entity.anchor.set(0.5);

        this.setEntityData()
    }

    public update(delta: number) {
        if(this._destroyed) return;

        const distance = distanceBetweenTwoPoints(this._entity.position, this._targetPosition);
        this._entity.pivot.set(this._entity.position.x, this._entity.position.y);

        if (distance <= this._velocity) {
            this._destroyed = true
        }
        else {         
            this._entity.position.x += this._velocity * Math.cos(this._angle) * delta;
            this._entity.position.y += this._velocity * Math.sin(this._angle) * delta
        }
    }

    public reset(playerPosition: Position, mousePosition: Position): void {
        this._destroyed = false;
        this._initialPosition = playerPosition;
        this._targetPosition = mousePosition;

        this.setEntityData()
    }

    private setEntityData(): void {
        this._entity.position.x = this._initialPosition.x;
        this._entity.position.y = this._initialPosition.y;

        this._angle = (angleBetweenTwoPoints(this._initialPosition, this._targetPosition) * Math.PI) / 180;
        this._entity.rotation = this._angle
    }
}