/*
 * child of Visualization
 */
(function(run){
    if (typeof(run) === 'undefined') throw new Error('this is just example');
    Example = function(stageWidth, maxHeight, args){
        
        var __construct = function(stageWidth, maxHeight, args){
           self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    Example.prototype = {
        /*
         * Declare here nedded params
         */
        tween   : null,
        anim    : null,
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
            this.tween.play();
            this.anim.start();
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
            this.tween=null;
            this.anim=null;
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
            var listener = this.callFinished(),
                group = this.group,
                stageWidth = this.stageWidth,
                maxHeight = this.maxHeight,
                txt = this.txt;
            
            this.tween=new Kinetic.Tween({
                node:group,
                x:-stageWidth,
                easing: Kinetic.Easings['Linear'],
                duration:5
            });
           
            
            this.anim = new Kinetic.Animation(function(frame){

                if(group.getX() < -(stageWidth - 10)) listener();
                

            }, this.getLayer());
            return this;
        },
        create : function(){
            var maxHeight = this.maxHeight;
            var stageWidth = this.stageWidth;
            var txt = 'abc';
            this.codeText=new Kinetic.Text({
                x:0,
                y:0,
                height:maxHeight,
                text: txt,
                fontSize:17,
                fontFamily:'Courier New',
                fill:'#02ff02'
            });
            this.group=new Kinetic.Group({
                x:stageWidth,
                y:20,
                draggable:true
            });
            this.group.add(this.codeText);
            return this;
        }
    };
    strz_console.Extend(Example, strz_console.VisualizationNode);
});//no run the script
