import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';


class StickyHeader {
    constructor() {
        this.HTML = $('html, body');
        this.siteHeader = document.querySelector('.site-header');
        this.headerTrigger = document.querySelector('.main-banner__text-content');
        this.slideDownTrigger = document.querySelector('.main-banner__text-content h3');
        this.pageSections = document.querySelectorAll('.page-section');
        this.headerLinks = document.querySelectorAll('.main-nav__list a');
        this.hLinks = $('.main-nav__list a');
        this.scrollToTopArrow = document.querySelector('.scroll-to-top');
        this.headerWayPoint();
        this.slideDownWaypoint();
        this.pageSectionWaypoints();
        this.addSmothScrolling();
        this.events();
    }
   
    scrolltotop() {
        this.HTML.animate({scrollTop : 0}, 800);
     }
     events() {
        this.scrollToTopArrow.addEventListener('click', this.scrolltotop.bind(this)); 
    }
    headerWayPoint() {
        if (this.siteHeader.classList.contains('site-header--fixed')) {
            this.siteHeader.classList.remove('site-header--fixed');
        }
        var that = this;
        new Waypoint({
            element: this.headerTrigger,
            handler: function (direction) {
                if (direction == 'down') {
                    that.siteHeader.classList.add('site-header--fixed');
                } else {
                    that.siteHeader.classList.remove('site-header--fixed');

                }
            }
        })
    }
    addSmothScrolling() {
     this.hLinks.smoothScroll();
    
    }
    slideDownWaypoint() {
        var that = this;
        new Waypoint({
            element: this.slideDownTrigger,
            handler: function (direction) {
                if (direction == 'down') {
                    that.siteHeader.classList.add('site-header--fixed-slidedown');
                } else {
                    that.siteHeader.classList.remove('site-header--fixed-slidedown');

                }
            },
            offset: '-10%'
        })

    }

    pageSectionWaypoints() {
        var that = this; 
        for (let i = 0; i < this.pageSections.length; i++) {
            let current = this.pageSections[i];
            new Waypoint({
                element: current,
                handler: function(direction) {
                    if(direction == 'down') {
                        let matchingLink = current.getAttribute('data-link');
                        let currentLink = document.querySelector(matchingLink);
                        for (let x = 0; x < that.headerLinks.length; x++) {
                            that.headerLinks[x].classList.remove('active-link');
                        }
                        currentLink.classList.add('active-link');
                    }    
                },
                offset: '30%'
            });

            new Waypoint({
                element: current,
                handler: function(direction) {
                    if(direction == 'up') {
                        let matchingLink = current.getAttribute('data-link');
                        let currentLink = document.querySelector(matchingLink);
                        for (let x = 0; x < that.headerLinks.length; x++) {
                            that.headerLinks[x].classList.remove('active-link');
                        }
                        currentLink.classList.add('active-link');
                    }    
                },
                offset: '-20%'
            });
        }
    }
}
export default StickyHeader;