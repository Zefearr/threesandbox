import slider from './modules/slider';
import Mobile from './modules/mobile';
import Reveal from './modules/reveal';
import StickyHeader from './modules/stickyheader';
import Contacts from './modules/contacts'; 
 

var mobile = new Mobile();
var Slider = new slider(); 
// var reveal = new Reveal();
new Reveal(document.querySelectorAll('.tastes-section-item'), '60%'); 
new Reveal(document.querySelectorAll('.slider-section-item'), '60%');
new Reveal(document.querySelectorAll('.testimonials__item'), '60%');
var stickyHeader = new StickyHeader();
var contacts = new Contacts();


