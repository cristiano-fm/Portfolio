var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("landing-canvas"), antialias: true});
renderer.setClearColor(0x151316);
renderer.setPixelRatio(window.devicePixelRatio);
container = document.getElementById('canvas-loc');
renderer.setSize($(container).width(), $(container).height());
container.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera( 50, $(container).width()/$(container).height(), 0.1, 3000 );
camera.position.z = 20;
camera.position.y = 1;

var scene = new THREE.Scene();

//resizing rendering while resizing page
window.addEventListener( 'resize', function () {
var width = $(container).width();
var height = $(container).height();
renderer.setSize( width, height );
camera.aspect = width / height;
camera.updateProjectionMatrix();
} );

//------------------planets---------------------//
var loader = new THREE.GLTFLoader();
loader.load('planet.glb', handle_load);

var mesh;

function handle_load(gltf){
mesh = gltf.scene.children[0];
scene.add(mesh);
mesh.material = new THREE.MeshLambertMaterial();

}

//---------------------illumination-----------------------//
var ambientLight = new THREE.AmbientLight( 0xFFFFFFF, 1);
scene.add( ambientLight );

var directLight = new THREE.PointLight( 0xFFFFFF, 1);
scene.add( directLight );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

var x = 0;
var update = function () {
    mesh.rotation.y += 0.003;
}

var animate = function () {
    requestAnimationFrame( animate );

update();
    renderer.render( scene, camera );
};

animate(); 