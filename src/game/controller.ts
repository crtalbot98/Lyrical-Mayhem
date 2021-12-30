import { ControllerKeys, ControllerHandler } from "src/types";
import Player from "./entities/player";

export default class PlayerController {
    
    private _keys: ControllerKeys;
    private _gameSpeed: number;
    private _player: Player;

    constructor(speed: number) {
        this._gameSpeed = speed;

        this._player = new Player();
        this._player.create();

        this._keys = {
            'w': {
                pressed: false,
                func: () => {
                    this.moveUp()
                }
            },
            'a': {
                pressed: false,
                func: () => {
                    this.moveLeft()
                }
            },
            's': {
                pressed: false,
                func: () => {
                    this.moveDown()
                }
            },
            'd': {
                pressed: false,
                func: () => {
                    this.moveRight()
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

    private moveUp() {
        this._player.entity.position.y -= this._gameSpeed
    }

    private moveDown() {
        this._player.entity.position.y += this._gameSpeed
    }

    private moveLeft() {
        this._player.entity.position.x -= this._gameSpeed
    }

    private moveRight() {
        this._player.entity.position.x += this._gameSpeed
    }

    get keys(): ControllerKeys {
        return this._keys
    }

    get player(): Player {
        return this._player
    }

    public update(): void {
        this._player.update()

        for(const [key, value] of Object.entries(this._keys)) {
            if(value.pressed) this._keys[key].func()
        };
    }
}