import { Text } from "pixi.js";
import { SimpleVector2D } from "src/types";
import { PixiApp } from "../main";
import { withinScreenBounds } from "../utils/collisions";

export default class Lyric {

    private _fontStyles: {} = { fontFamily : 'Arial', fontSize: 24, fill : 0xDAF7DC, align : 'center' };
    private _speed: number;
    _text: string;
    _entity: Text;
    _destroyed: boolean;

    constructor(text: string, position: SimpleVector2D) {
        this._destroyed = false;
        this._speed = 2;
        this._text = text;
        this._entity = new Text(this._text, this._fontStyles)
        this._entity.position.x = position.x;
        this._entity.position.y = position.y
    }

    public create(): void {
        PixiApp.stage.addChild(this._entity)
    }

    public update(delta: number): void {
        if(this._destroyed) {
            PixiApp.stage.removeChild(this._entity);
            return
        }

        if(!withinScreenBounds(this._entity)) this._destroyed = true;
        this._entity.position.y += this._speed * delta;
    }

    public reset(position: SimpleVector2D): void {
        this._destroyed = false;
        this._entity.position.x = position.x;
        this._entity.position.y = position.y
    }
}