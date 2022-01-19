import { Sprite } from "pixi.js";
import { ControllerKeys } from "src/types";
import Vector2D from "./vector2D";

export default class Controller {
    
    private _keys: ControllerKeys;
    private _direction: Vector2D = new Vector2D(0,0);
    private _playerEntity: Sprite;
    private _maxSpeed: number = 8;
    private _speed: number = 0;
    private _acceleration: number = 1;
    private _deceleration: number = 0.91;
    private _movementCutoff: number = 0.5;

    constructor(entity: Sprite) {
        this._playerEntity = entity;
        this._keys = {
            'w': {
                pressed: false,
                func: () => {
                    this._direction.y -= 1
                }
            },
            'a': {
                pressed: false,
                func: () => {
                    this._direction.x -= 1
                }
            },
            's': {
                pressed: false,
                func: () => {
                    this._direction.y += 1
                }
            },
            'd': {
                pressed: false,
                func: () => {
                    this._direction.x += 1
                }
            }
        }
    }

    public update(delta: number): void {
        const dir = this._direction.normalize;
        const nextPos = new Vector2D(dir.x, dir.y).normalize;
        let keysPressed = false;

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed){ 
                this._speed = Math.min(this._maxSpeed, this._speed += this._acceleration) * delta;
                this._keys[key].func();
                keysPressed = true
            }
        };

        // Reset the direction the character is moving, if nothing is pressed and speed is low enough
        if(!keysPressed && this._speed < this._movementCutoff){
            this._direction.x = 0;
            this._direction.y = 0
        }

        this._playerEntity.position.x += nextPos.x * this._speed * delta;
        this._playerEntity.position.y += nextPos.y * this._speed * delta;

        this._speed *= this._deceleration * delta;
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