import { Texture, Sprite } from "pixi.js";
import { withinScreenBounds } from "../utils/collisions";
import { PixiApp } from "../main";
import { Entity, Moveable } from "./entity";
import { SimpleVector2D, Vector2D } from "../vector2D";
import EntityMover from "../controllers/entityMoveable";

export default class Bullet implements Entity, Moveable {

    _speed: number;
    _entity: Sprite;
    _destroyed: boolean;
    _direction: Vector2D;
    _entityMover: EntityMover;

    constructor() {
        this._speed = 15;
        this._entity = new Sprite(Texture.from('bullet.png'));
        this._entity.width = 20;
        this._entity.height = 20;
        this._direction = new Vector2D(0, -1);
        this._entityMover = new EntityMover();
    }

    public create(initialPosition: SimpleVector2D): void{
        this._destroyed = false;
        this._entity.position.x = initialPosition.x;
        this._entity.position.y = initialPosition.y;
        PixiApp.stage.addChild(this._entity);
    }

    public update(delta: number): void {
        if(this._destroyed || !withinScreenBounds(this._entity)) {
            this._destroyed = true;
            PixiApp.stage.removeChild(this._entity);
        }
        else this._entityMover.move(this, delta)
    }
}