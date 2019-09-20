// Importing Dependencies
import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GCodeLoader } from 'three/examples/jsm/loaders/GCodeLoader';

// Importing Styles
import './ObjectLoader.css';

class ObjectLoader extends Component {
	constructor(){
		super();
		this.state =({
			Loaded: 0,
			size: 1,
			complete: false,
			loader: null
		})
	}

	// Setup Component
	componentDidMount() {
		console.log(this.props.object.file_size);
		this.setState({
			size: this.props.object.file_size
		});
		this.sceneSetup();
        this.loaderSelect();
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
    
    componentDidUpdate() {
        if (this.state.complete) {
            this.handleUpdate();
        }
    }

	// THREEJS Scene Setup
	sceneSetup = () => {
		// Match Container Dimensions
		const width = this.el.clientWidth;
		const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x404040 );

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
		// Configurable from props
		// console.log(this.props.control);
        this.controls.enableZoom = this.props.control.zoom;
        this.controls.enableRotate = this.props.control.rotate;
        this.controls.enablePan = this.props.control.pan;
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
	
	// switch based on file type
	loaderSelect = () => {
		let temp_loader;
		switch(this.props.object.ext) {
			case 'stl':
				temp_loader = new STLLoader();
				this.setState({
					loader: temp_loader
				}, () => {
					this.loadSTL();
				});
				break;
			case 'gcode': 
				temp_loader = new GCodeLoader();
				this.setState({
					loader: temp_loader
				}, () => {
					this.loadGcode();
				});
				break;
			default:
				break;
		}
	} 

	// Render file using loaded
    loadSTL = () => {
		// Set STL File Loader
        // let loader = new STLLoader();
		let start = performance.now()

		// Load the STL file and pass on the geometry
        this.state.loader.load(this.props.object.file, ( geometry ) => {
			// console.log(geometry);
			let finished = performance.now();

			// 
			const calcElementSize = async () => {
				await geometry.computeBoundingSphere();
				await geometry.computeFaceNormals();
				await geometry.computeVertexNormals();
				// console.log(geometry.boundingSphere.radius);
			}
			calcElementSize();
			// Add basic color and shine to material
			let material = new THREE.MeshPhongMaterial( { color: 0x4287f5, specular: 0x111111, shininess: 200 } );

			// If Material has it's own properties, apply those
            if ( geometry.hasColors ) {
				console.log('Part has own colors');
                material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: THREE.VertexColors } );
            }

            this.mesh = new THREE.Mesh(geometry, material);
			this.mesh.position.set( 0, 0, 0);
			
			// If MM, scale to inches. Grid will be in inches.
			if (this.props.object.config.mm) {
                // console.log('MM true');
                this.mesh.scale.set( 0.0393701, 0.0393701, 0.0393701 );
                this.mesh.updateMatrix();
			} else {
                // console.log('Inch True');
                this.mesh.scale.set( 1, 1, 1);
                this.mesh.updateMatrix();
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

            console.log('Load took ' + ((finished - start)/1000).toFixed(2) + ' seconds');

            // Loading complete. Set ComponentDidUpdate to listen for prop changes
            this.setState({
                complete: true
            }, () => {
				console.log('Complete = true');
			});
		}, 
		// Loading Progress
        (progress) => {
			// console.log(progress);
			this.setState({
				loaded: progress.loaded,
				size: progress.total
			});
		},
		// Catch Errors
        (err) => {
			if (err){
				console.log(err);
			}
        });
    }

    
    handleUpdate = () => {
        // If MM, scale to inches. Grid will be in inches.
        if (this.props.object.config.mm) {
            this.mesh.scale.set( 0.0393701, 0.0393701, 0.0393701 );
        } else {
            this.mesh.scale.set( 1, 1, 1);
        }
        
        // Set translate
        this.mesh.position.set( this.props.object.config.translate[0], this.props.object.config.translate[1], this.props.object.config.translate[2]);
        
        // Set Rotate
        this.mesh.rotation.x = (THREE.Math.degToRad(this.props.object.config.rotate[0]));
        this.mesh.rotation.y = (THREE.Math.degToRad(this.props.object.config.rotate[1]));
		this.mesh.rotation.z = (THREE.Math.degToRad(this.props.object.config.rotate[2]));
		
		// Take in Mesh Color
		this.mesh.material.color.setHex(this.props.object.config.object_color);

		// Set different background color
		this.scene.background = new THREE.Color(this.props.object.config.background_color);
        
        // Update the mesh Matrix
        this.mesh.updateMatrix();
    }

	// Play each Keyframe
	startAnimationLoop = () => {
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
		let loaded;
		if (this.state.complete) {
			loaded = ( (this.state.size / 1000000).toFixed(1) + 'mb');
			
		} else {
			loaded = ((this.state.loaded / this.state.size).toFixed(2)*100 + '%')
		}

		return (
            <>
				<div className='SetObject' ref={ref => (this.el = ref)}>
					<div className="SetObject_loader">{loaded}</div>
				</div>
            </>
		);
	}
}

export default ObjectLoader;