'use strict';

class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    this.light = new THREE.DirectionalLight(0xffffff, 0.1);
    this.light.position.x = 20;
    this.light.position.y = 150;
    this.light.position.z = 90;
    this.light.name = 'dirlight';

    this.scene.add(this.light);
    this.light.castShadow = true;
  }
}

module.exports = LightManager;
