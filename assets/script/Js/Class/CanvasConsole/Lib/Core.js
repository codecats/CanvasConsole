/** 
 * namespace and extending method
 */
var strz_console={};
(function(){
    /**
     * prototype base extending: public, private and privileged/closure fields
     *                           uber fields it is parent class, the same as:
     *                           PHP parent field or Java super field.
     * @param {object} child copy of parent prototype (if not exist) 
     *                          to own prototype
     * @param {object} parent
     *                           
     */
    strz_console.Extend=function(child, parent){
        for(var i in parent.prototype){
            if((child.prototype.hasOwnProperty(i)===false))
                child.prototype[i]=parent.prototype[i];  
        }
        child.prototype.uber=parent.prototype;
    };
})();