import * as PIXI from 'pixi.js';
import Entity from './entity';

export default class Player extends Entity {

    constructor() {
        super({ x: 200, y: 200 }, 0xff0000, { h: 50, w: 50 });
    }

    public init(): any{
        this._entity = new PIXI.Graphics()
            .beginFill(this._color)
            .drawRect(this._position.x, this._position.y, this._size.w, this._size.h);
        this._entity.interactive = true;
        
        return this._entity
    }

    public allowMovement(): void {
        const speed = this._speed;

        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            switch(evt.key) {
                case "a":
                    this._position.x -= speed;
                case "d":
                    this._position.x += speed;
                case "w":
                    this._position.y -= speed;
                case "s":
                    this._position.y += speed;
                default:
                    return
            }
        })
    }
}