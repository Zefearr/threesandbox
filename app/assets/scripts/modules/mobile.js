class Mobile {
    constructor() {
        this.menuIcon = document.querySelector('.menu-icon');
        this.mobileMenu = document.querySelector('.main-nav');
        this.events();
       
    }
    events() {
        this.menuIcon.addEventListener('click', this.toggleMenu.bind(this));  
    }
    toggleMenu() {
        this.mobileMenu.classList.toggle('main-nav--expanded');
        this.menuIcon.classList.toggle('menu-icon--close-x');
    }
}
export default Mobile;