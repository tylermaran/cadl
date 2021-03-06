// Importing Dependencies
import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Importing Styles
import './STLLoader.css';

class STLLoaderComponent extends Component {
	constructor (props) {
		super();
		this.state = {
			Loaded: 0,
			Total: 0.01
		}
	}

	// Setup Component
	componentDidMount() {
		this.sceneSetup();
        this.addSTLFile();
		this.startAnimationLoop();
		window.addEventListener("resize", this.handleWindowResize);
	}

	// Clean Unmount
	componentWillUnmount() {
		console.log('Component will UNMOUNT');
		window.removeEventListener("resize", this.handleWindowResize);
		window.cancelAnimationFrame(this.requestID);
		this.controls.dispose();
	}

	// THREEJS Scene Setup
	sceneSetup = () => {
		// Match Container Dimensions
		const width = this.el.clientWidth;
		const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x646464 );

		this.camera = new THREE.PerspectiveCamera(
            75, // FOV
            width / height, // aspect ratio
            .1, // NEAR
            1000 // FAR
		);
		
		// TODO: Set camera position based on object size
		this.camera.position.z = 5; 
		this.camera.position.x = -3;
		this.camera.position.y = 2;
		
		// Add a Grid (default to inches)
		const size = 20;
		const divisions = 20;
		this.gridHelper = new THREE.GridHelper( size, divisions );
		this.scene.add( this.gridHelper );

		// Orbit Controls
		// https://threejs.org/docs/#examples/controls/OrbitControls
		this.controls = new OrbitControls(this.camera, this.el);
		this.controls.enablePan = true;
		this.controls.maxDistance = 40;
		this.controls.minDistance = 2;
		
		// Configure Renderer
		this.renderer = new THREE.WebGLRenderer({
            antialias: true
		});
		this.renderer.setSize(width, height);
		
		// Append renderer to dom using React Ref
		this.el.appendChild(this.renderer.domElement);
    };
	
	// Load STL File
    addSTLFile = () => {
		// Set STL File Loader
        let loader = new STLLoader();
		let start = performance.now()

		// Load the STL file and pass on the geometry
        loader.load(this.props.file, ( geometry ) => {
			let finished = performance.now();

			const calcElementSize = async () => {
				await geometry.computeBoundingSphere();
				console.log(geometry.boundingSphere.radius);

			}
			calcElementSize();

			// Add basic color and shine to material
            let material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );

			// If Material has it's own properties, apply those
            if ( geometry.hasColors ) {
				console.log('Part has own colors');
                material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: THREE.VertexColors } );
            }

            this.mesh = new THREE.Mesh(geometry, material);
			this.mesh.position.set( 0, 0, 0);
			// this.mesh.rotateZ(THREE.Math.degToRad(90));

			
			// If MM, scale to inches. Grid will be in inches.
			if (this.props.mm) {
				this.mesh.scale.set( 0.0393701, 0.0393701, 0.0393701 );
			} else {
				this.mesh.scale.set( 1, 1, 1);
			}
			
			// Change shadows
            this.mesh.castShadow = true;
			this.mesh.receiveShadow = true;

			// Add axes to object
			this.axesHelper = new THREE.AxesHelper( 5 );
			this.mesh.add(this.axesHelper);


			// Add mesh to scene
			this.scene.add(this.mesh);
			

			// Add Lighting
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

			console.log('Load took ' + (finished - start)/1000 + ' seconds');
		}, 
		// Loading Progress
        (progress) => {
			this.setState({
				Loaded: progress.loaded,
				Total: progress.total
			});
		},
		// Catch Errors
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

	// 
	startAnimationLoop = () => {
		// Start spinning after a while
		if (this.props.spin) {
			this.mesh.rotation.x += .01;
		}
		
		this.renderer.render(this.scene, this.camera);

		// Run the animation at screen refrash rate (will cancel if tab is not active)
		this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	// Recentering element in canvas when resized
	handleWindowResize = () => {
		const width = this.el.clientWidth;
		const height = this.el.clientHeight;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;

		// Note that after making changes to most of camera properties you have to call
		// .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
	};


	render() {
		return (
			<div className='stl_container'>
				<div className='stl_outer_div'>
					<div className='STLLoader' ref={ref => (this.el = ref)} />
				</div>

				<div className='element_name'>{this.props.title} in {this.props.category}</div>
				<div className="file_size">Loading {(this.state.Loaded / this.state.Total).toFixed(2)*100}%</div>
			</div>
		);
	}
}

export default STLLoaderComponent;