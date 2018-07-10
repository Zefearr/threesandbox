import slider from './modules/slider';
import Mobile from './modules/mobile';
import Reveal from './modules/reveal';


var mobile = new Mobile();
var Slider = new slider(); 
// var reveal = new Reveal();
new Reveal(document.querySelectorAll('.tastes-section-item'), '50%');
new Reveal(document.querySelectorAll('.slider-section-item'), '50%');
new Reveal(document.querySelectorAll('.testimonials__item'), '60%');


