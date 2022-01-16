import { Sprite } from "pixi.js";
import { ControllerKeys } from "src/types";
import Vector2D from "./vector2D";

export default class Controller {
    
    private _keys: ControllerKeys;
    private _maxVelocity: number = 8;
    private _deceleration: number = 0.93;
    protected _velocity: number = 0;
    private _acceleration: number = 1;
    private _dirVector: Vector2D = new Vector2D(0,0);

    constructor() {
        this._keys = {
            'w': {
                pressed: false,
                func: () => {
                    this._dirVector.y -= 1
                }
            },
            'a': {
                pressed: false,
                func: () => {
                    this._dirVector.x -= 1
                }
            },
            's': {
                pressed: false,
                func: () => {
                    this._dirVector.y += 1
                }
            },
            'd': {
                pressed: false,
                func: () => {
                    this._dirVector.x += 1
                }
            }
        }
    }

    public update(entity: Sprite, delta: number): void {
        this._dirVector.normalize();

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed){ 
                this._velocity = Math.min(this._maxVelocity, this._velocity += this._acceleration) * delta;
                this._keys[key].func();
            }
        };

        const angle = this._dirVector.direction();
        entity.position.x += (this._velocity * Math.sin(angle)) * delta;
        entity.position.y += (this._velocity * Math.cos(angle)) * delta;

        this._velocity *= this._deceleration * delta

        // entity.rotation = angle;
    }

    public initListeners(): void {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]) this._keys[evt.key].pressed = true
        });

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]) this._keys[evt.key].pressed = false
        })
    }
}