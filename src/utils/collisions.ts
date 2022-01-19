export function detectCollisions(a: any, b: any): boolean {
    const aBounds = a.getBounds();
    const bBounds = b.getBounds();

    return aBounds.x + aBounds.width > bBounds.x && aBounds.x < bBounds.x + bBounds.width && aBounds.y + aBounds.height > bBounds.y && aBounds.y < bBounds.y + bBounds.height
}