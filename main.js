import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {ARButton} from 'three/examples/jsm/webxr/ARButton';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";


const scene = new THREE.Scene();
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,1000)
camera.position.z=5;

const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({
  antialias:true,
  alpha:true,
  canvas:canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.xr.enabled=true;
// Window Resizing
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


const light = new THREE.AmbientLight( 0x404040 ,1 ); // soft white light
scene.add( light );

// const controls = new OrbitControls( camera, renderer.domElement );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,0,-5)
// scene.add(cube);



const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/3.png");

// & Fonts

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Text
  const textGeometry = new TextGeometry(" AR-Gallary", {
    font: font,
    size: 0.4,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  text.position.set(0, 2, -1);
  text.rotation.set(0.2,0,0)
  scene.add(text);


});



function animate() {
	requestAnimationFrame( animate );



	renderer.render( scene, camera );
}

animate();
