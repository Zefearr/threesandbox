// import { modelLoader } from './modules/loader';
import Manager from './modules/manager';
import { materials } from './modules/materials';
import { models } from './modules/models';
import { lights } from './modules/lights';  
// import {grassGrid} from './modules/grass';
// import {particleGrid} from './modules/particles';
 
const ui = (function(){ 
  let domStrings = {
    webglContainer: 'webgl',
    color: 'green',
    scale: 4,
    flowX: 1,
    flowY: 1
  }
  return {
    getDomStrings: function(){
      return domStrings;
    }
  }
})()



const scene = (function(ui, lights, materials){ 

  var water, light;
  var params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
  };
 
  const domStrings = ui.getDomStrings();  
  var scene = new THREE.Scene();
  var enableFog = true;
  if(enableFog) {
      scene.fog =  new THREE.FogExp2(0xDFE2D9, 0.005);   
      scene.fog.near = 0.1;
  } 
  const loader = new THREE.FBXLoader();
  const textureLoader = new THREE.TextureLoader();
  var clock = new THREE.Clock();
  var camera = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight, 1, 10000);
  var camGrp = new THREE.Group();
  console.log(camGrp);


  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0xf3f3f3); 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(domStrings.webglContainer).appendChild(renderer.domElement);

 var light = new THREE.DirectionalLight(0xffffff, 1);
 light.castShadow = true;
 var pointLight = lights.getPointLight(1);
 var boxMat = materials.initMaterials('standard', 'yellow');
 var mesh = models.getBox(boxMat, 30,30,30);
 boxMat.transparent = true;
 boxMat.opacity = 0.6;
 boxMat.alphaTest = 0.3;

 var DirLight = lights.getDirectionalLight(1);
 var dirPivot = models.getBox(boxMat, 1,1,1);
 DirLight.add(dirPivot);
//  scene.add(DirLight);
 DirLight.position.y = 3;
 DirLight.position.z = -3;
//  scene.add(mesh);
//  scene.add(pointLight);
//  pointLight.add(mesh);
//  pointLight.position.y = 10;
 scene.add(light);
 var amLight = lights.getAmbientLight(0.3);
 scene.add(amLight);
 light.add(mesh);
 scene.add(light);
 // Water

  var platform = models.getText();
  scene.add(platform);
  // var spusk = models.getSpusk();
  // scene.add(spusk);
  var fence = models.getFence();
  scene.add(fence);
  var train = models.getTrain();
  scene.add(train);

  var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );

  water = new THREE.Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      } ),
      alpha: 0.8,
      sunDirection: light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add( water );
  var inputRange = document.getElementById('cowbell');
  // Skybox
 
  var sky = new THREE.Sky();

  var uniforms = sky.material.uniforms;

  uniforms[ 'turbidity' ].value = 10;
  uniforms[ 'rayleigh' ].value = 0.8;
  uniforms[ 'luminance' ].value = 1;
  uniforms[ 'mieCoefficient' ].value = 0.005; 
  uniforms[ 'mieDirectionalG' ].value = 0.8;

  var parameters = {
    distance: 400,
    inclination: 0.44,
    azimuth: 0.205
  };

  

  var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
  cubeCamera.renderTarget.texture.generateMipmaps = true;
  cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

  scene.background = cubeCamera.renderTarget;

  function updateSun() {

    var theta = Math.PI * ( parameters.inclination - 0.5 );
    var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

    light.position.x = parameters.distance * Math.cos( phi );
    light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
    light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

    sky.material.uniforms[ 'sunPosition' ].value = light.position.copy( light.position );
    water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();

    cubeCamera.update( renderer, sky );

  }

  updateSun();
 var someStuffLight = lights.getPointLight(5);
 var lightMat = materials.initMaterials('standard', 0xffffff);
 lightMat.transparent = true;
 lightMat.opacity = 0.5;
