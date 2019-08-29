// Importing Dependencies
import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREESTLLoader from 'three-stl-loader';

import demo from '../models/demo2.stl';

import './STLLoader.css';

var STLLoader = new THREESTLLoader(THREE) // Added THREE

class STLLoaderComponent extends Component {

	componentDidMount() {
		this.color = this.props.color;
		this.sceneSetup();
        // this.addCustomSceneObjects();
        this.addSTLFile();
		this.startAnimationLoop();
		window.addEventListener("resize", this.handleWindowResize);

		// They all start spinning if left alone for 10 seconds
		window.addEventListener('mousemove', this.easter_egg);
		window.addEventListener('touchstart', this.easter_egg);
		window.addEventListener('keypress', this.easter_egg);
	}

	// Add a clean unmount - remove associated event listeners and animation frames
	componentWillUnmount() {
		console.log('Component will UNMOUNT');
		window.removeEventListener("resize", this.handleWindowResize);
		window.cancelAnimationFrame(this.requestID);
		this.controls.dispose();
	}

	//   Standard scene setup
	sceneSetup = () => {
		// get container dimensions and use them for scene sizing
		const width = this.el.clientWidth;
		const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x646464 );

		this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            .1, // near plane
            1000 // far plane
        );
		this.camera.position.z = 5; 
		this.camera.position.x = -3;
		this.camera.position.y = 2;
		

		const size = 20;
		const divisions = 20;

		this.gridHelper = new THREE.GridHelper( size, divisions );
		this.scene.add( this.gridHelper );


		// pan disabled = makes rotate confusing when panned away from center point
		// https://threejs.org/docs/#examples/controls/OrbitControls
		this.controls = new OrbitControls(this.camera, this.el);
		this.controls.enablePan = false;
		this.controls.maxDistance = 40;
		this.controls.minDistance = 2;
		

		this.renderer = new THREE.WebGLRenderer({
            antialias: true
		});
		this.renderer.setSize(width, height);
		this.el.appendChild(this.renderer.domElement); // mount using React ref
    };
    
    addSTLFile = () => {
        let loader = new STLLoader();
		
        loader.load(demo, ( geometry ) => {
			console.log(geometry);

			const sizeElement = async () => {
				await geometry.computeBoundingSphere();
				console.log(geometry.boundingSphere.radius);
			}
			sizeElement();


            let material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );

            if ( geometry.hasColors ) {
				console.log('Part has colors');
                material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: THREE.VertexColors } );
            }

            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.set( 0, 2, 0);

            this.mesh.scale.set( 0.0393701, 0.0393701, 0.0393701 );
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
			this.scene.add(this.mesh);
			
			const lights = [];
			lights[0] = new THREE.PointLight(0xffffff, 1, 0);
			lights[1] = new THREE.PointLight(0xffffff, 1, 0);
			lights[2] = new THREE.PointLight(0xffffff, 1, 0);

			lights[0].position.set(0, 200, 0);
			lights[1].position.set(100, 200, 100);
			lights[2].position.set(-100, -200, -100);

			this.scene.add(lights[0]);
			this.scene.add(lights[1]);
			this.scene.add(lights[2]);
        }, 
        (progress) => {
            console.log(progress);
        },
        (err) => {
			if (err){
				console.log(err);
			}
        });
    }
    

	// Add 3D model
	addCustomSceneObjects = () => {
		const geometry = new THREE.BoxGeometry(2, 2, 2);
		const material = new THREE.MeshPhongMaterial({
            color: this.color,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
		});
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);

		const lights = [];
		lights[0] = new THREE.PointLight(0xffffff, 1, 0);
		lights[1] = new THREE.PointLight(0xffffff, 1, 0);
		lights[2] = new THREE.PointLight(0xffffff, 1, 0);

		lights[0].position.set(0, 200, 0);
		lights[1].position.set(100, 200, 100);
		lights[2].position.set(-100, -200, -100);

		this.scene.add(lights[0]);
		this.scene.add(lights[1]);
		this.scene.add(lights[2]);
	};

	startAnimationLoop = () => {
		// if (this.animate) {
		// 	this.cube.rotation.x += (Math.random() * .01 - .02);
		// 	this.cube.rotation.y += (Math.random() * .01 - .02);

		// }
		
		this.renderer.render(this.scene, this.camera);

		// The window.requestAnimationFrame() method tells the browser that you wish to perform
		// an animation and requests that the browser call a specified function
		// to update an animation before the next repaint
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	handleWindowResize = () => {
		const width = this.el.clientWidth;
		const height = this.el.clientHeight;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;

		// Note that after making changes to most of camera properties you have to call
		// .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
        
	};

	easter_egg = () => {
		this.animate = false;
	}

	render() {

		setInterval(() => {
			this.animate = true;
		}, 60000)
		
		return (
			<div className='stl_container'>
				<div className='stl_outer_div'>
					<div className='STLLoader' ref={ref => (this.el = ref)} />
				</div>

				<div className='element_name'>{this.props.title} in {this.props.category}</div>
			</div>
		);
	}
}

export default STLLoaderComponent;