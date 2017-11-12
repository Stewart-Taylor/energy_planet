'use strict';

const LightManager = require('./light-manager');
const CameraManager = require('./camera-manager');
const Planet = require('./planet');
require('./lib/orbital-controls');

const GAME_FPS = 50;

const VISUAL_AREA_DIV_ID = 'display-area';
const CANVAS_ID = 'display-canvas';

let visualManager;

class VisualManager {
  constructor() {
    this.renderer = null;
  }

  initialize() {
    visualManager = this;
    this.renderer = null;
    this.scene = new THREE.Scene();
    this.previousPlayerState = {};
    this.loops = 0;
    this.skipTicks = 1000 / GAME_FPS;
    this.maxFrameSkip = 10;
    this.nextGameTick = (new Date()).getTime();

    this.planet = new Planet(this.scene);
    this.lightManager = new LightManager(this.scene);
    this.cameraManager = new CameraManager(this.scene, this);
    this.initializeGraphics();

    this.planet.initialize();
    this.render();
  }

  initializeGraphics() {
    const canvasElement = document.getElementById(CANVAS_ID);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasElement });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 1);

    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = false;

    this.renderer.shadowCameraNear = 3;
    this.renderer.shadowCameraFar = this.cameraManager.far;
    this.renderer.shadowCameraFov = 50;

    this.renderer.shadowMapBias = 0.0001;
    this.renderer.shadowMapDarkness = 0.2;
    this.renderer.shadowMapWidth = 2048;
    this.renderer.shadowMapHeight = 2048;

    document.getElementById(VISUAL_AREA_DIV_ID).appendChild(this.renderer.domElement);

    document.body.oncontextmenu = () => false;
    THREE.OrbitControls(this.cameraManager.camera, canvasElement);

    window.addEventListener('resize', () => {
      this.cameraManager.camera.aspect = window.innerWidth / window.innerHeight;
      this.cameraManager.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }

  render() {
    // eslint-disable-next-line
    requestAnimationFrame(visualManager.render);
    visualManager.visualUpdate();
    visualManager.renderer.render(visualManager.scene, visualManager.cameraManager.camera);
  }

  visualUpdate() {
    visualManager.loops = 0;
    while (((new Date()).getTime() > visualManager.nextGameTick) &&
        (visualManager.loops < visualManager.maxFrameSkip)) {
      visualManager.update();
      visualManager.nextGameTick += visualManager.skipTicks;
      visualManager.loops += 1;
    }

    // Used to prevent speed up issue
    if (visualManager.loops > 0) {
      this.visualUpdate();
    }
  }

  update() {
    this.cameraManager.update();
    this.planet.update();
  }
}

module.exports = VisualManager;
