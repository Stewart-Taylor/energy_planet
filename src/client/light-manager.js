'use strict';

const LIGHT_X = 20;
const LIGHT_Y = 150;
const LIGHT_Z = 90;
const AMBIENT_LIGHT = 0.8;

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


    // var light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.3 );
    // scene.add( light2 );
  }
}

module.exports = LightManager;
