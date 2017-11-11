'use strict';

const LIGHT_X = 20;
const LIGHT_Y = 150;
const LIGHT_Z = 90;
const AMBIENT_LIGHT = 0.8;

class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.scene.add(new THREE.AmbientLight(AMBIENT_LIGHT, AMBIENT_LIGHT, AMBIENT_LIGHT));

    this.light = new THREE.DirectionalLight(0xffffff, 0.8);
    this.light.position.x = LIGHT_X;
    this.light.position.y = LIGHT_Y;
    this.light.position.z = LIGHT_Z;
    this.light.name = 'dirlight';

    this.scene.add(this.light);
    this.light.castShadow = true;
  }

  dimLights() {
    this.scene.remove(this.light);
  }
}

module.exports = LightManager;
