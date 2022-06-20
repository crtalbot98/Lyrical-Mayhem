import Entity from "./entity";
import { Text } from "pixi.js";
import { lyrics } from '../../types';

export default class Lyric extends Entity {

    private _fontStyles: {} = { fontFamily : 'Arial', fontSize: 24, fill : 0x00000, align : 'center' };
    private _speed: number = 2;
    private _text: string;

    constructor(text: string) {
        super({ x: window.innerWidth / 2, y: 100 }, 0xBBCC3D, { h: 50, w: 40 });
        this._speed = 2;
        this._text = text;
        this._entity = new Text(this._text, this._fontStyles)
    }

    public update(delta: number) {
        if(this._destroyed) return;

        this._entity.position.y += this._speed * delta;
    }

    public reset(text: string | lyrics): void {
        this._entity.text = text;
        this.initialPosition = { x: window.innerWidth / 2, y: 100 }
    }

    get text(): string {
        return this._text
    }
}