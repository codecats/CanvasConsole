(function(){
    strz_console.Console=function(lay){
        var self=this;
        var __construct=function(layer){
            self.initObjects(layer);
        };
        __construct(lay);
    };
    strz_console.Console.prototype={
        handleKeyDown:function(e){
            var commandText=this.commandText;
            var canvas=this._get('canvas');
            var caret=this.caret;
            var layer=this._get('layer');
            var orderer=this;
            var keyCodeToChar=this.keyCodeToChar;
            return function(e){
                /*                  */
                 //put to command char (48 - 90) - chars
                if((e.keyCode)<91 && (e.keyCode>47)){

                    //check command width limit
                    if(!((commandText.getWidth()+caret.getWidth()*2)>=canvas.width))
                        commandText.setText(commandText.getText()+keyCodeToChar[e.which || e.keyCode]);
                }else{
                    switch(e.keyCode){
                        case 8://delete
                            var txt=commandText.getText();
                            commandText.setText(txt.substr(0,txt.length-1));
                            break;
                        case 32://space

                    //check command width limit
                            if(!((commandText.getWidth()+caret.getWidth()*2)>=canvas.width))
                            commandText.setText(commandText.getText()+' ');
                            break;
                        case 13://enter
                            var t=commandText.getText();
                            orderer.setOrder(t);
                            commandText.setText('');
                            break;
                    }
                }
                caret.setX(commandText.getX()+commandText.getWidth());
                caret.setY(commandText.getY()-caret.getHeight()*0.1);
                layer.draw();
                return false;
            };
        },
        initTyping:function(){
            var canvas=this._get('canvas');
            canvas.setAttribute('tabindex','0');
            canvas.focus();
            canvas.addEventListener('keydown',this.handleKeyDown(),false);
        },
        initObjects:function(layer){
            var canv=layer.getCanvas().getElement();
            this._initAttrs({
                layer:layer,
                canvas:canv,
                stageHeight:canv.height
            });
            this.initCaret();
            this.initCommandText();
            this.initGroup();
            this.addWindowEventListener();
            this.initTyping();
        }
    };
    strz_console.Extend(strz_console.Console, strz_console.ConsoleModel);
})();
