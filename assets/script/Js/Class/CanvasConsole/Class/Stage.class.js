(function(){
    strz_console.Stage=function(obj){
        var width;
        var height;
        var say=this.sayBow;
        console.log(this);
        var __construct=function(obj){
            width=obj.width;
            height=obj.height;
            console.log(this); 
            say();
        };
        __construct(obj);
        
        
        
    };
    strz_console.Stage.prototype={
        sayBow:function(){
            alert('bow wow1');
        }
    };
})();