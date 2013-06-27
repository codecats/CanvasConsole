(function(){
    strz_console.ConsoleModel=function(lay){
    };
    strz_console.ConsoleModel.prototype={
        caret:Kinetic.Rect,
        getCaretParams:function(){
            var paramY=this._get('stageHeight');
            return {
                x:5,
                y:paramY-40,
                width:15,
                height:30,
                draggable:false,
                opacity:0.9,
                fill:'#02ff02'
            };
        },
        animCaret:Kinetic.Animation,
        initAnimCaret:function(){
            var caret=this.caret;
            var layer=this._get('layer');
            this.animCaret=new this.animCaret(function(frame){
                if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)caret.hide();
                else caret.show();
            },layer);
            this.animCaret.start();
        },
        initCaret:function(){
            this.caret=new this.caret(this.getCaretParams());
        },
        commandText:Kinetic.Text,
        getCommandTextParams:function(){
            return{
                x:this.caret.getX(),
                y:this.caret.getY(),
                fontSize:this.caret.getHeight(),
                text:'',
                fontFamily:'Courier New',
                fill:'#02ff02'
            };
        },
        initCommandText:function(){
            this.commandText=new this.commandText(this.getCommandTextParams());
        },
        group:Kinetic.Group,
        initGroup:function(){
            this.group=new this.group();
            this.group.add(this.caret).add(this.commandText);
            this.initAnimCaret();
        },
        getGroup:function(){
            return this.group;
        },
        getY:function(){
            return this.caret.getY()-this.caret.getHeight();
        }
    };
    strz_console.Extend(strz_console.ConsoleModel, strz_console.ConsoleOrder);
})();
