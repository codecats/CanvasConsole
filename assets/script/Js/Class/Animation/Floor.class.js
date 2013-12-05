(function(){
    Floor = function(stageWidth, maxHeight, args){
        
        var __construct = function(stageWidth, maxHeight, args){
           self.init(stageWidth, maxHeight, args);
        };
        self = this;
        __construct(stageWidth, maxHeight, args);
    };
    Floor.prototype={
        
        group : null,
        maxWidth : null,
        maxHeight : null,
        angularSpeed : 0.1,
        lastTime : 0,
        layer3d : null,
        renderer: null,
        mesh: null,
        scene: null,
        camera: null,
        animation : null,
        timeout : null,
        isReady : false,
        /**
         * Initialize data
         * 
         * @returns this
         */
        init : function(width, height, args) {
            this.create();
            this._set('width', width);
            this._set('height', height);
        },
        /*
         * start kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        start:function() {
            if (this.isReady === true)this.animate();
            return this;
        },
        /*
         * stop kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        stop:function(){
            alert('visualization stopped');
            return this;
        },
        /*
         * removes Kinetic.group from layer
         * @returns {Visualization}
         */
        remove:function(){
            clearTimeout(this.timeout);
            this.layer3d.destroy();
            return this;
        },
        /*
         * create all tweens and animation after add objects to layer 
         * (KineticJS condition)
         * @returns {Visualization}
         */
        initMove:function(){   
            var loader  = new THREE.JSONLoader(),
                me      = this;
               
            loader.load(me._get('baseDir') + '/Class/Animation/models/label.js', function (geometry, materials) {
                me.mesh = new THREE.Mesh(
                        geometry, 
                        new THREE.MeshNormalMaterial(materials)
                );

                for (var i = 0, length = materials.length; i < length; i++) {
                    var mat = materials[i];
                    mat.skinning = true;
                }
                
                me.scene.add(me.mesh);
                me.isReady = true;
                me.animate();
                
                // add subtle ambient lighting
                var ambientLight = new THREE.AmbientLight(0xbbbbbb);
                me.scene.add(ambientLight);

                // directional lighting
                var directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(1, -1, 2).normalize();
                me.scene.add(directionalLight);
            }); 
            /*
             * Finish
             */
            var listener = this.callFinished();
            this.timeout = setTimeout(function() {listener();},20000);
            return this;
        },
        /*
         * destroy all tweens and animation
         * @returns {Visualization}
         */
        destr:function(){
          //  requestAnimationFrame(function () {});
            return this;
        },
        /*
         * 
         * @returns {unresolved}
         */
        get:function(){
            return null;
        },
        /*
         * private function, create the group with objects
         * @return Kinetic.Group
         */
        create:function(){
            this.layer3d = new Kinetic.Layer();
            var stage = this.getLayer().parent;
            stage.add(this.layer3d);
            this.layer3d.moveToBottom();
            

            this.camera = new THREE.PerspectiveCamera(
                    40, 
                    this._get('width') / this._get('height'), 
                    1, 
                    10000
            );
            this.camera.position.x = -0.34;
            this.camera.position.y = -7.14871;
            this.camera.position.z = 5.23584;

            this.camera.rotation.x = 0.872665;
            this.camera.rotation.y = 0;
            this.camera.rotation.z = 0;

            this.scene = new THREE.Scene();

            this.renderer = new THREE.CanvasRenderer({canvas : this.layer3d.getCanvas().getElement()});
            this.renderer.setSize(this._get('width'), this._get('height'));
             
            return this;
        },
        animate : function () {
            // update
            var time = (new Date()).getTime();
            var timeDiff = time - this.lastTime;
            var angleChange = Math.sin(this.angularSpeed * timeDiff * 2 * Math.PI / 1000);
            
            this.mesh.rotation.z += angleChange;
            this.lastTime = time;

            // render
            this.renderer.render(this.scene, this.camera);
            var me = this;
            
            // request new frame
            requestAnimationFrame(function () {

                me.animate();
            });

        }
    };
    strz_console.Extend(Floor, strz_console.VisualizationNode);
})();

