export interface Point {
  x: number;
  y: number;
}

/**
 * Calculates Catmull-Rom spline points to form a smooth curve passing through all given points.
 * @param points Array of control points
 * @param segments Number of segments between each pair of points
 * @param closeCurve Whether to close the curve (connect last to first)
 * @param tension Curve tension (0 = straight lines, 1 = very curvy, 0.5 = default)
 * @returns Array of points forming the smooth curve
 */
export function getCatmullRomCurve(
  points: Point[], 
  segments: number = 20, 
  closeCurve: boolean = false, 
  tension: number = 0.5
): Point[] {
  if (points.length < 2) return [...points];
  
  const result: Point[] = [];
  const p = [...points];
  
  if (closeCurve) {
    // Add first point to end, and last point to start for closed curve interpolation
    p.unshift(points[points.length - 1]);
    p.push(points[0]);
    p.push(points[1]);
  } else {
    // Duplicate first and last points for open curve interpolation
    p.unshift(points[0]);
    p.push(points[points.length - 1]);
  }

  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2];

    for (let t = 0; t <= segments; t++) {
      // Don't add the last point of the segment if it's not the final segment
      // to avoid duplicate points, unless it's the very last point of the curve
      if (t === segments && i < p.length - 3) continue;

      const t1 = t / segments;
      const t2 = t1 * t1;
      const t3 = t2 * t1;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * tension * t1 +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tension * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tension * t3
      );

      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * tension * t1 +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tension * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tension * t3
      );

      result.push({ x, y });
    }
  }

  return result;
}
