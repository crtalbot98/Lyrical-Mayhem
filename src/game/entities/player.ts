import { Texture, Sprite } from 'pixi.js';
import { Vector2D } from '../vector2D';
import Bullet from './bullet';
import PlayerController from '../controllers/playerController';
import ObjectPool from '../objectHandlers/objectPool';
import { PixiApp } from '../main';
import { Entity, Moveable, Health } from './entity';
import EntityMover from '../controllers/entityMoveable';
import EntityHealth from '../controllers/entityHealth';

export default class Player implements Entity, Moveable, Health {

  _entity: Sprite;
  _direction: Vector2D;
  _maxSpeed: number;
  _speed: number;
  _acceleration: number;
  _deceleration: number;
  _entityMover: EntityMover;
	_bullets: ObjectPool;
	private _controller: PlayerController;
  _health: EntityHealth;

  constructor(controller: PlayerController) {
    this._direction = new Vector2D();
    this._maxSpeed = 10;
    this._speed = 0;
    this._acceleration = 0.50;
    this._deceleration = 1;
    this._entityMover = new EntityMover();
    this._controller = controller;
		this._bullets = new ObjectPool(Bullet, 50);
    this._entity = new Sprite(Texture.from('player-ship.png'));
    this._entity.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this._entity.width = 55;
    this._entity.height = 55;
    this._entity.anchor.set(0.5);
    this._health = new EntityHealth(3);
	}

  public create(): void{
    PixiApp.stage.addChild(this._entity);
    this._controller.initListeners()
  }

  public update(delta: number): void {
    this._controller.update(this, delta);

    if(this._health.isDepleted()) this.reset();

    for(let i = 0; i < this._bullets.pool.length; i++) {
      const bullet = this._bullets.pool[i];
      if(bullet._destroyed) continue;
      bullet.update(delta);
    }
  }

	public reset(): void {
    this._health.resetHealth(3);

		this._entity.position.x = window.innerWidth / 2;
		this._entity.position.y = window.innerHeight / 2
	}
}