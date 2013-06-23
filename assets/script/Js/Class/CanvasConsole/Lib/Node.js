/**
 * to get data inside construction put this.get('atr');
 * 
 * 
 * to get data inside construction from extendable prototype you must first
 * declare them inside construction like that: 
 * strz_console.Node.data and from (namespace.ClassName.Data
 * function in prototype have only by namespace.ClassName.Data 
 * 
 *          OR
 *          
 * use closure...
 * example: E1
 * 
 * 
 * 
 * @returns {undefined}
 */
(function(){
    strz_console.Node=function(obj){};
    strz_console.Node.prototype={
        attrs:{},
        _get:function(attribute){
            return this.attrs[attribute];
        },
        _set:function(attribute, value){
            this.attrs[attribute]=value;
        },
        _initAttrs:function(obj){
            for(var i in obj)this._set(i, obj[i]);
        },
        getWidth:function(){
            return this._get('width');
        },
        setWidth:function(width){
            this._set('width', width);
            return this;
        },
        getHeight:function(){
            return this._get('height');
        },
        setHeight:function(height){
            this._set('height', height);
            return this;
        }
    };
    // ROOT element
})();

/*
 * ad E1:
 * 
 * 
(function(){
    strz_console.Node=function(obj){
        var x=5; //private x
        this.xGetter=function(){ //public
            return x;
        }
    };
    strz_console.Node.prototype={
        //here extensable fields (...)

//when you create child of Node remember to overload not extensable 
//fields (xGetter and x)
        xGet:function(){
            this.xGetter();
        }
    };
})();
 */