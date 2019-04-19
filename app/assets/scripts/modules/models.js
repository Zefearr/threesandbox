import {materials} from './materials';
import Manager from './manager';
const manager = new Manager();
export const models = (function(){
  var loader = new THREE.FBXLoader(manager);
  var textureLoader = new THREE.TextureLoader(manager);
  return {
    getBox: function(material, w, h, d) { 
      var geometry = new THREE.BoxGeometry(w, h, d);
      var obj = new THREE.Mesh(geometry, material);
      obj.castShadow = true;
      return obj;
  },
  getText: function() {
    var platformGrp = new THREE.Group();
    platformGrp.name = 'platform';
    var platformMaterial = materials.initMaterials('standard', 0xffffff);  
  

    loader.load('./assets/models/station.fbx', function(object){
     object.material = platformMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
     object.castShadow = true;
     object.receiveShadow = true;
     object.position.y = 0.7;
     platformMaterial.map = textureLoader.load('./assets/images/platform_diffuse.png');
     platformMaterial.roughnessMap = textureLoader.load('./assets/images/platform_specular.tga');

     platformMaterial.normalMap = textureLoader.load('./assets/images/platform_normal.png');
     platformMaterial.normalScale = new THREE.Vector2( 0.5, 0.5 );

     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = platformMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     platformGrp.add(object);
    });
    platformGrp.position.y = 3.4;
   
    return platformGrp;
  },
  getSpusk: function() {
    var spuskGrp = new THREE.Group();
    spuskGrp.name = 'spuskGrp';
    var spuskMaterial = materials.initMaterials('standard','white');  
  

    loader.load('./assets/models/spusk.fbx', function(object){
     object.material = spuskMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
     object.position.y = 0.7;
     spuskMaterial.side = THREE.DoubleSide;
     spuskMaterial.map = textureLoader.load('./assets/images/spusk_lambert1_BaseColor.png');
    //  spuskMaterial.roughnessMap = textureLoader.load('./assets/images/spusk_lambert1_Roughness.png');
     spuskMaterial.normalMap = textureLoader.load('./assets/images/spusk_lambert1_Normal.png');
     spuskMaterial.roughness = 1;

     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = spuskMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     spuskGrp.add(object);
    });
    spuskGrp.position.y = 3.4;
    
    return spuskGrp;
  },
  getFence: function() {
    var fenceGrp = new THREE.Group();
    fenceGrp.name = 'fenceGrp';
    var fenceMaterial = materials.initMaterials('standard', 'white');  
  

    loader.load('./assets/models/fence.fbx', function(object){
     object.material = fenceMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
     object.position.y = 0.7;
     object.castShadow = true;
     object.receiveShadow = true;
    //  fenceMaterial.side = THREE.DoubleSide;
     fenceMaterial.map = textureLoader.load('./assets/images/fence_lambert6_BaseColor.png');
    //  fenceMaterial.roughnessMap = textureLoader.load('./assets/images/fence_lambert6_BaseColor_SPEC.png');
    fenceMaterial.roughness = 1;
     fenceMaterial.normalMap = textureLoader.load('./assets/images/fence_lambert6_Normal.png');
     fenceMaterial.aoMap = textureLoader.load('./assets/images/fence_lambert6_AO.png');
    //  fenceMaterial.roughness = 1;

     fenceMaterial.normalScale = new THREE.Vector2( 1,1 );
     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = fenceMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     fenceGrp.add(object);
    });
    fenceGrp.position.y = 3.4;
    
    return fenceGrp;
  },
   getTrain: function() {
    var trainGrp = new THREE.Group();
    trainGrp.name = 'trainGrp';
    var trainMaterial = materials.initMaterials('standard', 'white');  
  

    loader.load('./assets/models/train_test.fbx', function(object){
     object.material = trainMaterial;
     object.scale.x = 0.1;
     object.scale.y = 0.1;
     object.scale.z = 0.1;
    
    //  fenceMaterial.side = THREE.DoubleSide;
    trainMaterial.map = textureLoader.load('./assets/images/train_test_blinn1_BaseColor.png');
    trainMaterial.roughnessMap = textureLoader.load('./assets/images/train_test_blinn1_Roughness.png');
    trainMaterial.normalMap = textureLoader.load('./assets/images/train_test_blinn1_Normal.png');
    // trainMaterial.aoMap = textureLoader.load('./assets/images/fence_lambert6_AO.png');
    //  fenceMaterial.roughness = 1;

    trainMaterial.normalScale = new THREE.Vector2( 1,1 );
     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = trainMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     trainGrp.add(object);
    });
    trainGrp.position.y = 0.2;
    trainGrp.position.z = 15;
    trainGrp.position.x = 60;
    
    return trainGrp;
   }
  }
})()