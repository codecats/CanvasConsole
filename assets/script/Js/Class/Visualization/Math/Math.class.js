/*
 * Child of Visualization.
 * 
 * IMPORTANT: do not use array.push(kinetic.object) it make layer errors
 */
(function(){
    strzVis.Math = function(stageWidth, maxHeight, args){
        
        var __construct = function(stageWidth, maxHeight, args){
           self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    strzVis.Math.prototype = {

        imageIntegral   : [],
        tweenIntegral   : [],
        integralCount   : 2,
        
        imageDerivative : [],
        tweenDerivative : [],
        derivativeCount : 3,
        
        imageEquation   : [],
        tweenEquation   : [],
        equationCount   : 3,
        
        imageArcsin     : [],
        tweenArcsin     : [],
        arcsinCount     : 5,
        

        
        init : function(stageWidht, maxHeight, args){
            this.stageWidth=stageWidth;
            this.maxHeight=maxHeight;
            this.create();
        },
        start : function(){
            for(var i in this.tweenIntegral){
                this.tweenIntegral[i].play();
            }
            for(var i in this.tweenDerivative){
                this.tweenDerivative[i].play();
            }
            for(var i in this.tweenEquation){
                this.tweenEquation[i].play();
            }
            for(var i in this.tweenArcsin){
                this.tweenArcsin[i].play();
            }
            return this;
        },
        stop : function(){
          //  this.tween.reset();
            for(var i in this.tweenIntegral){
                this.tweenIntegral[i].reset();
            }
            for(var i in this.tweenDerivative){
                this.tweenDerivative[i].reset();
            }
            for(var i in this.tweenEquation){
                this.tweenEquation[i].reset();
            }
            for(var i in this.tweenArcsin){
                this.tweenArcsin[i].reset();
            }
            return this;
        },
        remove : function(){
            this.group.remove();
            return this;
        },
        destr : function(){
            this.stop();
        },
        get : function(){
            return this.group;
        },
        initMove : function(){
            //call it when sequention is finish
            var listener = this.callFinished();
            // Base speed duration
            var speed = 10;
                
            for(var i in this.imageIntegral){
                this.tweenIntegral[i] = new Kinetic.Tween({
                    node : this.imageIntegral[i],
                    //finish at 
                    x : -(this.stageWidth+this.imageIntegral[i].getX())*2,
                    easing : Kinetic.Easings['Linear'],
                    duration : speed + ((Math.random()*5)+0),
                    onFinish : function(){
                        listener();
                    }
                });
            }
            
            for(var i in this.imageDerivative){
                this.tweenDerivative[i] = new Kinetic.Tween({
                    node : this.imageDerivative[i],
                    //finish at 
                    x : -(this.stageWidth+this.imageDerivative[i].getX())*2,
                    easing : Kinetic.Easings['Linear'],
                    duration : speed + ((Math.random()*5)+0),
                    onFinish : function(){
                        listener();
                    }
                });  
            }
            
            for(var i in this.imageEquation){
                this.tweenEquation[i] = new Kinetic.Tween({
                    node : this.imageEquation[i],
                    //finish at 
                    x : -(this.stageWidth+this.imageEquation[i].getX())*2,
                    easing : Kinetic.Easings['Linear'],
                    duration : speed + ((Math.random()*5)+0),
                    onFinish : function(){
                        listener();
                    }
                });  
            }

            for(var i in this.imageArcsin){                
                this.tweenArcsin[i] = new Kinetic.Tween({
                    node : this.imageArcsin[i],
                    //finish at 
                    x : -(this.stageWidth+this.imageArcsin[i].getX())*2,
                    easing : Kinetic.Easings['Linear'],
                    duration : speed + ((Math.random()*5)+0),
                    onFinish : function(){
                        listener();
                    }
                });  
            }

            this.start();
            return this;
        },
        create : function(){
            var maxHeight = this.maxHeight;
            var stageWidth = this.stageWidth;
            /*
             * Group of content, all content animation has to be in this group
             */
            this.group=new Kinetic.Group({
                x:stageWidth*1,
                y:50,
                draggable:true
            });
                       
            var mydir= this._get('baseDir') + '/';

            /**
             * Creating the integrals
             */
            var imageSrc = mydir + 'Class/Visualization/Math/integral.png';
            var image = new Image();
            image.src = imageSrc;
            
            /*
             * Kinetic objects for given count of integral.
             */
            for(var i = 0; i < this.integralCount; i++){

                this.imageIntegral[i] = new Kinetic.Image({
                    image:image,
                    draggable:true
                });
                this.setRandPos(this.imageIntegral[i]);
                this.group.add(this.imageIntegral[i]);
            }
            
            /*
             * Creating the derivatives
             */
            imageSrc = mydir + 'Class/Visualization/Math/derivative.png';
            image = new Image();
            image.src = imageSrc;
            
            for(var i = 0; i < this.derivativeCount; i++){

                this.imageDerivative[i] = new Kinetic.Image({
                    image:image,
                    draggable:true
                });
                this.setRandPos(this.imageDerivative[i]);
                this.group.add(this.imageDerivative[i]);
            }
            
            /*
             * Creating the Equation
             */
            imageSrc = mydir + 'Class/Visualization/Math/equation.png';
            image = new Image();
            image.src = imageSrc;
            
            for(var i = 0; i < this.equationCount; i++){

                this.imageEquation[i] = new Kinetic.Image({
                    image:image,
                    draggable:true
                });
                this.setRandPos(this.imageEquation[i]);
                this.group.add(this.imageEquation[i]);
            }
            
            /*
             * Creating the Arcsin
             */
            imageSrc = mydir + 'Class/Visualization/Math/arcsin.png';
            image = new Image();
            image.src = imageSrc;
            
            for(var i = 0; i < this.arcsinCount; i++){

                this.imageArcsin[i] = new Kinetic.Image({
                    image:image,
                    draggable:true
                });
                this.setRandPos(this.imageArcsin[i]);
                this.group.add(this.imageArcsin[i]);
            }
           

            return this;
        },
                
        /**
         * Sets random rotation (base is Math.PI/8), scale object (from 0.6 to 1)
         * and make starting points
         * 
         * @param Kinetic.object obj
         * @returns {_L4.SimpleVisOOP.prototype}
         */
        setRandPos : function(obj){
            // Relative to group position, max: stageWidth+group.getX()
            var xRand=(Math.random() * this.stageWidth)+0;
            var yRand=(Math.random() * this.maxHeight)+0;
            // rot from 0 to 1
            var rot=(Math.random()*1)+0;
            var positive=1;//rot clockvise or anticlockvise
            if(rot<0.5)positive=-1;
            //scale min 1-1*0.6 = 0.4
            var scale=1-rot*0.6;
            obj.setX(xRand);
            obj.setY(yRand-obj.getHeight());
            obj.rotate(Math.PI/8*rot*positive);
            obj.setScale(scale);
            return this;
        }
    };
    strz_console.Extend(strzVis.Math, strz_console.VisualizationNode);
})();
