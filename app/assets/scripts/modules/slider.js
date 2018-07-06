class slider {
    constructor() {
        this.wrapper = document.getElementById('slider-container');
        this.handler = document.querySelector('.handle');
        this.topLayer = document.querySelector('.layer-top'); 

       
        this.events(); 
      
     }
     events() { 
        if(typeof(this.wrapper) != 'undefined' && this.wrapper != null) { 
            this.wrapper.addEventListener('mousemove', this.initSlider.bind(this));

        }
     }
     initSlider(e) {
        let delta = 0;
        let position = this.wrapper.getBoundingClientRect().left;
        delta = e.clientX - position;  
        this.handler.style.left = delta + 'px';  
        this.topLayer.style.width = delta + 'px'; 
     }
}
export default slider;  