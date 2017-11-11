'use strict';

// const MathUtil = require('../shared/math-util');

const FOLLOW_MODE = 1;
const FREE_MODE = 2;

const CAMERA_SPEED = 0.1;

class CameraManager {

  constructor(scene, _gameManager) {
    this.gameManager = _gameManager;
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 10000;

    this.mode = FREE_MODE;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(0, 1.5, 1.2);
    // this.camera.position.set(1100, 700, 1900);
    scene.add(this.camera);


    this.camera.rotation.x = 0;
    this.camera.rotation.x = -0.9;

    // Bind functions
    this.raiseCamera = this.raiseCamera.bind(this);
    this.lowerCamera = this.lowerCamera.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  update() {

  }

  _updateCameraDebugInfo() {
    $('#camera-data').html(`(${this.camera.position.x},${this.camera.position.y},${this.camera.position.z})`);
  }

  changeCameraMode() {
    if (this.mode === FOLLOW_MODE) {
      this.mode = FREE_MODE;
    } else {
      this.mode = FOLLOW_MODE;
    }
  }

  raiseCamera() {
    this.camera.position.y += CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }

  lowerCamera() {
    this.camera.position.y -= CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }

  moveLeft() {
    this.camera.position.x -= CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }

  moveRight() {
    this.camera.position.x += CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }

  moveForward() {
    this.camera.position.z -= CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }

  moveBackward() {
    this.camera.position.z += CAMERA_SPEED;
    this._updateCameraDebugInfo();
  }
}

module.exports = CameraManager;
