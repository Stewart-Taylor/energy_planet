'use strict';

class Planet {

  constructor(_scene) {
    this.scene = _scene;


    // Graphical Properties
    // fog must be added to scene before first render
    this.scene.fog = new THREE.FogExp2('#F5F5F5', 0.00025);
    this.createSkyBox();
  }

  initialize() {




  }
}

module.exports = Planet;
