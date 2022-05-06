import { Keypoint } from "./types";

//Angle using arctan2 - clockwise 0 to 360
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

//Angle using arctan2 - anticlockwise -180 to 180
const angleNormalized = (angle: number) => {
  if (angle > 180) {
    return 360 - angle;
  }
  return angle;
};

/*
Function to check which side of the exercise is being performed
Uses z coordinates
*/
const sideChecker = (right: number, left: number): boolean => {
  let tempObj = {
    right: right,
    left: left,
  };
  let greaterZ = Object.keys(tempObj).reduce((right, left) =>
    tempObj["right"] > tempObj["left"] ? right : left
  );
  if (greaterZ === "left") return true;
  else return false;
};

export { angle, sideChecker, angleNormalized };
