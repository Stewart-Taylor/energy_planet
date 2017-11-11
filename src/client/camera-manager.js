'use strict';

// const MathUtil = require('../shared/math-util');

const FOLLOW_MODE = 1;
const FREE_MODE = 2;

class CameraManager {

  constructor(scene, _gameManager) {
    this.gameManager = _gameManager;
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 10000;

    this.mode = FREE_MODE;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(180, 370, 431);
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



    // $('#camera-data').html(`(${this.camera.position.x},${this.camera.position.y},${this.camera.position.z})`);

    // this.camera.lookAt(new THREE.Vector3(0,0,150));
    // if (this.mode === FOLLOW_MODE) {
    //   if (this.gameManager.agentManager.player) {
    //     this.camera.position.x = this.gameManager.agentManager.player.parent.position.x;
    //     this.camera.position.z = this.gameManager.agentManager.player.parent.position.z + 60;

    //     if (this.gameManager.agentManager.player.movementState === 2) {
    //       this.camera.position.y = MathUtil.lerp(this.camera.position.y, 130, 0.005);
    //     } else {
    //       this.camera.position.y = MathUtil.lerp(this.camera.position.y, 100, 0.005);
    //     }

    //     this.camera.lookAt(this.gameManager.agentManager.player.parent.position);
    //   }
    // }
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
    this.camera.position.y += 1;
    this._updateCameraDebugInfo();
  }

  lowerCamera() {
    this.camera.position.y -= 1;
    this._updateCameraDebugInfo();
  }

  moveLeft() {
    this.camera.position.x -= 1;
    this._updateCameraDebugInfo();
  }

  moveRight() {
    this.camera.position.x += 1;
    this._updateCameraDebugInfo();
  }

  moveForward() {
    this.camera.position.z -= 1;
    this._updateCameraDebugInfo();
  }

  moveBackward() {
    this.camera.position.z += 1;
    this._updateCameraDebugInfo();
  }
}

module.exports = CameraManager;
