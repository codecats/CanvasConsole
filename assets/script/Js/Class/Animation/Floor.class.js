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
        stageWidth : null,
        maxHeight : null,
        angularSpeed : 0.1,
        lastTime : 0,
        layer3d : null,
        renderer: null,
        plane: null,
        scene: null,
        camera: null,
        /**
         * Initialize data
         * 
         * @returns this
         */
        init : function() {
            this.create();
        },
        /*
         * start kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        start:function() {
            this.animate();
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
            this.layer3d.destroy();
            return this;
        },
        /*
         * create all tweens and animation after add objects to layer 
         * (KineticJS condition)
         * @returns {Visualization}
         */
        initMove:function(){            
            var stage = this.getLayer().parent;
            
            // renderer
            this.renderer=new THREE.CanvasRenderer({canvas:this.layer3d.getCanvas().getElement()});
            this.renderer.setSize(stage.getWidth(), stage.getHeight());

            // camera
            this.camera = new THREE.PerspectiveCamera(45, stage.getWidth() / stage.getHeight(), 1, 1000);
            this.camera.position.y = -450;
            this.camera.position.z = 400;
            this.camera.rotation.x = 45 * (Math.PI / 180);

            // scene
            this.scene = new THREE.Scene();

            // plane
            this.plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 400), new THREE.MeshNormalMaterial());
            this.plane.overdraw = true;
            this.scene.add(this.plane);

        // add subtle ambient lighting
            var ambientLight = new THREE.AmbientLight(0x222222);
            this.scene.add(ambientLight);

            // directional lighting
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 1).normalize();
            this.scene.add(directionalLight); 
            
            var listener = this.callFinished();
            setTimeout(function() {listener();},5000);
            return this;
        },
        /*
         * destroy all tweens and animation
         * @returns {Visualization}
         */
        destr:function(){
            requestAnimationFrame(function () {});
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
            return this;
        },
        animate : function () {
            // update
            var time = (new Date()).getTime();
            var timeDiff = time - this.lastTime;
            var angleChange = this.angularSpeed * timeDiff * 2 * Math.PI / 1000;
            this.plane.rotation.z += angleChange;
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

