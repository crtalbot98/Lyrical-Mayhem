import { ControllerKeys } from "src/types";
import Vector2D from "./vector2D";
import Bullet from "./entities/bullet";
import { withinScreenBounds } from "./utils/collisions";
import { lerp } from "./utils/positions";
import Player from "./entities/player";
import { debounce } from "./utils/time";

export default class Controller {
    
    private _keys: ControllerKeys;
    private _direction: Vector2D = new Vector2D();
    private _player: Player;
    private _maxSpeed: number = 10;
    private _speed: number = 0;
    private _force: number = 0.75;

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
            }
        }
    }

    public update(delta: number): void {
        const dir = this._direction.normalized;

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed){
                if(dir.x !== 0 || dir.y !== 0) {
                    this._speed = Math.min(this._maxSpeed, this._speed + this._force * delta)
                }
                else if(dir.x === 0 && dir.y === 0) {
                    this._speed = Math.max(0, this._speed - this._force * delta)
                }

                this._keys[key].move()
            }
        };

        this._player.entity.position.x += dir.x * delta * this._speed;
        this._player.entity.position.y += dir.y * delta * this._speed;
    }

    public resetSpeed(): void {
        this._speed = 0
    }

    public initListeners(stage: any): void {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(evt.key === ' ') {
                this.generateBulletFromPlayer(stage)
            }
            else if(this._keys[evt.key]){
                this._keys[evt.key].pressed = true
            }
        });

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]){
                this._keys[evt.key].pressed = false;
                this._keys[evt.key].stop()
            }
        })
    }

    public generateBulletFromPlayer(stage: any): void {
        const bullets = this._player.bullets;
        const playerPos = { x: this._player.entity.position.x, y: this._player.entity.position.y };
        const bullet = new Bullet(playerPos);

        bullet.create(stage);
        bullets.push(bullet)
    }
}