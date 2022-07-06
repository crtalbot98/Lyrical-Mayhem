import { GenericObject } from "src/types";

export default class ObjectPool{

  private _pool: GenericObject[];
  private _objectMax: number;

  constructor(objectMax: number = 50) {
    this._pool = [];
    this._objectMax = objectMax
  }

  public addToPool(obj: GenericObject): GenericObject {
    if(this._pool.length > this._objectMax) return;

    this._pool.push(obj);
    return this._pool[this._pool.length-1];
  }

  get object(): GenericObject | null {
    return this._pool.pop() || null;
  }

  get pool(): GenericObject[] {
    return this._pool
  }
}