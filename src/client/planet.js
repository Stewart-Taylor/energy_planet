'use strict';

const ENABLE_ROTATION = false;

class Planet {
  constructor(_scene) {
    this.scene = _scene;
    this.createSkyBox();
  }

  createSkyBox() {
    const skyBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: '#fff', side: THREE.BackSide });
    skyBoxMaterial.map = THREE.ImageUtils.loadTexture('assets/sprites/Starscape.png');
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);
  }

  initialize() {
    this.initializeEarth();
    this.initializeSmokeMap();
  }

  initializeEarth() {
    const baseEarthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMat = new THREE.MeshPhongMaterial();
    this.earthMesh = new THREE.Mesh(baseEarthGeometry, earthMat);

    earthMat.map = THREE.ImageUtils.loadTexture('assets/sprites/earth/earth_texture.jpg');
    earthMat.bumpMap = THREE.ImageUtils.loadTexture('assets/sprites/earth/earth_bump_map.jpg');
    earthMat.specularMap = THREE.ImageUtils.loadTexture('assets/sprites/earth/earth_specular.jpg');

    earthMat.bumpScale = 0.05;
    earthMat.specular = new THREE.Color('grey');

    this.scene.add(this.earthMesh);
  }

  initializeSmokeMap() {
    const smokeGeometry = new THREE.SphereGeometry(0.51, 32, 32);
    const texturePath = 'assets/sprites/years/year_2014.png';

    this.smokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        bufferTexture: { type: 't', value: THREE.ImageUtils.loadTexture(texturePath) },
        time: { type: 'f', value: 0.0 },
        scale: { type: 'v2', value: new THREE.Vector2(100, 100) }
      },
      blending: THREE.NormalBlending,
      depthTest: true,
      transparent: true,

      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragment-shader-smoke').textContent
    });

    this.smokeMesh = new THREE.Mesh(smokeGeometry, this.smokeMaterial);
    this.scene.add(this.smokeMesh);
  }

  update() {
    if (ENABLE_ROTATION) {
      this.earthMesh.rotation.y += 0.002;
      this.smokeMesh.rotation.y += 0.002;
      // this.smokeMesh.rotation.y += 0.001;
    }

    // this.smokeMaterial.uniforms.time.value += 0.001;
    this.smokeMaterial.uniforms.time.value += 0.0025;
  }
}

module.exports = Planet;
