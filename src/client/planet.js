'use strict';

class Planet {

  constructor(_scene) {
    this.scene = _scene;


    // Graphical Properties
    // fog must be added to scene before first render
    this.scene.fog = new THREE.FogExp2('#F5F5F5', 0.00025);
    this.createSkyBox();
  }

  createSkyBox() {
    const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: '#F5F5F5', side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    this.scene.add(skyBox);
  }

  initialize() {

    console.log('ayeee');
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


    material2.map = THREE.ImageUtils.loadTexture('assets/sprites/map3.png');
    material2.bumpMap    = THREE.ImageUtils.loadTexture('assets/sprites/map3_bump.png');
    material2.bumpScale = 0.1;

    // material2.specularMap = THREE.ImageUtils.loadTexture('assets/sprites/specular_map.jpg');
    // material2.specular  = new THREE.Color('grey')
    // material2.opacity = 0.9;
    material2.transparent = true;

    this.scene.add(this.earthMesh2)



  }



  // cloudInit() {
  //   // create destination canvas
  //   var canvasResult  = document.createElement('canvas')
  //   canvasResult.width  = 1024
  //   canvasResult.height = 512
  //   var contextResult = canvasResult.getContext('2d')   

  //   // load earthcloudmap
  //   var imageMap  = new Image();
  //   imageMap.addEventListener("load", function() {
      
  //     // create dataMap ImageData for earthcloudmap
  //     var canvasMap = document.createElement('canvas')
  //     canvasMap.width = imageMap.width
  //     canvasMap.height= imageMap.height
  //     var contextMap  = canvasMap.getContext('2d')
  //     contextMap.drawImage(imageMap, 0, 0)
  //     var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

  //     // load earthcloudmaptrans
  //     var imageTrans  = new Image();
  //     imageTrans.addEventListener("load", function(){
  //       // create dataTrans ImageData for earthcloudmaptrans
  //       var canvasTrans   = document.createElement('canvas')
  //       canvasTrans.width = imageTrans.width
  //       canvasTrans.height  = imageTrans.height
  //       var contextTrans  = canvasTrans.getContext('2d')
  //       contextTrans.drawImage(imageTrans, 0, 0)
  //       var dataTrans   = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
  //       // merge dataMap + dataTrans into dataResult
  //       var dataResult    = contextMap.createImageData(canvasMap.width, canvasMap.height)
  //       for(var y = 0, offset = 0; y < imageMap.height; y++){
  //         for(var x = 0; x < imageMap.width; x++, offset += 4){
  //           dataResult.data[offset+0] = dataMap.data[offset+0]
  //           dataResult.data[offset+1] = dataMap.data[offset+1]
  //           dataResult.data[offset+2] = dataMap.data[offset+2]
  //           dataResult.data[offset+3] = 255 - dataTrans.data[offset+0]
  //         }
  //       }
  //       // update texture with result
  //       contextResult.putImageData(dataResult,0,0)  
  //       material.map.needsUpdate = true;
  //     })
  //     imageTrans.src  = THREEx.Planets.baseURL+'images/earthcloudmaptrans.jpg';
  //   }, false);
  //   imageMap.src  = THREEx.Planets.baseURL+'images/earthcloudmap.jpg';

  //   var geometry  = new THREE.SphereGeometry(0.51, 32, 32)
  //   var material  = new THREE.MeshPhongMaterial({
  //     map   : new THREE.Texture(canvasResult),
  //     side    : THREE.DoubleSide,
  //     transparent : true,
  //     opacity   : 0.8,
  //   })
  //   var mesh  = new THREE.Mesh(geometry, material)
  //   return mesh

  // }


  update() {
    // this.earthMesh.rotation.y += 0.004;
    // this.earthMesh2.rotation.y += 0.004;
  }
}

module.exports = Planet;