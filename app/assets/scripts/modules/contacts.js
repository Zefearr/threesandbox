class Contacts {
    constructor() {
        this.contactWindow = document.querySelector('.contacts');
        this.openContactBtn = document.getElementById('contact-open');
        this.closeOvBtn = document.querySelector('.contacts span');
        this.header = document.querySelector('.site-header');
        this.ModalOv = document.querySelector('.contacts__content'); 
        this.mainBody = document.body;
        this.winDow = window;
        this.isOverlayOpen = false;
        
        this.events();
      
    }
    events() {
        this.openContactBtn.addEventListener('click', this.OpenOv.bind(this));
        this.closeOvBtn.addEventListener('click', this.closeOv.bind(this));
        this.mainBody.addEventListener("keyup", this.handler.bind(this)); 
        this.ModalOv.addEventListener('click', this.closeBy.bind(this));
     
    }

 

 

    handler(e) {  
    if(e.keyCode === 27) {
        this.closeOv();
        this.isOverlayOpen = false;
       
    }
       
    }
    closeBy(e) {
        if(e.target.classList.contains('contacts__content')) { 
            this.closeOv();
        }
    }
 
        
     
        
  
    OpenOv(e) {
        e.preventDefault();
        this.contactWindow.classList.add('contacts--opened');
        this.mainBody.classList.add('no-scroll');
        this.isOverlayOpen = true;
      
        
    }
    closeOv() {
        if(this.contactWindow.classList.contains('contacts--opened')) {
            this.contactWindow.classList.remove('contacts--opened');
            this.isOverlayOpen = false; 
            this.mainBody.classList.remove('no-scroll');
        }  
      
    }
  
}
export default Contacts;