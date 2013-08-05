(function(){
    MathVisOOP = function(stageWidth, maxHeight, args){
        var __construct = function(stageWidth, maxHeight, args) {
            self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    MathVisOOP.prototype = {
        group           : null,
        codeText        : null,
        img             : [],
        imageUrl        : [],
        imageSrcs       : [],
        imageCounts     : [],
        tweensArray     : [],
        imgIntegral     : null,
        imgDerivative   : null,
        integral        : null,
        tween           : null,
        tweensObj       : [],
        anim            : null,
        stageWidth      : null, //stageWidth;
        maxHeight       : null, //maxHeight;
        doStart         : false, //if image loads mark this flag

        init : function(stageWidht, maxHeight, args) {
            this.stageWidth = stageWidht;
            this.maxHeight = maxHeight;
            this.create();
        },
        start:function() {
            for(var key in this.tweensArray){
                this.tweenObj = this.tweensArray[key];
                    for(var t in this.tweenObj){
                        this.tweensArray[key][t].play();
                    }
            }
            this.doStart = true;
            return this;
        },
        stop:function(){
            for(var t in this.tweensObj){
                this.tweensObj[t].pause();
            }
            return this;
        },
        remove:function(){
            this.group.remove();
            return this;
        },
        initMove:function(){
            var group = this.group;
            var stageWidht = this.stageWidth;
            var listener = this.callFinished();
            
            this.tween=new Kinetic.Tween({
                node:this.group,
                x:-stageWidth,
                easing: Kinetic.Easings['Linear'],
                duration:5
            });
            this.anim=new Kinetic.Animation(function(frame){
                if(fow===false&&group.getX()+10>stageWidth){
                    listener();             
                }

            },layer);

            return this;
        },
        destr:function(){
            console.log(this.tweensArray);
            for(var tw in this.tweensArray){
                this.tweenObj = this.tweensArray[tw];
                for(var t in this.tweenObj){
                    console.log(this.tweensArray[tw][t]);
                    this.tweensArray[tw][t] = null;
                }
                
            }
            this.tween.reset();
            this.anim.stop();
            this.tween=null;
            this.anim=null;
            this.tweensArray = null;
            return this;
        },
        get:function(){
            return this.group;
        },
        create:function(){
            this.group=new Kinetic.Group({
                x : this.stageWidth*2,
                y : 20,
                draggable : false,
            });
            var group = this.group;
            //get current workin directory getcwd()
            var scripts= document.getElementsByTagName('script');
            var path= scripts[scripts.length-1].src.split('?')[0];      // remove any ?query
            var mydir= path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path

            this.setImages(mydir+'Class/Animation/MathVisOOP/integral.png',5);
            this.setImages(mydir+'Class/Animation/MathVisOOP/derivative.png',3);
            this.setImages(mydir+'Class/Animation/MathVisOOP/equation.png',6);
            this.setImages(mydir+'Class/Animation/MathVisOOP/arcsin.png',4);

           for(var src in this.imageSrcs){
                this.imageUrl[src] = new Image();
                this.imageUrl[src].src = this.imageSrcs[src];//imageUrl=http://localhost/ <> imageSrcs=./
                this.imageSrcs[src] = this.imageUrl[src].src;//imageUrl=http://localhost/ === imageSrcs=imageUrl=http://localhost/
                
                var imageUrl = this.imageUrl;
                var imageCounts = this.imageCounts;
                var objFromImg = this.objFromImg;
                var randTween = this.randTween;
                var tweensArray = this.tweensArray;
                var doStart = this.doStart;
                var start = this.start;
                var setRandPos = this.setRandPos;
                var maxHeight = this.stageWidth;
                var stageWidht = this.stageWidth;
                var setDoStart = this.setDoStart;
                var self = this;
                
                this.imageUrl[src].onload=function(){
                    var allLoaded=true;
                    for(var src in imageUrl){//check all urls is complete true
                        if(!imageUrl[src].complete)allLoaded=false;

                    }
                    if(allLoaded){//if all imgs loaded create objects and tweens
                        for(var key in imageUrl){
                            for(var i=0;i<imageCounts[key];++i){
                                var o=objFromImg(imageUrl[key]);
                                o=setRandPos(o);
                                self.group.add(o);
                                var tw=randTween(o);
                                if(tweensArray[key])tweensArray[key].push(tw);
                                else{
                                    tweensArray[key]=Array();
                                    tweensArray[key].push(tw);
                                }
                            }
                        }
                        if(self.doStart){
                           
                            self.start();
                            self.setDoStart(false);
                        }
                    }
                };
            }
            return this;
        },
        setImages : function(url, count){
            var k=this.imageSrcs.push(url);
            this.imageCounts[--k]=count;
            return this;
        },
        setRandPos : function(obj){
            var xRand=(Math.random() * self.stageWidth)+0;
            var yRand=(Math.random() * self.maxHeight)+0;
            var rot=(Math.random()*1)+0;
            var positive=1;
            if(rot<0.5)positive=-1;
            var scale=1-rot*0.5;
            obj.setX(xRand);
            obj.setY(yRand-obj.getHeight());
            obj.rotate(Math.PI/8*rot*positive);
            obj.setScale(scale);
            return obj;
        },
        objFromImg : function(imag){
            var obj=new Kinetic.Image({      
                image:imag,
                draggable:true
            });
            return obj;
        },
        randTween : function(node){
            var listener = self.callFinished();
            var t=new Kinetic.Tween({
                node:node,
                x:-(self.stageWidth+node.getX())*2,
                easing: Kinetic.Easings['Linear'],
                duration:10,
                onFinish:function(){
                    //finished=true;   
                    listener();
                }
            });
            return t;
        },
        setDoStart : function(val){
           
            this.doStart = val;
        }
    };
    strz_console.Extend(MathVisOOP, strz_console.VisualizationNode);
})();
