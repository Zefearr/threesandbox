class Manager { 
    constructor(){
        this.manager = new THREE.LoadingManager();
        this.events();  
        return this.manager;      
    } 
  
    events() {
        var sceneWindow = document.getElementById('webglWrapper');
        var splashScreen = document.createElement('div');
        this.manager.onStart = function(url, itemsLoaded, itemsTotal)  {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            splashScreen.className = 'splash-screen';
            document.body.appendChild(splashScreen);
            splashScreen.innerHTML = `
            <h3>Loading...</h3>
            <div class="infinityChrome">
    <div></div>
    <div></div>
    <div></div>
</div>

<!-- Safari and others -->
<div class="infinity">
    <div>
        <span></span>
    </div>
    <div>
        <span></span>
    </div>
    <div>
        <span></span>
    </div>
</div>

<!-- Stuff -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
    <defs>
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
        </filter>
    </defs>
</svg>
            `;
            splashScreen.classList.add('loading');
        }
            this.manager.onLoad = function ( ) {
            var splashScreen = document.querySelector('.splash-screen');
            document.body.removeChild(splashScreen);
        }
    }
    
 }
export default Manager;


  
   