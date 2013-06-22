/*Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}*/
var ORDERS={
    2:'PLAY',
    3:'ANIM',
    4:'MUZ',
    5:'MUZ STOP',
    6:'ANIM R',
    7:'VIS',
    8:'VIS R',
    getKey:function(val){
        for(var prop in this){
            if(this.hasOwnProperty(prop)){
                if(this[prop]===val)return prop;
            }
        }
    }
};


