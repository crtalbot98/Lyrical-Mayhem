import { Text, TextMetrics, TextStyle } from "pixi.js";
import { SimpleVector2D } from "src/types";
import EntityMover from "../controllers/entityMover";
import { PixiApp } from "../main";
import { withinScreenBounds } from "../utils/collisions";
import Vector2D from "../vector2D";
import { Entity, MoveableEntity } from "./entity";

export default class Lyric implements MoveableEntity {

    private _fontStyles: TextStyle;
    _metrics: TextMetrics;
    _speed: number;
    _entity: Text;
    _destroyed: boolean;
    _direction: Vector2D;
    _entityMover: EntityMover;

    constructor() {
        this._speed = 2;
        this._entityMover = new EntityMover();
        this._fontStyles = new TextStyle({ 
            fontFamily : 'Arial', 
            fontSize: 24, 
            fill: 0xDAF7DC, 
            align : 'center'
        });
        this._entity = new Text('', this._fontStyles);
        this._direction = new Vector2D(0,1);
    }

    public create(text: string, position: SimpleVector2D): void {
        this._destroyed = false;
        this._metrics = TextMetrics.measureText(text, this._fontStyles);
        this._entity.text = text;
        this._entity.position.x = position.x;
        this._entity.position.y = position.y;
        PixiApp.stage.addChild(this._entity)
    }

    public update(delta: number): void {
        if(this._destroyed || !withinScreenBounds(this._entity)) {
            this._destroyed = true;
            PixiApp.stage.removeChild(this._entity)
        }
        else this._entityMover.move(this, delta)
    }
}