/*
 * child of Visualization
 */
(function(){

    strzVis.Tech = function(stageWidth, maxHeight, args){
        
        var __construct = function(stageWidth, maxHeight, args){
           self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    strzVis.Tech.prototype = {
        /*
         * Declare here nedded params
         */
        logo   : {
            git     : {},
            php     : {},
            mysql   : {},
            jquery  : {},
            linux   : {},
            symfony : {},
            www     : {}
        },

        /*
         * Initialize basic params (declared before)
         */
        init : function(stageWidht, maxHeight, args){
            this.stageWidth     = stageWidth;
            this.maxHeight      = maxHeight;
            this.create();
        },
                
        /*
         * Animations / tweens starts here
         */
        start : function(){
 
            return this;
        },
                
        /*
         * Stop animations or tweens here
         */
        stop : function(){
            this.tween.reset();
            return this;
        },
                
        /*
         * Remove objects from layer - remove is called after destr
         */
        remove : function(){
            this.group.remove();
            return this;
        },
                
        /*
         * Destroy / Stop objects move, destr is called before destr
         */
        destr : function(){
            this.tween.reset();
            this.anim.stop();
            this.tween  = null;
            this.anim   = null;
        },
                
        /*
         * Return object of visualization
         */
        get : function(){
            return this.group;
        },
                
        /*
         * Init move and behavior for animations / tweens objects here,
         * remember: trigger for run animation should be method start
         */
        initMove : function(){
            
            return this;
        },
        create : function(){
            var maxHeight   = this.maxHeight,
                stageWidth  = this.stageWidth,
                dir         = this._get('baseDir') + '/';
        
            this.group = new Kinetic.Group({
                x           : 0,
                y           : 0,
                draggable   : true
            });
            bug.d({lo:this.logo}, false);
            var image = {};
            for (var i in this.logo) {
                var imageSrc = dir + 'Class/Visualization/Tech/min/' + i + '.jpeg';
                image[i] = new Image();
                image[i].src = imageSrc;
            }
            
            bug.d({i:image});
            return this;
        }
    };
    strz_console.Extend(strzVis.Tech, strz_console.VisualizationNode);
})();
