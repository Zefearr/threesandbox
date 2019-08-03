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
  getSphere: function(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    // obj.castShadow = true;
    // obj.receiveShadow = true;
    return obj; 
},
  // getText: function() {
  //   var platformGrp = new THREE.Group();
  //   platformGrp.name = 'platform';
  //   var platformMaterial = materials.initMaterials('standard', 0xffffff);  
  

  //   loader.load('./assets/models/station.fbx', function(object){
  //    object.material = platformMaterial;
  //    object.scale.x = 1;
  //    object.scale.y = 1;
  //    object.scale.z = 1;
  //    object.castShadow = true;
  //    object.receiveShadow = true;
  //    object.position.y = 0.7;
  //    platformMaterial.map = textureLoader.load('./assets/images/station_lambert1_AlbedoTransparency.png');
  //   //  platformMaterial.specularMap = textureLoader.load('./assets/images/station_lambert1_MetallicSmoothness.png');
  //   //  platformMaterial.aoMap = textureLoader.load('./assets/images/station_lambert1_MetallicSmoothness.png');
   
  //    platformMaterial.normalMap = textureLoader.load('./assets/images/station_lambert1_Normal.png');
  //    platformMaterial.normalScale = new THREE.Vector2( 0.3, 0.3 );
   
  //    object.traverse(function(child){
  //      if (child instanceof THREE.Mesh) {
  //        child.material = platformMaterial;
  //        child.castShadow = true;
  //        child.receiveShadow = true;
  //      }
  //    });
   
  //    platformGrp.add(object);
  //   });
  //   platformGrp.position.y = 3.4;
   
  //   return platformGrp;
  // },
  getGlass: function() {
    var glassGrp = new THREE.Group();
    glassGrp.name = 'windows';
    var glassMaterial = materials.initMaterials('standard', 0xffffff);  
    glassMaterial.transparent = true;
    glassMaterial.opacity = 0.7;
    glassMaterial.side = THREE.DoubleSide;
    loader.load('./assets/models/glasses.fbx', function(object){
     object.material = glassMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
  
    
  
   
     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = glassMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     glassGrp.add(object);
    });
   
   
    return glassGrp;
  },
  getInsidePart: function() {
    var insidePartGrp = new THREE.Group();
    insidePartGrp.name = 'insidePartGrp';
    var insideMaterial = materials.initMaterials('phong','white');  
    insideMaterial.map = textureLoader.load('./assets/images/textures/inside_part_unity_shader_lambert13_AlbedoTransparency.png');
    
    insideMaterial.metalnessMap = textureLoader.load('./assets/images/textures/inside_part_unity_shader_lambert13_MetallicSmoothness.png');
    insideMaterial.normalMap = textureLoader.load('./assets/images/textures/inside_part_unity_shader_lambert13_Normal.png');
    insideMaterial.normalScale = new THREE.Vector2(0.2,0.2);
 

    loader.load('./assets/models/inside_part3.fbx', function(object){
     object.material = insideMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
    
     insideMaterial.side = THREE.DoubleSide;
   
    insideMaterial.roughness = 1;

     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = insideMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     insidePartGrp.add(object);
    });
   
    
    return insidePartGrp;
  },
  loadPlatform: function() {
    var platformGrp = new THREE.Group();
    platformGrp.name = 'platformGrp';
    var platformMat = materials.initMaterials('standard', 'white');  
  

    loader.load('./assets/models/platform.fbx', function(object){
     object.material = platformMat;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
     object.position.y = 0.7;
     object.castShadow = true;
     object.receiveShadow = true;
  
    platformMat.map = textureLoader.load('./assets/images/textures/platform_lambert16_AlbedoTransparency.png');
    platformMat.metalnessMap = textureLoader.load('./assets/images/textures/platform_lambert16_MetallicSmoothness.png');
    platformMat.roughness = 1;
    platformMat.normalMap = textureLoader.load('./assets/images/textures/platform_lambert16_Normal.png');
    
   

    platformMat.normalScale = new THREE.Vector2( 1,1 );
     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = platformMat;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     platformGrp.add(object);
    });
    platformGrp.position.y = 3.4;
    
    return platformGrp;
  },
  getRoad: function() {
    var roadGrp = new THREE.Group();
    var roadGrpMaterial = materials.initMaterials('standard', 0xffffff);  
    loader.load('./assets/models/road_part.fbx', function(object){
      // mixer = new THREE.AnimationMixer(object);
      // trainAni = mixer.clipAction(object.animations[0]);
      // trainAni.play();
     object.material = roadGrpMaterial;
     object.scale.x = 1;
     object.scale.y = 1;
     object.scale.z = 1;
     roadGrpMaterial.metalness = 0.5;
     roadGrpMaterial.map = textureLoader.load('./assets/images/textures/formd_lambert1_BaseColor.png');
     roadGrpMaterial.roughnessMap = textureLoader.load('./assets/images/textures/formd_lambert1_Roughness.png');
     roadGrpMaterial.metalnessMap = textureLoader.load('./assets/images/textures/formd_lambert1_Metallic.png');
     roadGrpMaterial.normalMap = textureLoader.load('./assets/images/textures/formd_lambert1_Normal.png');
     roadGrpMaterial.heightMap = textureLoader.load('./assets/images/textures/formd_lambert1_Height.png');
     object.castShadow = true;
     object.receiveShadow = true;
     object.traverse(function(child){
       if (child instanceof THREE.Mesh) {
         child.material = roadGrpMaterial;
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   
     roadGrp.add(object);
    
    
    });
    return roadGrp;
  
  }
  
  }
})()