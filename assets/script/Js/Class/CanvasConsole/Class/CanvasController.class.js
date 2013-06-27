(function(){
    strz_console.CanvasController=function(obj){
        var self=this;
        var __construct=function(obj){
            self._initAttrs(obj);
            self.setParams();
            self.initStage();
            self.initLayer();
            self.initConsole();
       //     self.initVisController();
       //     self.initOrderListener();
        };
        __construct(obj);
    };
    strz_console.CanvasController.prototype={
        _stageParams:{},
        stage:Kinetic.Stage,
        setParams:function(){
            this._stageParams['width']=this.getWidth();
            this._stageParams['height']=this.getHeight();
            this._stageParams['container']='container';
        },
        initStage:function(){
            this.stage=new this.stage(this._stageParams);
        },
        layer:Kinetic.Layer,
        initLayer:function(){
            this.layer=new this.layer();
            this.stage.add(this.layer);
        },
        /* listen to orders, show input type*/
        //console:Console,old
        console:strz_console.Console,
        initConsole:function(){
            this.console=new this.console(this.layer);
            this.layer.add(this.console.getGroup());
            this._set('consoleY', this.console.getY());
        },
        /* switch betweem animations */
        visController:strz_console.VisualizationController,
        initVisController:function(){
            this.visController=new this.visController({
                layer:this.layer,
                width:this.stage.getWidth(),
                height:this._get('consoleY')
            });
            var vis=this._get('visualizations');
            var visOrder=this._get('visualizationOrder');
            for(var orderVis in vis){
                    //instance, order, replayTimes => MathVis, 'PLAY MATH', 2
                this.visController.add(vis[orderVis][0], orderVis, vis[orderVis][1]);
                if(visOrder.start===orderVis)
                    this.visController.start(orderVis);
            }
            this.visController.setPlayMode(visOrder['play']);
        },
        orderListener:null,
        /* updateOrder is closure function because int called via window*/
        updateOrder:function(){
            var console=this.console;
            var visController=this.visController;
            var layer=this.layer;
            return function(){
                var ord=console.getOrder();
                if(ord==='STOP')visController.finish();
                if(visController.isOrder(ord))visController.start(ord,layer);
                if(ord==='LOOP')visController.setPlayMode('loop');
                if(ord==='ONCE')visController.setPlayMode('once');
                console.clearOrder();
            };
        },
        initOrderListener:function(){
            this.orderListener=window.setInterval(this.updateOrder(), 600);
        },
        /*
         * starts the controller action and listen for orders
         * @returns {undefined}
         */
        run:function(){
            this.initVisController();
            this.initOrderListener();
        }
    };
    strz_console.Extend(strz_console.CanvasController, strz_console.Node);
})();