export interface Size {
    h: number;
    w: number;
  }

export function detectCollisions(a: any, b: any): boolean {
    const aBounds = a.getBounds();
    const bBounds = b.getBounds();

    return aBounds.x + aBounds.width > bBounds.x && aBounds.x < bBounds.x + bBounds.width && aBounds.y + aBounds.height > bBounds.y && aBounds.y < bBounds.y + bBounds.height
}

export function withinScreenBounds(a: any): boolean {
    const aBounds = a.getBounds();

    return (aBounds.x > 0 && aBounds.y > 0) && (aBounds.x + aBounds.width < window.innerWidth && aBounds.y + aBounds.height < window.innerHeight)
}