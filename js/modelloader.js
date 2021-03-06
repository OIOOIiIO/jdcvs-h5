function draw()
    {
        console.log(666);
        //统一声明变量
        var container, stats;
        var camera, scene, light, raycaster, renderer;
        var mouse = new THREE.Vector2();
        var radius = 100, theta = 0;
        var tanFOV, windowHeight;
        var colors = ['#E31D1A', '#FFFFFF', '#000000'];
        var random_color_index = Math.floor(Math.random() * colors.length);
        var color = colors[random_color_index];
        var obj0 = new THREE.Object3D();
        var hasTouch = 'ontouchstart' in window,
        startEvent = hasTouch ? 'touchstart' : 'mousedown',
        moveEvent = hasTouch ? 'touchmove' : 'mousemove',
        endEvent = hasTouch ? 'touchend' : 'mouseup',
        cancelEvent = hasTouch ? 'touchcancel' : 'mouseup';

        init();
        animate();

        function init(){
            //scene
            scene = new THREE.Scene();

            //camera
            camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 10000);

            // renderer 
            renderer = new THREE.WebGLRenderer({alpha: true});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            //raycaster
            raycaster = new THREE.Raycaster();

            //light
            light = new THREE.PointLight( 0xFFFFFF , 0.5);
            light.position.set( 0, 70, -80 );
            scene.add( light );

            light = new THREE.PointLight( 0xFFFFFF , 1.5);
            light.position.set( 25, 0, 80 );
            scene.add( light );

            for ( var k = 0; k < 6; k ++ ) {
                for ( var i = 0; i < 6; i ++ ) {
                    for ( var j = 0; j < 6; j ++ ) {
                        var random_color_index = Math.floor(Math.random() * colors.length);
                        var color = colors[random_color_index];
                        var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );
                        var material = new THREE.MeshBasicMaterial( { color: color, transparent: true, alpha:true} );
                        material.opacity = Math.random();
                        material.transparent = true;
                        var mesh = new THREE.Mesh( geometry, material );
                        mesh.position.x = 11- ( 5 * i );
                        mesh.position.y = 20 - ( 5 * k );;
                        mesh.position.z = 15 - ( 5 * j );
                        mesh.opacity = 0.5;
                        mesh.transparent = true;
                        obj0.add(mesh);
                    }
                }
            }
            obj0.rotation.x = 0.5;
            obj0.rotation.y = 0.75;
            
            obj0.opacity = 0.1;
            obj0.transparent = obj0.opacity < 1;
            scene.add(obj0);
            
            console.log(obj0);
            

            // Event Listeners
            document.addEventListener( startEvent , onMouseDown, false );
            document.addEventListener( endEvent , onMouseup, false );
            window.addEventListener( 'resize', onWindowResize, false );

            // remember these initial values
            tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
            windowHeight = window.innerHeight;
        }

        function onWindowResize( event ) {

            camera.aspect = window.innerWidth / window.innerHeight;

            // adjust the FOV   屏幕尺寸变化但是模型大小不变
            //camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );

            camera.updateProjectionMatrix();
            camera.lookAt( scene.position );

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function animate() {
            requestAnimationFrame( animate );
            render();
        }

        function render() {
            theta += 0.01;

            obj0.rotation.y = theta;

            camera.position.z = 240;
            camera.lookAt( scene.position );
            camera.updateMatrixWorld();

            renderer.render( scene, camera );
            
        }
        
        function onMouseDown(event){
            event.preventDefault();
            mouseDown = true;
            if(startEvent == 'touchstart')
            {
                mouseX = event.changedTouches[0].clientX;
                mouse.set( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
            }
            else{ 
                mouseX = event.clientX; 
                mouse.set( event.clientX, event.clientY );
            }

            document.addEventListener( moveEvent , onMouseMove2, false );
            console.log(mouseX);
            
        }

        function onMouseup(event){      
            mouseDown = false;

            document.removeEventListener( moveEvent , onMouseMove2);
        }

        function onMouseMove2(event){
            if(!mouseDown){
                return;
            }
            if(startEvent == 'touchstart')
            {
                var deltaX = event.changedTouches[0].clientX - mouseX;
                mouseX = event.changedTouches[0].clientX;
            }
            else{ 
                var deltaX = event.clientX - mouseX;
                mouseX = event.clientX;
            }       
            
            rotateScene(deltaX);        
            
        }

        //设置模型旋转速度，可以根据自己的需要调整
        function rotateScene(deltaX){
            var deg = deltaX/279;
            //deg 设置模型旋转的弧度
            obj0.rotation.y += deg;
            
            render();
        }
    }