import { angle } from "../utils";
// import { angleMapping } from "../angleMapping";
import { Deviation, Rep } from "../types";
import { messages } from "../messages";
import Timer from "easytimer.js";

const deviationObj: Deviation = {
	shoulder: 0,
	rightElbow: 0,
	leftElbow: 0,
};

let message: string;

const repObj: Rep = {
	count: 0,
	flag: 1,
};

const timer = new Timer();

export const ohp = (keypoints: any) => {
	/* 
	Deviations:
	- Left/Right shoulder
	- Left elbow
	- Right elbow
	*/

	// Shoulder calculation
	deviationObj.shoulder =
		Math.abs(360 - angle(keypoints[23], keypoints[11], keypoints[13])) -
		angle(keypoints[24], keypoints[12], keypoints[14]);

	// Elbow calculations (R)
	deviationObj.rightElbow =
		angle(keypoints[16], keypoints[14], keypoints[12]) -
		Math.abs(angle(keypoints[24], keypoints[12], keypoints[14]));

	// Elbow calculations (L)
	deviationObj.leftElbow =
		angle(keypoints[15], keypoints[13], keypoints[11]) -
		Math.abs(angle(keypoints[23], keypoints[11], keypoints[13]));

	// Timer

	if (
		Math.abs(deviationObj.shoulder) > 10 ||
		Math.abs(deviationObj.rightElbow) > 10 ||
		Math.abs(deviationObj.leftElbow) > 10
	) {
		timer.start();
		// console.log(timer.getTimeValues().seconds);
		if (timer.getTimeValues().seconds > 0.4) {
			if (deviationObj.shoulder > 10) {
				message = messages.ohp.shoulder;
			} else if (Math.abs(deviationObj.rightElbow) > 10) {
				if (Math.abs(deviationObj.leftElbow) < 10) {
					message = messages.ohp.leftElbow;
				} else {
					message = messages.ohp.wrong;
				}
			} else if (Math.abs(deviationObj.leftElbow) > 10) {
				if (Math.abs(deviationObj.rightElbow) < 10) {
					message = messages.ohp.rightElbow;
				} else {
					message = messages.ohp.wrong;
				}
			}
		}
	} else {
		// console.log("position is fine");
		message = messages.ohp.correct;
		timer.reset();
	}
	
	// Reps
	if (
		deviationObj.shoulder < 15 &&
		deviationObj.rightElbow < 15 &&
		deviationObj.leftElbow < 15
	) {
		if (
			angle(keypoints[24], keypoints[12], keypoints[14]) < 90 &&
			repObj.flag != 1
		) {
			repObj.flag = 1;
			repObj.count += 1;
		} else if (
			angle(keypoints[24], keypoints[12], keypoints[14]) > 170 &&
			repObj.flag === 1
		) {
			repObj.flag = 0;
		}
	}
	console.log(repObj);

	return { deviationObj, repObj, message };
};
