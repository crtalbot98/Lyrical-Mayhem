import { Texture, Sprite } from 'pixi.js';
import Entity from './entity';
import Vector2D from '../vector2D';
import { SimpleVector2D } from 'src/types';
import Controller from '../controller';
import { withinScreenBounds } from '../../utils/collisions';

export default class Player extends Entity {

    protected _position: Vector2D;
    private _controller: Controller;

    constructor(initialPosition: SimpleVector2D) {
        super(initialPosition, 0x29A600, { h: 67, w: 77 });
    }

    public create(): void{
        const playerShip = Texture.from('player-ship.png');

        this._entity = new Sprite(playerShip);
        this._controller = new Controller(this._entity);

        this._entity.position.set(this._initialPosition.x, this._initialPosition.y);
        this._entity.width = this._size.w;
        this._entity.height = this._size.h;
        this._entity.anchor.set(0.5);

        this._controller.initListeners()
    }

    public update(delta: number): void {
        if(!withinScreenBounds(this._entity)){
            this._entity.position.set(this._initialPosition.x, this._initialPosition.y);
            this._controller.resetSpeed()
        }

        this._controller.update(delta)
    }
}