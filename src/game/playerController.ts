import { ControllerKeys } from "src/types";
import Player from "./entities/player";

export default class PlayerController{
    
  private _keys: ControllerKeys;

  constructor() {
    this._keys = {
      'w': {
        pressed: false,
        move: (p: Player) => {
          p._direction.y -= 1
        },
        stop: (p: Player) => {
          p._direction.y = 0
        }
      },
      'a': {
        pressed: false,
        move: (p: Player) => {
          p._direction.x -= 1
        },
        stop: (p: Player) => {
          p._direction.x = 0
        }
      },
      's': {
        pressed: false,
        move: (p: Player) => {
          p._direction.y += 1
        },
        stop: (p: Player) => {
          p._direction.y = 0
        }
      },
      'd': {
        pressed: false,
        move: (p: Player) => {
          p._direction.x += 1
        },
        stop: (p: Player) => {
          p._direction.x = 0
        }
      }
    }
  }

  public update(player: Player, delta: number): void {
    const dir = player._direction.normalized;

    for(const [key, value] of Object.entries(this._keys)) {
      if(value.pressed){
        if(dir.x !== 0 || dir.y !== 0) {
          player._speed = Math.min(player._maxSpeed, player._speed * delta)
        }
        else if(dir.x === 0 && dir.y === 0) {
          player._speed = Math.max(0, player._speed * delta)
        }
        console.log(player._speed)
        this._keys[key].move(player)
      }
    };

    player._entity.position.x += dir.x * player._speed * delta;
    player._entity.position.y += dir.y * player._speed * delta
  }

  public initListeners(): void {
    document.addEventListener('keydown', (evt: KeyboardEvent) => {
      evt.preventDefault();
      if(this._keys[evt.key]){
        this._keys[evt.key].pressed = true
      }
    });

    document.addEventListener('keyup', (evt: KeyboardEvent) => {
      evt.preventDefault();
      if(this._keys[evt.key]){
        this._keys[evt.key].pressed = false;
      }
    })
  }

  // public generateBulletFromPlayer(stage: any): void {
  //   const bullets = this._player.bullets;
  //   const playerPos = { x: this._player.entity.position.x, y: this._player.entity.position.y };
  //   const bullet = new Bullet(playerPos);
  //   bullet.create(stage);
  //   bullets.push(bullet)
  // }
}