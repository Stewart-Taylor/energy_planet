'use strict';

const Tile = require('./square-tile');
const map = require('./map');


class World {

  constructor(_scene) {
    this.scene = _scene;
    this.tiles = [];

    // Graphical Properties
    // fog must be added to scene before first render
    this.scene.fog = new THREE.FogExp2('#F5F5F5', 0.00025);
    this.createSkyBox();
  }

  initialize() {
    this.createMapSquare(map);
  }

  createSkyBox() {
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: '#F5F5F5', side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);
  }


  createMapHex() {

    for (let i = 0; i < 30; i += 1) {
      for (let c = 0; c < 30; c += 1) {
        const newTile = new Tile(this.scene, c, i, null);
        this.tiles.push(newTile);
      }
    }

    // const landMaterial = new THREE.MeshLambertMaterial({ color: '#78909C' });
    // const cube = new (THREE.Mesh)(new (THREE.BoxGeometry)(400, 1, 250), landMaterial);
    // cube.position.y = -2;
    // cube.position.x = 200;
    // cube.position.z = 100;
    // this.scene.add(cube);
  }


  createMapSquare(_map) {
    const lines = _map.split('\n');

    for (let i = 0; i < lines.length; i += 1) {
      for (let c = 0; c < lines[i].length; c += 1) {
        // Tile is still added to the scene
        const newTile = new Tile(this.scene, c, i, lines[i][c]);
        this.tiles.push(newTile);
      }
    }

    const landMaterial = new THREE.MeshLambertMaterial({ color: '#80DEEA' });
    const cube = new (THREE.Mesh)(new (THREE.BoxGeometry)(800, 1, 800), landMaterial);
    cube.position.y = -2;
    cube.position.x = 200;
    cube.position.z = 100;
    this.scene.add(cube);
  }
}

module.exports = World;
