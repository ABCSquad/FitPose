type Result = {
    image: HTMLCanvasElement
    poseLandmarks: object
}

class Core {
    image: any
    keypoints: object

    constructor(result: Result){
        this.image = result.image
        this.keypoints = result.poseLandmarks         
    }
}

export default Core