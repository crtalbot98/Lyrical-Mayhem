import { Sprite } from "pixi.js";
import { ControllerKeys } from "src/types";
import Vector2D from "./vector2D";

export default class Controller {
    
    private _keys: ControllerKeys;
    private _direction: Vector2D = new Vector2D(0,0);
    private _playerEntity: Sprite;
    private _maxSpeed: number = 15;
    private _speed: number = 0;
    private _acceleration: number = 0.9;
    private _deceleration: number = 0.95;

    constructor(entity: Sprite) {
        this._playerEntity = entity;
        this._keys = {
            'w': {
                pressed: false,
                move: () => {
                    this._direction.y -= 1
                },
                stop: () => {
                    this._direction.y = 0
                }
            },
            'a': {
                pressed: false,
                move: () => {
                    this._direction.x -= 1
                },
                stop: () => {
                    this._direction.x = 0
                }
            },
            's': {
                pressed: false,
                move: () => {
                    this._direction.y += 1
                },
                stop: () => {
                    this._direction.y = 0
                }
            },
            'd': {
                pressed: false,
                move: () => {
                    this._direction.x += 1
                },
                stop: () => {
                    this._direction.x = 0
                }
            }
        }
    }

    public update(delta: number): void {
        const dir = this._direction.normalize;
        const nextPos = new Vector2D(dir.x, dir.y).normalize;

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed){ 
                this._speed = Math.min(this._maxSpeed, this._speed += this._acceleration) * delta;
                this._keys[key].move();
            }
        };

        this._playerEntity.position.x += nextPos.x * this._speed * delta;
        this._playerEntity.position.y += nextPos.y * this._speed * delta;

        this._speed *= this._deceleration * delta;
    }

    public resetSpeed(): void {
        this._speed = 0
    }

    public initListeners(): void {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]) this._keys[evt.key].pressed = true
        });

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]){
                this._keys[evt.key].pressed = false;
                this._keys[evt.key].stop()
            }
        })
    }
}