'use strict';

const TILE_SIZE = 10;
const TILE_OFFSET = TILE_SIZE + 0;
const TILLE_DRIFT = 0.05;

class Tile {
  constructor(scene, x, y, type) {
    // console.log('tile created');
    let tileColor;

    let ignore = false;

    if (type === 'x') { // water
      ignore = true;
      tileColor = new THREE.Color('#80DEEA');
    } else if (type === '#') { // land
      tileColor = new THREE.Color('#81C784');
    } else {
      ignore = true;
      tileColor = new THREE.Color(0, 0.9, 0);
    }

    if (!ignore) {
      const landMaterial = new THREE.MeshLambertMaterial({
        color: tileColor
      });
      const cube = new (THREE.Mesh)(new (THREE.BoxGeometry)(TILE_SIZE, 1, TILE_SIZE), landMaterial);

      cube.position.y = 0;
      cube.position.x = x * TILE_OFFSET;
      cube.position.z = y * TILE_OFFSET;
      cube.castShadow = false;
      cube.receiveShadow = true;

      // cube.rotation.x = Tile._generateRotationOffset();
      // cube.rotation.z = Tile._generateRotationOffset();
      // cube.rotation.y = Tile._generateRotationOffset();

      scene.add(cube);
    }





    // const landMaterial = new THREE.MeshLambertMaterial({color: '#8597a0'});
    // const geometry = new THREE.CylinderGeometry(TILE_SIZE, TILE_SIZE, 0, 6);
    // const cube  = new THREE.Mesh( geometry, landMaterial )

    // cube.position.y = 1

    // const spacing = 2.1

    // if (y % 2) {
    //   cube.position.x = (x * TILE_SIZE * spacing)
    //   cube.position.z = (y * 8 * spacing) //#- (TILE_SIZE / 2)
    // } else {
    //   cube.position.x = (x * TILE_SIZE * spacing) + (TILE_SIZE)
    //   cube.position.z = (y * 8 * spacing) //#- (TILE_SIZE / 2)
    // }
    // cube.castShadow = false;
    // cube.receiveShadow = false;
    // scene.add(cube)
  }
}

module.exports = Tile;
