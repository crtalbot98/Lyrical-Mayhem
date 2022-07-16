import { Texture, Sprite } from "pixi.js";
import { SimpleVector2D } from "src/types";
import { withinScreenBounds } from "../utils/collisions";
import { PixiApp } from "../main";

export default class Bullet {

    _speed: number;
    _entity: Sprite;
    _destroyed: boolean;

    constructor(initialPosition: SimpleVector2D) {
        this._speed = 15;
        this._destroyed = false;
        this._entity = new Sprite(Texture.from('bullet.png'));
        this._entity.width = 20;
        this._entity.height = 20;
        this._entity.position.x = initialPosition.x;
        this._entity.position.y = initialPosition.y;
    }

    public create(): void{
        PixiApp.stage.addChild(this._entity);
    }

    public update(delta: number): void {
        if(this._destroyed || !withinScreenBounds(this._entity)) {
            PixiApp.stage.removeChild(this._entity);
            return
        }

        if(!withinScreenBounds(this._entity)) this._destroyed = true;
        else this._entity.position.y -= this._speed * delta
    }

    public reset(position: SimpleVector2D): void {
        this._destroyed = false;
        this._entity.position.x = position.x;
        this._entity.position.y = position.y;
    }
}