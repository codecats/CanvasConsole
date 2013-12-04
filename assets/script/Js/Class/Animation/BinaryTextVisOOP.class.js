/*
 * child of Visualization
 */
(function(){
    BinaryTextVisOOP = function(stageWidth, maxHeight, args){
        
        var __construct = function(stageWidth, maxHeight, args){
           self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    BinaryTextVisOOP.prototype = {

        codeText : null,
        codeBgText : null,
        tween : null,
        tweenBg : null,
        anim : null,
        fow : true,
        txt : null,
        
        init : function(stageWidht, maxHeight, args){
            this.stageWidth=stageWidth;
            this.maxHeight=maxHeight;
            this.txt=Convert.toBinary(document.documentElement.innerHTML,5);
            this.create();
        },
        start : function(){
            this.tween.play();
            this.tweenBg.play();
            this.anim.start();
            return this;
        },
        stop : function(){
            this.tween.reset();
            return this;
        },
        remove : function(){
            this.group.remove();
            return this;
        },
        destr : function(){
            this.tween.reset();
            this.tweenBg.reset();
            this.anim.stop();
            this.tween=null;
            this.tweenBg=null;
            this.anim=null;
        },
        get : function(){
            return this.group;
        },
        initMove : function(){
            var listener = this.callFinished();
            var fow = this.fow;
            var group = this.group;
            var stageWidth = this.stageWidth;
            var maxHeight = this.maxHeight;
            var txt = this.txt;
            var codeBgText = this.codeBgText;
            
            this.tween=new Kinetic.Tween({
                node:group,
                x:-stageWidth,
                easing: Kinetic.Easings['Linear'],
                duration:5
            });
            this.tweenBg=new Kinetic.Tween({
                node:codeBgText,
                x:-stageWidth,
                easing: Kinetic.Easings['Linear'],
                duration:3
            });
            var tween = this.tween;
            var tweenBg = this.tweenBg;
            
            this.anim=new Kinetic.Animation(function(frame){

                if(group.getX()<-(stageWidth-10)&&fow===true){
                    tween.reverse();
                    tweenBg.reverse();
                    fow=false;
                    var gwidth=group.getWidth()*2;
                    var gx=0;
                    var gheight=maxHeight;
                    var gy=0;
                    for(var i=0;i<40;++i){
                        xPos=Math.floor((Math.random()*gwidth)+gx);
                        yPos=Math.floor((Math.random()*gheight)+gy);
                        var t=new Kinetic.Text({
                            x:xPos,
                            y:yPos,
                            text: txt.substr(i,i+4),
                            fontSize:12,
                            fontFamily:'Courier New',
                            fill:'#02ff02'
                        });
                        group.add(t);
                    }
                }
                if(fow===false&&group.getX()+10>stageWidth){
                    listener();
                }

            }, this.getLayer());
            return this;
        },
        create : function(){
            var maxHeight = this.maxHeight;
            var stageWidth = this.stageWidth;
            var txt = this.txt;
            this.codeText=new Kinetic.Text({
                x:0,
                y:0,
                height:maxHeight,
                text: txt,
                fontSize:17,
                fontFamily:'Courier New',
                fill:'#02ff02'
            });
            this.codeBgText=new Kinetic.Text({
                x:0,
                y:0,
                height:maxHeight,
                text: txt,
                fontSize:17,
                fontFamily:'Courier New',
                fill:'#02ff02'
            });
            this.codeBgText.setX(this.codeText.getX()-1);
            this.group=new Kinetic.Group({
                x:stageWidth,
                y:20,
                draggable:true
            });
            this.group.add(this.codeText).add(this.codeBgText);
            return this;
        }
    };
    strz_console.Extend(BinaryTextVisOOP, strz_console.VisualizationNode);
})();
