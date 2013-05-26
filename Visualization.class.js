/*
 * extendable method
 */

function Visualization(){
    /*
     * start kinetic.animation or/and kinetic.tween
     * @returns {Visualization}
     */
    this.start=function(){
        alert('visualization started');
        return this;
    };
    /*
     * stop kinetic.animation or/and kinetic.tween
     * @returns {Visualization}
     */
    this.stop=function(){
        alert('visualization stopped');
        return this;
    };
    /*
     * removes Kinetic.group from layer
     * @returns {Visualization}
     */
    this.remove=function(){
        alert('removed from layer');
        return this;
    };
    /*
     * create all tweens and animation after add objects to layer (KineticJS condition)
     * @returns {Visualization}
     */
    this.init=function(){
        return this;
    };
    /*
     * destroy all tweens and animation
     * @returns {Visualization}
     */
    this.destr=function(){
        return this;
    };
    /*
     * 
     * @returns {unresolved}
     */
    this.get=function(){
        alert('get');
        return null;
    };
    /*
     * private function, create the group with objects
     * @return Kinetic.Group
     */
    var create=function(){
        return this;
    };
}

