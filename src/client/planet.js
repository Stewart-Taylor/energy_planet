'use strict';

const ENABLE_ROTATION = false;
const DEFAULT_YEAR = 2014;

class Planet {
  constructor(_scene) {
    this.scene = _scene;
    this.createSkyBox();

    this.selectedYear = DEFAULT_YEAR;
    this.smokeMaterials = [];
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
    this.initializeSmokeMaps();
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

  initializeSmokeMaps() {
    this.initializeSmokeMaterials();
    this.initializeSmokeMap(DEFAULT_YEAR);
  }

  initializeSmokeMaterials() {
    for (let i = 1990; i < 2015; i += 1) {
      this.smokeMaterials[i] = Planet.initializeSmokeMaterial(i);
    }
  }

  static initializeSmokeMaterial(year) {
    const texturePath = `assets/sprites/years/year_${year}.png`;
    const smokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        bufferTexture: { type: 't', value: THREE.ImageUtils.loadTexture(texturePath) },
        time: { type: 'f', value: 0.0 },
        scale: { type: 'v2', value: new THREE.Vector2(30, 30) }
      },
      blending: THREE.NormalBlending,
      depthTest: true,
      transparent: true,

      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragment-shader-smoke').textContent
    });

    return smokeMaterial;
  }

  initializeSmokeMap(year) {
    const smokeGeometry = new THREE.SphereGeometry(0.51, 32, 32);
    this.smokeMesh = new THREE.Mesh(smokeGeometry, this.smokeMaterials[year]);
    this.scene.add(this.smokeMesh);
  }

  selectSmokeMap(year) {
    this.selectedYear = year;
    this.smokeMesh.material = this.smokeMaterials[year];
  }

  update() {
    if (ENABLE_ROTATION) {
      this.earthMesh.rotation.y += 0.002;
      this.smokeMesh.rotation.y += 0.002;
    }
    this.smokeMaterials[this.selectedYear].uniforms.time.value += 0.003;
  }
}

module.exports = Planet;
