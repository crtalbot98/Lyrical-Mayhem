import { SimpleVector2D, Size } from "src/types";

export function genPosition(): SimpleVector2D {
    return {
        x: 0,
        y: 0
    }
}

export function angleBetweenTwoPoints(p1: SimpleVector2D, p2: SimpleVector2D): number {
    const dx: number = p2.x - p1.x;
    const dy: number = p2.y - p1.y;

    return (Math.atan2(dy, dx) * 180) / Math.PI
}

export function distanceBetweenTwoPoints(p1: SimpleVector2D, p2: SimpleVector2D): number {
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

export function spriteCenterPosition(position: SimpleVector2D, size: Size): SimpleVector2D {
    return {
        x: position.x + size.w / 2,
        y: position.y + size.h / 2
    }
}