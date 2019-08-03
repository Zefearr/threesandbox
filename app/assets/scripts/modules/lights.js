export const lights = (function() {
  return {
    getDirectionalLight: function(intensity) {
      var light = new THREE.DirectionalLight(0xffffe6, intensity);
      light.castShadow = true;
      light.shadow.camera.left = -20;
      light.shadow.camera.bottom = -20;
      light.shadow.camera.right = 20;
      light.shadow.camera.top = 20; 
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      return light;
    },
  
    getSpotLight:  function(intensity) {
      var light = new THREE.PointLight(0xffffe6, intensity); 
      light.castShadow = true;
      light.shadow.bias = 0.001;

      light.castShadow = true;
      light.shadow.camera.left = -20;
      light.shadow.camera.bottom = -20;
      light.shadow.camera.right = 20;
      light.shadow.camera.top = 20; 
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      return light;
    },
    getPointLight: function(intensity) {
      var light = new THREE.PointLight('white', intensity);
      // light.castShadow = true;
      return light;
    },
     getAmbientLight: function(intensity) {
        var light = new THREE.AmbientLight(0x81AECB, intensity);  
        return light;
     }
  }
})()