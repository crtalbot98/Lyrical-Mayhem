import * as PIXI from 'pixi.js';
import Entity from './entity';
import { calcYawFromPosition } from '../../utils/positions';

export default class Player extends Entity {

    constructor() {
        super({ x: window.innerWidth/2, y: window.innerHeight/2 }, 0xff0000, { h: 50, w: 50 });
    }

    public create(): void{
        this._entity = new PIXI.Graphics()
            .beginFill(this._color)
            .drawRect(this._initialPosition.x, this._initialPosition.y, this._size.w, this._size.h);
        this._entity.position.set(this._initialPosition.x, this._initialPosition.y)
        this._entity.interactive = true;
        this.setPivotAndRot()
    }

    public update() {
        this.setPivotAndRot()
    }

    private setPivotAndRot() {
        const px = this._entity.position.x;
        const py = this._entity.position.y;
        
        this._entity.pivot.set(px + this._size.w / 2, py + this._size.h / 2); 
        this._entity.rotation += 0.05
    }

    get entity(): any {
        return this._entity
    }
}