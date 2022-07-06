import { Texture, Sprite } from 'pixi.js';
import Vector2D from '../vector2D';
import Bullet from './bullet';
import PlayerController from '../playerController';
import ObjectPool from '../objectHandlers/objectPool';

export default class Player {

  _entity: Sprite;
  _direction: Vector2D;
  _maxSpeed: number;
  _speed: number;
	private _bullets: Bullet[];
	private _objectPool: ObjectPool;
	private _controller: PlayerController;

  constructor(controller: PlayerController) {
    this._direction = new Vector2D();
    this._maxSpeed = 10;
    this._speed = 0;
    this._controller = controller;
		this._objectPool = new ObjectPool();
		this._bullets = [];
    this._entity = new Sprite(Texture.from('player-ship.png'));
    this._entity.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this._entity.width = 55;
    this._entity.height = 55;
    this._entity.anchor.set(0.5)
	}

  public create(stage: any): void{
    stage.addChild(this._entity);
    this._controller.initListeners()
  }

  public update(delta: number, stage: any): void {
    this._controller.update(this, delta);
		const nextBullet = this._objectPool.object;

		// if(!nextBullet) {
		// 	const nextBulletSprite = new Bullet(this._entity.position);
		// 	this._bullets.push(nextBulletSprite);
		// 	stage.addChild(nextBulletSprite._entity)
		// }
		// else {
		// 	nextBullet.reset(this._entity.position)
		// }

		if(this._bullets.length < 1) return;

    this._bullets.forEach((bullet, index) => {
      if(bullet._destroyed) {
				this._objectPool.addToPool(bullet);
				this._bullets.splice(index, 1)
			}
      else {
				bullet.update(delta, stage)
			}
    })
  }

	reset(): void {
		this._entity.position.x = window.innerWidth / 2;
		this._entity.position.y = window.innerHeight / 2
	}
}