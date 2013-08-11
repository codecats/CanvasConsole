/*
 * needs layer, width, height
 */
/**
 * 
 * Controller creates objects strange, mathVis do not delete tweens
 * @returns {undefined}
 */
(function(){
    strz_console.VisualizationController=function(obj){
        var self=this;
        var __construct=function(obj){
            self._initAttrs(obj);
        
            //DEPRECATED
           // self.initCleanerListener();
        };
        __construct(obj);
    };
    strz_console.VisualizationController.prototype={
    /*
     * add new visualization
     */
        add:function(visualization, order, playTimes, args){
           
            var k=this.bin.push(visualization);
            k--;
            this.order[k]=order;
            this.countToPlay[k]=playTimes;
            this.arguments[k] = args;
            this.key[order]=k;
            return this;
        },
        start:function(order){
            if(!this.current){
                try{
                    this.current = new this.bin[this.key[order]]
                        (this.getWidth(), this.getHeight(), this.arguments[order]);
                        
                    /**
                     * Every object should have setFinishedListener
                     * 
                     * TODO: set all animations finishedListener and delete timeouts
                     */
                    if( typeof(this.current.setFinishedListener) !== 'undefined' ){
                        this.current.setFinishedListener({
                            object:this,
                            call: 'listenerFinished'
                        });
                    }
                    else this.addFinishListener(this.current);
                    
                    this.getLayer().add(this.current.get());
                    
                    /**
                     * Main condition is for new objects, else is for old objects
                     * TODO: remove else condition
                     */
                    if( typeof(this.current.initMove) !== 'undefined')this.current.initMove();
                    else this.current.init();
                    
                    this.current.start();
                    
                    this.currentOrder=order;
                }catch(err){      
                    if(this.order.length>0){
                        for(ord in this.order)this.clear(this.order[ord]);
                        console.log('Nothing to play: cleaning up...');
                    //    throw err;

                    }   
                }
            }
        },
        setPlayMode:function(mode){
            this.playMode=mode;
        },
    /*
     * Check if order equals @param
     * @param {type} ord
     * @returns {Boolean}
     */
        isOrder:function(ord){
            var exist=false;
            for(var o in this.order){
                if(this.order[o]===ord)exist=true;
            }
            return exist;
        },
    /*
     * Looks for the next key in array Key
     * example: Key=array(3,4,5,6,7), keyBefore=5 => result=6
     * 
     */
        getFirstFreeKey:function(keyBefore){
            var getNext=false;
            var found=null;
            for(k in this.key){
                if(getNext){
                    if(this.countToPlay[this.key[k]]>0){
                        if(this.countToPlay[this.key[k]]!==Infinity){
                            this.countToPlay[this.key[k]]--;
                        }
                        found=this.key[k];
                        getNext=false;
                    }
                }
                if(keyBefore===this.key[k]){
                    getNext=true;
                }
            }
            
             //if nothing fount search from beginning
             
            if(found===null){
                for(k in this.key){
                    if(this.countToPlay[this.key[k]]>0  && found === null){
                        if(this.countToPlay[this.key[k]]!==Infinity){
                            this.countToPlay[this.key[k]]--;
                        }
                        found=this.key[k];
                    }
                }
            }
            return found;
        },
        finish:function(){
            var controller = this;
            if(this.current){
               
                this.current.destr();
                
            //     console.log('131');
            //    console.log(this.current);
                
                this.current.remove();    
                this.current = null; 
                
                console.log('VisController: finished');
                 var k=controller.getFirstFreeKey(controller.key[controller.currentOrder]);
                        controller.start(controller.order[k]);
                
            }
        },
    /*
     * destroy animation as the ordered
     */
        clear:function(order){
            var k=this.key.pop(order);
            this.order.pop(k);
            this.countToPlay.pop(k);
            this.bin.pop(k);
        },
    /**
     * DEPRECATED, use listenerFinished
     * 'cleaner' - timer check if visualization is finished, and if flag is set then
     * automaticly destroy current object
     * 
     * TODO: remove cleanerListener, intervalCleaner, initCleanerListener
     */
        cleanerListener:null,
        intervalCleaner:function(){
            var controller=this;
            return function(){
                if(controller.current){
                    try{
                        console.log(controller.current);
                        if(controller.current.isFinished()){
                            controller.finish();
                        }
                    }catch(err){
                        console.log('New types of Visulalization has no \'isFinished\' method');
                    }
                }else if(controller.playMode==='loop'){
                    if(controller.currentOrder){
                        var k=controller.getFirstFreeKey(controller.key[controller.currentOrder]);
                        controller.start(controller.order[k]);
                    }
                }
            };
        },
        /**
         * Observator listener for new objects type
         * 
         * @returns {undefined}
         */
        listenerFinished : function(){
            this.finish();
            if(this.playMode === 'loop'){
                if(this.currentOrder){
                     var k=this.getFirstFreeKey(this.key[this.currentOrder]);
                     this.start(this.order[k]);
                }
            }
        },
        /**
         * DEPRECATED
         * TODO: remove this
         * @returns {undefined}
         */
        initCleanerListener:function(){
            this.cleanerListener=window.setInterval(this.intervalCleaner(), 2000);
        },
        
        //LISTENER HERE:
        /**
         * adds listener
         */
        addFinishListener : function(obj){
            obj['finishListener'] = this.callFinishListener();
        },
        
        /**
         * listener called on finish
         */
         callFinishListener : function(){
             controller = this;
             return function(){
                 controller.finish();
             };
         }
    };
    strz_console.Extend(
            strz_console.VisualizationController, strz_console.VisualizationContainer);
})();