import { Texture, Sprite } from "pixi.js";
import { SimpleVector2D } from "src/types";
import Entity from "./entity";
import { angleBetweenTwoPoints, distanceBetweenTwoPoints } from "../utils/positions";
import { withinScreenBounds } from "../utils/collisions";

export default class Bullet extends Entity {

    protected _velocity: number = 0;

    constructor(initialPosition: SimpleVector2D) {
        super({ x: initialPosition.x, y: initialPosition.y }, 0xBBCC3D, { h: 6, w: 9 });
        this._velocity = 10
    }

    public create(stage: any): void{
        const bulletSprite = Texture.from('bullet.png');
        this._entity = new Sprite(bulletSprite);

        this._entity.width = this._size.w;
        this._entity.height = this._size.h;

        // this._entity.anchor.set(0.5);

        this.setEntityData();
        stage.addChild(this._entity);

    }

    public update(delta: number) {
        if(this._destroyed) return;
        if(!withinScreenBounds(this._entity)) this._destroyed = true;

        this._entity.position.y -= this._velocity * delta
    }

    public reset(playerPosition: SimpleVector2D): void {
        this._destroyed = false;
        this._initialPosition = playerPosition;

        this.setEntityData()
    }

    private setEntityData(): void {
        this._entity.position.x = this._initialPosition.x;
        this._entity.position.y = this._initialPosition.y;

        // this._angle = (angleBetweenTwoPoints(this._initialPosition, this._targetPosition) * Math.PI) / 180;
        // this._entity.rotation = this._angle
    }
}