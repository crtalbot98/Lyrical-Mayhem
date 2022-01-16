import Entity from "./entity";
import Vector2D from "../vector2D";
import { Text } from "pixi.js";

export default class Lyric extends Entity {

    private _dirVector: Vector2D = new Vector2D(0,0);
    private _fontStyles: {} = { fontFamily : 'Arial', fontSize: 24, fill : 0x00000, align : 'center' };

    constructor(text: string) {
        super({ x: window.innerWidth / 2, y: 100 }, 0xBBCC3D, { h: 50, w: 40 });
        this._velocity = 2;
        this._entity = new Text(text, this._fontStyles);
    }

    public update(delta: number) {
        if(this._destroyed) return;

        this._entity.position.y += this._velocity * delta;
    }

    public reset(text: string): void {
        this._entity.text = text;
        this.initialPosition = { x: window.innerWidth / 2, y: 100 }
    }
    
}