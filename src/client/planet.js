'use strict';

const ENABLE_ROTATION = false;

class Planet {
  constructor(_scene) {
    this.scene = _scene;

    // Graphical Properties
    // fog must be added to scene before first render
    // this.scene.fog = new THREE.FogExp2('#000', 0.00025);
    this.createSkyBox();
  }

  createSkyBox() {
    const skyBoxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: '#111', side: THREE.BackSide });
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


    var geometry3   = new THREE.SphereGeometry(0.52, 32, 32)
    var material3 = new THREE.MeshPhongMaterial()
    this.glowMesh = new THREE.Mesh(geometry, material)


    this.scene.add(this.glowMesh)



    var geometry   = new THREE.SphereGeometry(0.51, 32, 32)

    // var uniforms = {}; //THREE.UniformsUtils.merge( [basicShader.uniforms] );
    // uniforms['map'].value = THREE.ImageUtils.loadTexture( 'assets/sprites/complete.png' );
    // uniforms['size'].value = 100;
    // uniforms['opacity'].value = 0.5;
    // uniforms['psColor'].value = new THREE.Color( 0xffffff );
    // const texturePath = 'assets/sprites/test.png';
    const texturePath = 'assets/sprites/years/year_2014.png';



    this.material2 = new THREE.ShaderMaterial( {

      uniforms: {
        bufferTexture: { type: "t", value: THREE.ImageUtils.loadTexture(texturePath) },
        time: { type: "f", value: 0.0 },
        scale:  { type: "v2", value: new THREE.Vector2( 50, 50 ) }
        // opacity: { value: 0.5 }
        // resolution: { value: new THREE.Vector2() }

      },
      blending: THREE.NormalBlending,
      depthTest: true,
      transparent: true,


      vertexShader: document.getElementById( 'vertexShader' ).textContent,

      fragmentShader: document.getElementById( 'fragment-shader-smoke' ).textContent

    } );


    // var material2  = new THREE.MeshPhongMaterial()
    this.earthMesh2 = new THREE.Mesh(geometry, this.material2)


    // material2.map = THREE.ImageUtils.loadTexture('assets/sprites/complete.png');
    // material2.bumpMap    = THREE.ImageUtils.loadTexture('assets/sprites/cloud_bump.jpg');
    // material2.bumpScale = 0.1;

    // material2.specularMap = THREE.ImageUtils.loadTexture('assets/sprites/specular_map.jpg');
    // material2.specular  = new THREE.Color('grey')
      // this.material2.opacity = 0.8;
    // material2.transparent = true;

    // this.material2 = material2;
    // setInterval

    this.scene.add(this.earthMesh2)
  }



  update() {
    if (ENABLE_ROTATION) {
      this.earthMesh.rotation.y += 0.002;
      this.earthMesh2.rotation.y += 0.002;
      // this.earthMesh2.rotation.y += 0.001;
    }

    // this.material2.uniforms.time.value += 0.001;
    this.material2.uniforms.time.value += 0.0025;
  }
}

module.exports = Planet;
