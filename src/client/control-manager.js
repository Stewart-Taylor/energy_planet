'use strict';


const DEBUG = true;

const CONTEXT_MENU = true;

class ControlManager {

  constructor(gameManager) {
    this.gameManager = gameManager;

    // eslint-disable-next-line
    let onkeydown;
    // eslint-disable-next-line
    let onkeyup;

    this.Key = {
      _pressed: {},

      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,

      W: 87,
      A: 65,
      D: 68,
      S: 83,

      Q: 81,

      I: 73,
      J: 74,
      K: 75,
      L: 76,
      U: 85,
      O: 79,

      // eslint-disable-next-line
      isDown: function(keyCode) {
        return this._pressed[keyCode];
      },

      // eslint-disable-next-line
      onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
      },

      // eslint-disable-next-line
      onKeyup: function(event) {
        delete this._pressed[event.keyCode];
      }
    };

    // Below disables right click
    if (!CONTEXT_MENU) { document.body.oncontextmenu = () => false; }

    window.addEventListener('keyup', (event) => { this.Key.onKeyup(event); }, false);
    window.addEventListener('keydown', (event) => { this.Key.onKeydown(event); }, false);

    window.addEventListener('mousedown', () => {
      // this.gameManager.playerManager.attack();
    });


    window.addEventListener('mousemove', (event) => {
      // this.gameManager.playerManager.updatePlayerRotation(event.clientX, event.clientY);
    });


    ControlManager.debugOptions();
  }

  static debugOptions() {
    if (DEBUG) {
      // window.addEventListener('keyup', (event) => {
      //   if (event.key === 'q') { this.gameManager.cameraManager.changeCameraMode(); }
      // }, false);

      window.addEventListener('keyup', (event) => {
        if (event.key === 'z') {
          // ClientEvents.addLargeNotification.dispatch('You are awesome');
          // ClientEvents.addBloodEffect.dispatch(this.gameManager.agentManager.player.position);
        }
      }, false);
    }
  }

  keyDown(key, action) {
    if (this.Key.isDown(key)) {
      action();
    }
  }

  update() {
    // Player
    // if (this.gameManager.agentManager.player) {
    //   // this.keyDown(this.Key.W, this.gameManager.agentManager.player.moveForward);
    //   // this.keyDown(this.Key.A, this.gameManager.agentManager.player.moveLeft);
    //   // this.keyDown(this.Key.S, this.gameManager.agentManager.player.moveBackward);
    //   // this.keyDown(this.Key.D, this.gameManager.agentManager.player.moveRight);
    // }

    this.updateDebug();
  }

  updateDebug() {
    if (DEBUG) {
      // Camera
      this.keyDown(this.Key.I, this.gameManager.cameraManager.moveForward);
      this.keyDown(this.Key.K, this.gameManager.cameraManager.moveBackward);
      this.keyDown(this.Key.J, this.gameManager.cameraManager.moveLeft);
      this.keyDown(this.Key.L, this.gameManager.cameraManager.moveRight);
      this.keyDown(this.Key.O, this.gameManager.cameraManager.raiseCamera);
      this.keyDown(this.Key.U, this.gameManager.cameraManager.lowerCamera);
    }
  }
}

module.exports = ControlManager;