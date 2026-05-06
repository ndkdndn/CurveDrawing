import type { Point } from './interpolation';

/**
 * Calculates the Euclidean distance between two points.
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks if a point is inside a circle.
 * @param point The point to check
 * @param center The center of the circle
 * @param radius The radius of the circle
 * @returns true if point is inside or on the circle
 */
export function isPointInCircle(point: Point, center: Point, radius: number): boolean {
  return distance(point, center) <= radius;
}

/**
 * Finds the index of the first vertex that collides with the given point.
 * @param point The point to check (e.g., mouse click)
 * @param vertices Array of vertices
 * @param radius Collision radius
 * @returns Index of the collided vertex, or -1 if no collision
 */
export function findCollidingVertex(point: Point, vertices: Point[], radius: number = 8): number {
  // Search backwards so that visually top elements are selected first if they overlap
  for (let i = vertices.length - 1; i >= 0; i--) {
    if (isPointInCircle(point, vertices[i], radius)) {
      return i;
    }
  }
  return -1;
}
