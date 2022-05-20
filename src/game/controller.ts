import { Sprite } from "pixi.js";
import { ControllerKeys } from "src/types";
import Vector2D from "./vector2D";
import Bullet from "./entities/bullet";
import { withinScreenBounds } from "../utils/collisions";
import Player from "./entities/player";
import { debounce } from "../utils/time";

export default class Controller {
    
    private _keys: ControllerKeys;
    private _direction: Vector2D = new Vector2D(0,0);
    private _player: Player;
    private _maxSpeed: number = 15;
    private _speed: number = 0;
    private _acceleration: number = 0.9;
    private _deceleration: number = 0.95;

    constructor(entity: Player) {
        this._player = entity;
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
            },
            ' ': {
                pressed: false,
            }
        }
    }

    public update(delta: number, stage: any): void {
        const dir = this._direction.normalize;
        const nextPos = new Vector2D(dir.x, dir.y).normalize;

        if(this._keys[' '].pressed ) {
            debounce(function() {
                this.generateBulletFromPlayer(stage)
            }, 200, false);
        }

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed && key !== ' '){ 
                this._speed = Math.min(this._maxSpeed, this._speed += this._acceleration) * delta;
                this._keys[key]?.move();
            }
        };

        if(!withinScreenBounds(this._player.entity)) this.resetSpeed();

        this._player.entity.position.x += nextPos.x * this._speed * delta;
        this._player.entity.position.y += nextPos.y * this._speed * delta;
        this._speed *= this._deceleration * delta
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
                if(evt.key !== ' ') this._keys[evt.key]?.stop()
            }
        })
    }

    public generateBulletFromPlayer(stage: any): void {
        if(!this._keys[' '].pressed) return;

        const bullets = this._player.bullets;
        const playerPos = { x: this._player.entity.position.x, y: this._player.entity.position.y };
        const bullet = new Bullet(playerPos);

        bullet.create(stage);
        bullets.push(bullet)
    }
}