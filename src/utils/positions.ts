import { Position, Size } from "src/types";

export function genPosition(): Position {
    return {
        x: 0,
        y: 0
    }
}

export function angleBetweenTwoPoints(p1: Position, p2: Position): number {
    const dx: number = p2.x - p1.x;
    const dy: number = p2.y - p1.y;

    return (Math.atan2(dy, dx) * 180) / Math.PI
}

export function distanceBetweenTwoPoints(p1: Position, p2: Position): number {
    const dx: number = p2.x - p1.x;
    const dy: number = p2.y - p1.y;

    return Math.sqrt(dx * dx + dy * dy)
}

export function accelerateToMax(velocity: number, acceleration: number, maxVelocity: number, delta: number): number {
    return velocity <= maxVelocity ? velocity += acceleration * delta : maxVelocity
}

export function decelerateToZero(velocity: number, deceleration: number, delta: number): number {
    return velocity >= 0 ? velocity *= deceleration * delta : 0
}

export function spriteCenterPosition(position: Position, size: Size): Position {
    return {
        x: position.x + size.w / 2,
        y: position.y + size.h / 2
    }
}