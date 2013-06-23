(function(){
    strz_console.NodeChild=function(obj){
        var x=15;
      /*  this.g=function(){
            alert(x);
        }*/
        this.xGetter=function(){
            alert(x);
        }
    };
    //in prototype of parent should be function which calls this.xGetter();
    strz_console.NodeChild.prototype={};

    strz_console.Extend(strz_console.NodeChild, strz_console.Node);
})();

/* this is the parent
(function(){
    strz_console.Node=function(obj){
        var x=5; //private x
        this.xGetter=function(){ //public
            return x;
        }
    };
    strz_console.Node.prototype={
        xGet:function(){
            this.xGetter();
        }
    };
})();
*/