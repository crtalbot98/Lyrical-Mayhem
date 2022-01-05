import * as PIXI from 'pixi.js';
import Entity from './entity';
import PlayerController from '../controller';
import { angleBetweenTwoPoints, accelerateToMax } from '../../utils/positions';
import { Position } from 'src/types';

export default class Player extends Entity {

    private _controller: PlayerController;
    private _acceleration: number = 0.5;
    private _deceleration: number = 0.25;
    private _maxVelocity: number = 8;

    constructor(gameSpeed: number, initialPosition: Position) {
        super(initialPosition, 0x29A600, { h: 50, w: 50 });
        this._controller = new PlayerController()
    }

    public create(): void{
        this._entity = new PIXI.Graphics()
            .beginFill(this._color)
            .drawRect(this._initialPosition.x, this._initialPosition.y, this._size.w, this._size.h);
        
        this._entity.position.set(this._initialPosition.x, this._initialPosition.y);
        this.setPivotAndRot();
        this._controller.initListeners()
    }

    public update(delta: number): void {
        let keysPressed = false;

        for(const [key, value] of Object.entries(this._controller.keys)) {
            if(value.pressed){
                this._velocity = accelerateToMax(this._velocity, this._acceleration, this._maxVelocity);
                this._controller.keys[key].func(this._entity, this._velocity, delta);
                keysPressed = true
            }
            // console.log(this._entity.position)
        };

        if(!keysPressed) this.decelerate(delta)

        // this.setPivotAndRot()
    }

    private setPivotAndRot(): void {
        const px = this._entity.position.x;
        const py = this._entity.position.y;

        this._entity.pivot.set(px, py); 
        // this._entity.angle += angleBetweenTwoPoints(this._entity.position, { x: window.innerWidth / 2, y: 0 })
    }

    public decelerate(delta: number): void {
        this._velocity = this._velocity >= 0 ? this._velocity -= this._deceleration * delta : 1;
    }
}