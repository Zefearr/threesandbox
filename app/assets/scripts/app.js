import Manager from './modules/manager';
import { materials } from './modules/materials';
import { models } from './modules/models';
import { lights } from './modules/lights';


const ui = (function () {
  let domStrings = {
    webglContainer: 'webgl',
    color: 'green',
    scale: 4,
    flowX: 1,
    flowY: 1
  }
  return {
    getDomStrings: function () {
      return domStrings;
    }
  }
})()

const scene = (function (ui, lights, materials) {
  var scene, camera, renderer, mixer, controls, water, light;

  const domStrings = ui.getDomStrings();
  var scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.6, 0, 1);
  scene.fog = new THREE.Fog(scene.background, 1, 10000);
  const loader = new THREE.FBXLoader();
  const textureLoader = new THREE.TextureLoader();
  var clock = new THREE.Clock();
  var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100000);


  var camGrp = new THREE.Group();
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(domStrings.webglContainer).appendChild(renderer.domElement);

  // var cloudsMeshMat = materials.initMaterials('phong', 'white');
  // cloudsMeshMat.side = THREE.BackSide;
  // cloudsMeshMat.alphaMap = textureLoader.load('./assets/images/clouds_alpha.png');
  // cloudsMeshMat.alphaTest = 0.4;
  // cloudsMeshMat.blending = THREE.AdditiveBlending;

  // cloudsMeshMat.transparent = true;
  // cloudsMeshMat.opacity = 1;
  // var clMesh = models.getSphere(cloudsMeshMat, 20000, 24);
  // var cloudsGrp = new THREE.Group();
  // cloudsGrp.add(clMesh);
  // cloudsGrp.name = 'movingClouds';
  // scene.add(cloudsGrp);


  var light = new THREE.DirectionalLight(0x3399ff, 0.1);
  light.castShadow = true;
  scene.add(light);
  light.position.z = 80;
  light.position.y = 80;






  // var roadPart = models.getRoad();
  // scene.add(roadPart);
  // roadPart.position.y = 6;

  // var cameraZPosition = new THREE.Group();
  // cameraZPosition.name = 'camZ';
  // cameraZPosition.position.y = 600;
  // cameraZPosition.position.z = -500
  // cameraZPosition.add(camera);


  // function placeRoad(length, multiplier) {
  //   var roadPart = models.getRoad();
  //   var rGrp = new THREE.Group();
  //   for (var i = 0; i < length; i++) {
  //     let obj = roadPart;
  //     obj.position.x = i * multiplier;
  //     obj.position.y = 25;
  //     rGrp.add(obj);
  //   }
  //   rGrp.position.x = -(multiplier * (length - 1)) / 2;
  //   rGrp.position.y = - 20;
  //   return rGrp;
  // }
  // var roadGrid = placeRoad(75, 330);
  // scene.add(roadGrid);
  // function getMash() {
  //   var mashGrp = new THREE.Group();
  //   mashGrp.name = 'mashGroup';
  //   var mashMaterial = materials.initMaterials('standard', 'blue');
  //   mashMaterial.morphTargets = true;
  //   loader.load('./assets/models/mashtest2.fbx', function (object) {
  //     console.log(object);
  //        var mixer = new THREE.AnimationMixer(object);
  //         let aniCLip = mixer.clipAction(object.animations[0]);
  //         aniCLip.play();
  //     object.material = mashMaterial;
  //     object.scale.x = 1;
  //     object.scale.y = 1;
  //     object.scale.z = 1;
  //     object.castShadow = true;
  //     object.receiveShadow = true;

  //     object.traverse(function (child) {
  //       if (child instanceof THREE.Mesh) {
       
         
  //         child.material = mashMaterial;
  //         child.castShadow = true;
  //         child.receiveShadow = true;
  //         child.scale.x = 1;
  //         child.scale.y = 1;
  //         child.scale.z = 1;
  //       }
  //       mashGrp.add(child);
  //     });

  //     mashGrp.add(object);


  //   });
  //   return mashGrp;
  // }
  // var mashTest = getMash();
  // // console.log(mashTest);
  // scene.add(mashTest);

  function getTrain() {
    var trainGrp = new THREE.Group();
    trainGrp.name = 'trainGrp';
    var trainMaterial = materials.initMaterials('standard', 'white');
    trainMaterial.side = THREE.DoubleSide;
    loader.load('./assets/models/vagon4ik6.fbx', function (object) {
      // mixer = new THREE.AnimationMixer(object);
      // let aniCLip = mixer.clipAction(object.animations[0]);
      // aniCLip.timeScale = -0.1;
      // aniCLip.play();
      object.material = trainMaterial;
      object.scale.x = 1;
      object.scale.y = 1;
      object.scale.z = 1;
      object.castShadow = true;
      object.receiveShadow = true;
      trainMaterial.map = textureLoader.load('./assets/images/textures/train_albedo.png');
      trainMaterial.roughness = 1;
      trainMaterial.roughnessMap = textureLoader.load('./assets/images/textures/train_roughness.png');
      trainMaterial.metalnessMap = textureLoader.load('./assets/images/textures/train_metalness.png');
      trainMaterial.normalMap = textureLoader.load('./assets/images/textures/train_normal.png');
      trainMaterial.normalScale = new THREE.Vector2(1, 1);
      // trainMaterial.heightMap = textureLoader.load('./assets/images/textures/train_height.png');
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = trainMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      trainGrp.add(object);
    });
    trainGrp.position.y = 28;
    trainGrp.position.z = 0;
    trainGrp.position.x = 60;

    return trainGrp;
  }

  var groundGeo = new THREE.PlaneBufferGeometry(100000, 100000);
  var groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  groundMat.color.setHSL(0.095, 1, 0.75);
  var ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = - 33;
  ground.rotation.x = - Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const mainTorch = lights.getPointLight(1);
  var pivotMat = materials.initMaterials('basic', 'red');
  pivotMat.transparent = 0.1;
  var lightPivot = models.getBox(pivotMat, 10, 10, 10);
  mainTorch.add(lightPivot);

  // var platForm = models.loadPlatform();
  // scene.add(platForm);

  var ttr = getTrain();

  ttr.add(mainTorch);

  mainTorch.position.y = 500;
  var glasses = models.getGlass();
  var insideTrain = models.getInsidePart();
  ttr.add(insideTrain);
  ttr.add(glasses);
  // ttr.add(camera);
  scene.add(ttr);
  scene.add(camera);

  camera.position.z = 6000;
  camera.position.y = 50;









  function animate() {
    requestAnimationFrame(animate);
    // var movingClouds = scene.getObjectByName('movingClouds');
    // movingClouds.rotation.y += 0.0005;
    // var time = performance.now() * 0.001;
    // water.material.uniforms['time'].value += 0.5 / 60.0;

    // ttr.position.x -= 30;
    // if (ttr.position.x < -5000) {
    //   ttr.position.x = 5000
    // }
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);


    // controls.update(delta);
    renderer.render(scene, camera);
  }

  var waterGeometry = new THREE.PlaneBufferGeometry(100000, 100000);

  water = new THREE.Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('./assets/images/textures/waternormals.jpg', function (texture) { 

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      alpha: 0.8,
      sunDirection: light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x0f001e,
      distortionScale: 0.1,
      size: 1,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;
  scene.add(water);
  // Skybox

  // var sky = new THREE.Sky();

  // var uniforms = sky.material.uniforms;

  // uniforms['turbidity'].value = 10;
  // uniforms['rayleigh'].value = 0.2;
  // uniforms['luminance'].value = 1;
  // uniforms['mieCoefficient'].value = 0.005;
  // uniforms['mieDirectionalG'].value = 0.8;

  // var parameters = {
  //   distance: 400,
  //   inclination: 0.7,
  //   azimuth: 0.205
  // };



  // var cubeCamera = new THREE.CubeCamera(0.1, 1, 512);
  // cubeCamera.renderTarget.texture.generateMipmaps = true;
  // cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
  // scene.background = cubeCamera.renderTarget;

  // function updateSun() {

  //   var theta = Math.PI * (parameters.inclination - 0.5);
  //   var phi = 2 * Math.PI * (parameters.azimuth - 0.5);

  //   light.position.x = parameters.distance * Math.cos(phi);
  //   light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
  //   light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

  //   sky.material.uniforms['sunPosition'].value = light.position.copy(light.position);
  //   water.material.uniforms['sunDirection'].value.copy(light.position).normalize();

  //   cubeCamera.update(renderer, sky); 

  // }

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(210, 100, 80);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);


  var vertexShader = document.getElementById('vertexShader').textContent;
  var fragmentShader = document.getElementById('fragmentShader').textContent;
  var uniforms = {
    "topColor": { value: new THREE.Color(0x0077ff) },
    "bottomColor": { value: new THREE.Color(0xffffff) },
    "offset": { value: 33 },
    "exponent": { value: 0.6 }
  };
  uniforms["topColor"].value.copy(hemiLight.color);
  scene.fog.color.copy(uniforms["bottomColor"].value);
  // updateSun();
  var skyGeo = new THREE.SphereBufferGeometry(40000, 32, 15);
  var skyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
  });
  var sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);


  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  var lightMat = materials.initMaterials('standard', 0xffffff);
  lightMat.transparent = true;
  lightMat.opacity = 0.5;




  // var gui = new dat.GUI();
  // var folder = gui.addFolder('Sky');
  // folder.add(parameters, 'inclination', 0, 0.5, 0.0001).onChange(updateSun);
  // folder.add(parameters, 'azimuth', 0, 1, 0.0001).onChange(updateSun);
  // folder.open();
  // var uniforms = water.material.uniforms;
  // var folder = gui.addFolder('Water');
  // folder.add(uniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
  // folder.add(uniforms.size, 'value', 0.1, 10, 0.1).name('size');
  // folder.add(uniforms.alpha, 'value', 0.9, 1, .001).name('alpha');
  // folder.open();



  return {
    init: function () {
      animate();
      window.onload = function () {
        window.addEventListener('resize', onWindowResize, false);
      }
    }

  }

})(ui, lights, materials);
scene.init();














