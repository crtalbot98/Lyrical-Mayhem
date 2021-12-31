import { Graphics } from "pixi.js";
import { ControllerKeys, ControllerHandler } from "src/types";
import { increaseVelocityToMax } from "../utils/positions";
import Player from "./entities/player";

export default class PlayerController {
    
    private _keys: ControllerKeys;
    private _velocity: number = 1;
    private _acceleration: number = 0.20;
    private _maxVelocity: number = 8;

    constructor(gameSpeed: number) {
        this._keys = {
            'w': {
                pressed: false,
                func: (player: Graphics) => {
                    this._velocity = increaseVelocityToMax(this._velocity, this._acceleration, this._maxVelocity);
                    player.position.y -= this._velocity
                }
            },
            'a': {
                pressed: false,
                func: (player: Graphics) => {
                    this._velocity = increaseVelocityToMax(this._velocity, this._acceleration, this._maxVelocity);
                    player.position.x -= this._velocity
                }
            },
            's': {
                pressed: false,
                func: (player: Graphics) => {
                    this._velocity = increaseVelocityToMax(this._velocity, this._acceleration, this._maxVelocity);
                    player.position.y += this._velocity
                }
            },
            'd': {
                pressed: false,
                func: (player: Graphics) => {
                    this._velocity = increaseVelocityToMax(this._velocity, this._acceleration, this._maxVelocity);
                    player.position.x += this._velocity
                }
            }
        };
    }

    public initListeners(): void {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            evt.preventDefault();
            this._keys[evt.key].pressed = true;
        });

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            evt.preventDefault();
            this._keys[evt.key].pressed = false;
        })
    }

    public resetVelocity(): void {
        this._velocity = 1;
    }

    get keys(): ControllerKeys {
        return this._keys
    }
}