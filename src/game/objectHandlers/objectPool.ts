import { Entity } from "../entities/entity";
import Lyric from '../entities/lyric';
import Bullet from '../entities/bullet';

type Constructor<T> = new () => T;

export default class ObjectPool{

  private _pool: (Entity | Lyric | Bullet)[];
  private _objectMax: number;
  private _objectType: Constructor<Entity>;

  constructor(type: Constructor<Entity>, objectMax: number = 50) {
    this._pool = [];
    this._objectMax = objectMax;
    this._objectType = type;
  }

  public empty() {
    this._pool = [];
  }

  get firstObject(): Entity {
    const firstDestroyedObj = this._pool.findIndex(elm => elm._destroyed);
    if(firstDestroyedObj !== -1) return this._pool[firstDestroyedObj];
    
    if(this._pool.length >= this._objectMax) return;
    const newPoolLength = this._pool.push(new this._objectType());
    return this._pool[newPoolLength-1]
  }

  get pool(): (Entity | Lyric | Bullet)[] {
    return this._pool
  }
}