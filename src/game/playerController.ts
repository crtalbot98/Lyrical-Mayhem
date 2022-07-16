import Player from "./entities/player";
import Bullet from "./entities/bullet";
import { PixiApp } from "./main";
import { debounce } from "./utils/time";

export type ControllerKeys = {
  [key: string]: ControllerHandler
}

export type ControllerHandler = {
  pressed: boolean,
  evt: Function
}

export default class PlayerController{
    
  private _keys: ControllerKeys;

  constructor() {
    const debouncedEmitBullet = debounce(this.emitBullet, 10, true)
    this._keys = {
      'w': {
        pressed: false,
        evt: (p: Player) => {
          p._direction.y -= 1
        }
      },
      'a': {
        pressed: false,
        evt: (p: Player) => {
          p._direction.x -= 1
        }
      },
      's': {
        pressed: false,
        evt: (p: Player) => {
          p._direction.y += 1
        }
      },
      'd': {
        pressed: false,
        evt: (p: Player) => {
          p._direction.x += 1
        }
      },
      ' ': {
        pressed: false,
        evt: debouncedEmitBullet
      }
    }
  }

  public update(player: Player, delta: number): void {
    let movementKeyPressed = false;
    for(const [key, value] of Object.entries(this._keys)) {
      if(value.pressed)  {
        this._keys[key].evt(player);

        if(key === ' ') continue;
        movementKeyPressed = true
      }
    }

    const dir = player._direction.normalized;
    
    if(dir.x !== 0 || dir.y !== 0) {
      player._speed = Math.min(player._maxSpeed, player._speed + (player._acceleration * delta))
    }
    if(!movementKeyPressed) {
      player._speed = Math.max(0, player._speed - (player._deceleration * delta));
    }
    if(player._speed <= 0) player._direction.reset();

    player._entity.position.x += (dir.x * player._speed) * delta;
    player._entity.position.y += (dir.y * player._speed) * delta
  }

  public initListeners(): void {
    document.addEventListener('keydown', (evt: KeyboardEvent) => {
      evt.preventDefault();
      if(this._keys[evt.key])this._keys[evt.key].pressed = true
    });

    document.addEventListener('keyup', (evt: KeyboardEvent) => {
      evt.preventDefault();
      if(this._keys[evt.key]) this._keys[evt.key].pressed = false
    })
  }

  private emitBullet(player: Player) {
    const nextBullet = player.bulletPool.object;
    const playerPos = player._entity.position;

    if(!nextBullet) {
      const nextBulletSprite = new Bullet(playerPos);
      nextBulletSprite.create();
      player._bullets.push(nextBulletSprite)
    }
    else {
      nextBullet.reset(playerPos)
    }  
  }
}