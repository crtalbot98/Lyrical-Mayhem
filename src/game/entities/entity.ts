import { Sprite, Text } from "pixi.js";
import EntityMover from "../controllers/entityMoveable";
import EntityHealth from "../controllers/entityHealth";
import { Vector2D } from "../vector2D";

export interface Entity {
  _destroyed?: boolean
  _speed: number
  _entity: Sprite | Text
  update(delta: number): void
  create(...args: any[]): void
  reset?(...args: any[]): void
  destroy?(...args: any[]): void
}

export interface Moveable {
  _entityMover: EntityMover
  _direction?: Vector2D
}

export interface Health {
  _health: EntityHealth
}