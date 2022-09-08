import { Entity, Moveable } from "../entities/entity";

export default class EntityMoveable {

  move(entity: (Entity & Moveable), delta: number): void {
    const dir = entity._direction.normalized;

    entity._entity.position.x += (dir.x * entity._speed) * delta;
    entity._entity.position.y += (dir.y * entity._speed) * delta
  }
}