import { Graphics } from "pixi.js";
import { ControllerKeys, ControllerHandler } from "src/types";
import { accelerateToMax } from "../utils/positions";
import Player from "./entities/player";

export default class PlayerController {
    
    private _keys: ControllerKeys;

    constructor() {
        this._keys = {
            'w': {
                pressed: false,
                func: (player: Graphics, velocity: number, delta: number) => {
                    player.position.y -= velocity * delta
                }
            },
            'a': {
                pressed: false,
                func: (player: Graphics, velocity: number, delta: number) => {
                    player.position.x -= velocity * delta
                }
            },
            's': {
                pressed: false,
                func: (player: Graphics, velocity: number, delta: number) => {
                    player.position.y += velocity * delta
                }
            },
            'd': {
                pressed: false,
                func: (player: Graphics, velocity: number, delta: number) => {
                    player.position.x += velocity * delta
                }
            }
        };
    }

    public initListeners(): void {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]) this._keys[evt.key].pressed = true;
        });

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            evt.preventDefault();
            if(this._keys[evt.key]) this._keys[evt.key].pressed = false;
        })
    }

    get keys(): ControllerKeys {
        return this._keys
    }
}