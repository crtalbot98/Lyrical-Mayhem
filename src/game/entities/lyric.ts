import Entity from "./entity";
import Vector2D from "../vector2D";
import { Text } from "pixi.js";
import * as PIXI from 'pixi.js';

export default class Lyric extends Entity {

    private _fontStyles: {} = { fontFamily : 'Arial', fontSize: 24, fill : 0x00000, align : 'center' };
    private _speed: number = 2;

    constructor(text: string) {
        super({ x: window.innerWidth / 2, y: 100 }, 0xBBCC3D, { h: 50, w: 40 });
        this._speed = 2;
        this._entity = new Text(text, this._fontStyles)
    }

    public update(delta: number) {
        if(this._destroyed) return;

        this._entity.position.y += this._speed * delta;
    }

    public reset(text: string): void {
        this._entity.text = text;
        this.initialPosition = { x: window.innerWidth / 2, y: 100 }
    }
    
}