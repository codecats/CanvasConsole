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
        logo    : {
            git     : {},
            php     : {},
            mysql   : {},
            jquery  : {},
            linux   : {},
            symfony : {},
            www     : {}
        },
        group   : null,
        /*
         * Initialize basic params (declared before)
         */
        init : function(stageWidth, maxHeight, args){
            this.stageWidth     = stageWidth;
            this.maxHeight      = maxHeight;
            this.create();
        },
                
        /*
         * Animations / tweens starts here
         */
        start : function(){
            for (var i in this.logo) {
                if (typeof(this.logo[i].tween) !== 'undefined')
                this.logo[i].tween.play();
            }
            return this;
        },
                
        /*
         * Stop animations or tweens here
         */
        stop : function(){

            for (var i in this.logo) {
                if (typeof(this.logo[i].tween) !== 'undefined')
                    this.logo[i].tween.reset();
            }
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
            this.stop();
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
            var listener = this.callFinished();
            for (var i in this.logo) {
                if (i !== 'www') {
                    this.logo[i]['tween'] = new Kinetic.Tween({
                        node    : this.logo[i].image,
                        easing  : Kinetic.Easings.ElasticEaseIn,
                        x       : Math.floor((Math.random() * this.stageWidth) + 0),
                        y       : Math.floor((Math.random() * this.maxHeight) + 0),
                        duration: 4,
                        onFinish: function () {listener()}
                    });
                }
                
            }
            return this;
        },
        create : function(){
            var maxHeight   = this.maxHeight,
                stageWidth  = this.stageWidth,
                dir         = this._get('baseDir') + '/',
                me          = this;
        
            this.group = new Kinetic.Group({
                x           : 0,
                y           : 0,
                draggable   : true
            });

            var image = {};
            for (var i in this.logo) {
                var imageSrc = dir + 'Class/Visualization/Tech/min/' + i + '.png';
                image[i] = new Image();
                image[i].setAttribute('rel', i);
                image[i].src = imageSrc;

                image[i].onload = function () {
                    var id = this.getAttribute('rel');
                    if (id === 'www') {
                        var posCenter = me.getCenter(me.logo[id].image);
                        
                        me.logo[id].image.setX(posCenter.x);
                        me.logo[id].image.setY(posCenter.y);
                    }
                };
                
                this.logo[i]['image'] = new Kinetic.Image({
                    image       : image[i],
                    draggable   : true,
                    x : Math.floor((Math.random() * this.stageWidth) + 0),
                    y : Math.floor((Math.random() * this.maxHeight) + 0)
                });
 
                this.group.add(this.logo[i].image);
            }
            
            return this;
        },
        getCenter : function(object) {
            var x = this.stageWidth / 2 - object.getWidth() / 2,
                y = this.maxHeight / 2 - object.getHeight() / 2;

            return {
                x : x,
                y : y
            };
        }
    };
    strz_console.Extend(strzVis.Tech, strz_console.VisualizationNode);
})();
