/**@format */

export function convertVisibilityMetersToKm(
  visibilityMeters: number
): string {
  const visibilityKm = visibilityMeters / 1000;
  return `${visibilityKm.toFixed(0)}km`;
}
