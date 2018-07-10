import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class Reveal {
    constructor(els, offset) {
        this.itemsToReveal = els;
        this.hideInitially();
        this.offsetP = offset;
        this.createWaypoints();
        
    }
    hideInitially() {
        for(let i = 0; i < this.itemsToReveal.length; i++) {
            let item = this.itemsToReveal[i];
            item.classList.add('reveal-item');
        }
    }

    createWaypoints() {
        var that = this;
        for(let i = 0; i < this.itemsToReveal.length; i++) {
            let item = this.itemsToReveal[i];
           new Waypoint({
               element: item,
               handler: function() {
                item.classList.add('reveal-item--is-visible'); 
               
               },
               offset: that.offsetP 
           });
        }
    }

}
export default Reveal;