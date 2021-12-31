import { Position } from "src/types";

export function genPosition(): Position {
    return {
        x: 0,
        y: 0
    }
}

export function calcYawFromPosition(p1: Position, p2: Position): number {
    const dx: number = p2.x = p1.x;
    const dy: number = p2.y - p1.y;

    return Math.atan2(dy, dx)
}

export function increaseVelocityToMax(velocity: number, acceleration: number, maxVelocity: number) {
    return velocity <= maxVelocity ? velocity += acceleration : maxVelocity
}