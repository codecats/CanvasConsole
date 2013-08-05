(function() {
    /**
     * 
     * @param params obj
     * @returns CanvasController
     */
    strz_console.CanvasController = function(obj) {
        var self = this;
        var __construct = function(obj) {
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
    strz_console.CanvasController.prototype = {
        _stageParams: {},
        stage: Kinetic.Stage,
        setParams: function() {
            this._stageParams['width'] = this.getWidth();
            this._stageParams['height'] = this.getHeight();
            this._stageParams['container'] = 'container';
        },
        initStage: function() {
            this.stage = new this.stage(this._stageParams);
        },
        layer: Kinetic.Layer,
        initLayer: function() {
            //this.layer = new Kinetic.Layer();
            this.layer = new this.layer();
            this.stage.add(this.layer);
        },
        /* listen to orders, show input type*/
        visConsole: strz_console.Console,
        initConsole: function() {

            //visConsole needs layer and the listener
            this.visConsole = new this.visConsole(this.layer, {
                object: this,
                call: 'updateOrder'
            });
            this.layer.add(this.visConsole.getGroup());
            this._set('consoleY', this.visConsole.getY());
        },
        /* switch betweem animations */
        visController: strz_console.VisualizationController,
        initVisController: function() {
            this.visController = new this.visController({
                layer: this.layer,
                width: this.stage.getWidth(),
                height: this._get('consoleY')
            });
            var vis = this._get('visualizations');
            var visOrder = this._get('visualizationOrder');
            for (var orderVis in vis) {
                //class, order, count, args
                this.visController.add(
                        vis[orderVis][0], 
                        orderVis, 
                        vis[orderVis][1],
                        vis[orderVis][2]);
                if (visOrder.start === orderVis)
                    this.visController.start(orderVis);
            }
            this.visController.setPlayMode(visOrder['play']);
        },

        /* updateOrder is closure function because int called via window*/
        updateOrder: function() {
            var visConsole = this.visConsole;
            var visController = this.visController;
            var layer = this.layer;

            var ord = visConsole.getOrder();
            if (ord === 'STOP')
                visController.finish();
            //if visController has order ord start this order
            if (visController.isOrder(ord))
                visController.start(ord, layer);
            if (ord === 'LOOP')
                visController.setPlayMode('loop');
            if (ord === 'ONCE')
                visController.setPlayMode('once');
            //at the end order is cleaned automaticly by console
           // visConsole.clearOrder();
        },
        initOrderListener: function() {
            this.visConsole.setListener(this.updateOrder);
        },
        /*
         * starts the controller action and listen for orders
         * @returns {undefined}
         */
        run: function() {
            this.initVisController();
            //   this.initOrderListener();
        }
    };
    strz_console.Extend(strz_console.CanvasController, strz_console.Node);
})();