//  var someStuffLightMesh = models.getBox(lightMat, 1,1,1);
//  someStuffLight.add(someStuffLightMesh);
//  someStuffLight.name = 'stuffLight';
//  scene.add(someStuffLight);
//  someStuffLight.position.y = 3;
  var gui = new dat.GUI();

  var folder = gui.addFolder( 'Sky' );
  folder.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
  folder.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
 
 
  folder.open();

  var uniforms = water.material.uniforms;

  var folder = gui.addFolder( 'Water' );
  folder.add( uniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
  folder.add( uniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
  folder.add( uniforms.alpha, 'value', 0.9, 1, .001 ).name( 'alpha' );
  folder.open();
 
  console.log('asd');  
  return {
    init: function() {
      window.onload = function() {
        window.addEventListener( 'resize', onWindowResize, false ); 
      }

 
    

      var controls = new THREE.OrbitControls(camera, renderer.domElement);
      camera.position.set(-0,1,140); 
      // skyShader();
      update(renderer, scene, camera, controls, clock);
      function update(renderer, scene, camera, controls, clock) {
        inputRange.oninput = function() {
          var el = scene.getObjectByName('stuffLight');
           mesh.position.y = this.value;
          // camera.position.z = this.value;
          // parameters.inclination = this.value;
          console.log( light.position.y);
        }
      var time = performance.now() * 0.001; 
      water.material.uniforms[ 'time' ].value += 0.5 / 60.0;
      var delta = clock.getDelta();
      // if(mixer) mixer.update(delta);
      renderer.render(scene, camera);
   
      controls.update(); 
        requestAnimationFrame(function(){
            update(renderer, scene, camera, controls,clock)
          }); 
        }
      function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }
 
})(ui, lights, materials);
scene.init();







// if ( WEBGL.isWebGLAvailable() === false ) {

//   document.body.appendChild( WEBGL.getWebGLErrorMessage() );

// }

// var container, stats;
// var camera, scene, renderer, light;
// var controls, water, sphere;

// init();
// animate();

// function init() {

//   container = document.getElementById( 'container' );

//   //

//   renderer = new THREE.WebGLRenderer();
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   container.appendChild( renderer.domElement );

//   //

//   scene = new THREE.Scene();

//   //

//   camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
//   camera.position.set( 30, 30, 100 );

//   //

//   light = new THREE.DirectionalLight( 0xffffff, 0.8 );
//   scene.add( light );

//   // Water

//   var waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );

//   water = new THREE.Water(
//     waterGeometry,
//     {
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

//         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

//       } ),
//       alpha: 1.0,
//       sunDirection: light.position.clone().normalize(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: 3.7,
//       fog: scene.fog !== undefined
//     }
//   );

//   water.rotation.x = - Math.PI / 2;

//   scene.add( water );

//   // Skybox

//   var sky = new THREE.Sky();

//   var uniforms = sky.material.uniforms;

//   uniforms[ 'turbidity' ].value = 10;
//   uniforms[ 'rayleigh' ].value = 2;
//   uniforms[ 'luminance' ].value = 1;
//   uniforms[ 'mieCoefficient' ].value = 0.005;
//   uniforms[ 'mieDirectionalG' ].value = 0.8;

//   var parameters = {
//     distance: 400,
//     inclination: 0.49,
//     azimuth: 0.205
//   };

//   var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
//   cubeCamera.renderTarget.texture.generateMipmaps = true;
//   cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

//   scene.background = cubeCamera.renderTarget;

//   function updateSun() {

//     var theta = Math.PI * ( parameters.inclination - 0.5 );
//     var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

//     light.position.x = parameters.distance * Math.cos( phi );
//     light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
//     light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

//     sky.material.uniforms[ 'sunPosition' ].value = light.position.copy( light.position );
//     water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();

//     cubeCamera.update( renderer, sky );

//   }

//   updateSun();

//   //

//   var geometry = new THREE.IcosahedronBufferGeometry( 20, 1 );
//   var count = geometry.attributes.position.count;

//   var colors = [];
//   var color = new THREE.Color();

//   for ( var i = 0; i < count; i += 3 ) {

//     color.setHex( Math.random() * 0xffffff );

//     colors.push( color.r, color.g, color.b );
//     colors.push( color.r, color.g, color.b );
//     colors.push( color.r, color.g, color.b );

//   }

//   geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

//   var material = new THREE.MeshStandardMaterial( {
//     vertexColors: THREE.VertexColors,
//     roughness: 0.0,
//     flatShading: true,
//     envMap: cubeCamera.renderTarget.texture,
//     side: THREE.DoubleSide
//   } );

//   sphere = new THREE.Mesh( geometry, material );
//   scene.add( sphere );

//   //

//   controls = new THREE.OrbitControls( camera, renderer.domElement );
//   controls.maxPolarAngle = Math.PI * 0.495;
//   controls.target.set( 0, 10, 0 );
//   controls.minDistance = 40.0;
//   controls.maxDistance = 200.0;
//   controls.update();

//   //

//   stats = new Stats();
//   container.appendChild( stats.dom );

//   // GUI

//   var gui = new dat.GUI();

//   var folder = gui.addFolder( 'Sky' );
//   folder.add( parameters, 'inclination', 0, 0.5, 0.0001 ).onChange( updateSun );
//   folder.add( parameters, 'azimuth', 0, 1, 0.0001 ).onChange( updateSun );
//   folder.open();

//   var uniforms = water.material.uniforms;

//   var folder = gui.addFolder( 'Water' );
//   folder.add( uniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
//   folder.add( uniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
//   folder.add( uniforms.alpha, 'value', 0.9, 1, .001 ).name( 'alpha' );
//   folder.open();

//   //

//   window.addEventListener( 'resize', onWindowResize, false );

// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize( window.innerWidth, window.innerHeight );

// }

// function animate() {

//   requestAnimationFrame( animate );
//   render();
//   stats.update();

// }

// function render() {

//   var time = performance.now() * 0.001;

//   sphere.position.y = Math.sin( time ) * 20 + 5;
//   sphere.rotation.x = time * 0.5;
//   sphere.rotation.z = time * 0.51;

//   water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

//   renderer.render( scene, camera );

// }








