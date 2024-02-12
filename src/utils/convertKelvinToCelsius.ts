/**@format */

export default function kelvinToCelsius(kelvin: number): number {
  const tempInCelsius = kelvin - 273.15;
  return Math.floor(tempInCelsius);
}
