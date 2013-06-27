(function(){
    strz_console.ConsoleOrder=function(lay){
        var self=this;
        var __construct=function(layer){
         
        };
        __construct(lay);
    };
    strz_console.ConsoleOrder.prototype={
        _order:null,
        setOrder:function(val){
            this._order=val;
        },
        getOrder:function(){
            return this._order;
        },
        clearOrder:function(){
            this._order=0;
            return this;
        }
    };
    strz_console.Extend(strz_console.ConsoleOrder, strz_console.ConsoleText);
})();
