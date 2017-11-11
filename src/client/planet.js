'use strict';

const ENABLE_ROTATION = false;

class Planet {
  constructor(_scene) {
    this.scene = _scene;

    // Graphical Properties
    // fog must be added to scene before first render
    this.scene.fog = new THREE.FogExp2('#F5F5F5', 0.00025);
    // this.createSkyBox();
  }

  createSkyBox() {
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: '#F5F5F5', side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);
  }

  initialize() {
    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    var material  = new THREE.MeshPhongMaterial()
    this.earthMesh = new THREE.Mesh(geometry, material)


    material.map = THREE.ImageUtils.loadTexture('assets/sprites/map.jpg');
    material.bumpMap    = THREE.ImageUtils.loadTexture('assets/sprites/bump_map.jpg');
    material.bumpScale = 0.05;

    material.specularMap = THREE.ImageUtils.loadTexture('assets/sprites/specular_map.jpg');
    material.specular  = new THREE.Color('grey')

    this.scene.add(this.earthMesh)



    var geometry   = new THREE.SphereGeometry(0.52, 32, 32)
    var material2  = new THREE.MeshPhongMaterial()
    this.earthMesh2 = new THREE.Mesh(geometry, material2)


    material2.map = THREE.ImageUtils.loadTexture('assets/sprites/United_States.png');
    material2.bumpMap    = THREE.ImageUtils.loadTexture('assets/sprites/cloud_bump.jpg');
    material2.bumpScale = 0.1;

    // material2.specularMap = THREE.ImageUtils.loadTexture('assets/sprites/specular_map.jpg');
    // material2.specular  = new THREE.Color('grey')
    material2.opacity = 0.8;
    material2.transparent = true;

    this.scene.add(this.earthMesh2)
  }



  update() {
    if (ENABLE_ROTATION) {
      this.earthMesh.rotation.y += 0.004;
      this.earthMesh2.rotation.y += 0.004;
    }
  }
}

module.exports = Planet;
