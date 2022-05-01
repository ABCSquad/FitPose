import { Keypoint } from "./types";

//Angle using arctan2 - anticlockwise 0 to 360
const angle = (a: Keypoint, b: Keypoint, c: Keypoint) => {
  let ba = [a.x - b.x, a.y - b.y];
  let bc = [c.x - b.x, c.y - b.y];
  let angle = Math.atan2(bc[1], bc[0]) - Math.atan2(ba[1], ba[0]);

  if (angle < 0) {
    angle += 2 * Math.PI;
  }
  angle = (angle * 180) / Math.PI;
  return angle;
};

export { angle };
