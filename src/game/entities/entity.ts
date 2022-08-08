import { Sprite, Text } from "pixi.js";
import EntityMover from "../controllers/entityMover";
import Vector2D from "../vector2D";

export interface Entity {
  _destroyed?: boolean
  _speed: number
  _entity: Sprite | Text
  _direction?: Vector2D
  update(delta: number): void
  create(...args: any[]): void
  reset?(...args: any[]): void
}

export interface MoveableEntity extends Entity{
  _entityMover: EntityMover
}