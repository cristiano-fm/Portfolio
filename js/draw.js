
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("landing-canvas"), antialias: true});
renderer.setClearColor(0x151316);
renderer.setPixelRatio(window.devicePixelRatio);
container = document.getElementById('canvas-loc');
renderer.setSize($(container).width(), $(container).height());
container.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera( 50, $(container).width()/$(container).height(), 0.1, 3000 );
camera.position.z = 50;
camera.position.y = -3.5;

var scene = new THREE.Scene();

//resizing rendering while resizing page
window.addEventListener( 'resize', function () {
  var width = $(container).width();
  var height = $(container).height();
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
} );

//color scheme
var white = 0xFFFFFF;
var tone1 = 0x0D3849;
var tone2 = 0x1E667C;
var tone3 = 0x4A9694;
var tone4 = 0xA17E94;
var tone5 = 0xF48979;

//------------------planets---------------------//
var newPlanet = function( radius ){
  var geo = new THREE.SphereGeometry( radius, 32, 32 );
  var mtr = new THREE.MeshNormalMaterial();
  var planet = new THREE.Mesh( geo, mtr );
  return planet;
}

var translate = function( obj, trsX, trsY, trsZ ){
  obj.position.x = trsX;
  obj.position.y = trsY;
  obj.position.z = trsZ;
}

var centerPlanet = newPlanet(10);
scene.add( centerPlanet );
translate(centerPlanet, 0, 0, 2);

var rightSidePlanet = newPlanet(6);
scene.add( rightSidePlanet );
translate(rightSidePlanet, 12, 0, 0);

var leftSidePlanet = newPlanet(6);
scene.add( leftSidePlanet );
translate(leftSidePlanet, -12, 0, 0);

var smallSidePlanet1 = newPlanet(2);
scene.add( smallSidePlanet1 );
translate(smallSidePlanet1, -25, 0, -5);

var smallSidePlanet2 = newPlanet(2);
scene.add( smallSidePlanet2 );
translate(smallSidePlanet2, 25, 0, -5);

var smallSidePlanet3 = newPlanet(1);
scene.add( smallSidePlanet3 );
translate(smallSidePlanet3, -55, 0, -20);

var smallSidePlanet4 = newPlanet(1);
scene.add( smallSidePlanet4 );
translate(smallSidePlanet4, 55, 0, -20);

var moon = newPlanet(0.5);
scene.add( moon );
translate(moon, 10, 0, 10);

var moonsOrbitCenter = new THREE.Object3D();
moonsOrbitCenter.add(moon);
scene.add( moonsOrbitCenter );

var moonsOrbitTilt = new THREE.Object3D();
moonsOrbitTilt.add(moonsOrbitCenter);
scene.add( moonsOrbitTilt );

moonsOrbitTilt.rotation.y = 0.5;
moonsOrbitTilt.rotation.z = 0.8;

//---------------------illumination-----------------------//
var ambientLight = new THREE.AmbientLight( 0xFFFFFFF, 0.3);
scene.add( ambientLight );

var directLight = new THREE.PointLight( 0xFFFFFF, 1);
scene.add( directLight );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

var x = 0;
var update = function () {
  camera.position.y += Math.sin(x)/150;
  x+=0.01;
  centerPlanet.rotation.y +=0.001;
  rightSidePlanet.rotation.y +=0.001;
  leftSidePlanet.rotation.y -=0.001;
  smallSidePlanet1.rotation.y -=0.001;
  smallSidePlanet2.rotation.y +=0.001;
  smallSidePlanet3.rotation.y -=0.001;
  smallSidePlanet4.rotation.y +=0.001;
  moonsOrbitCenter.rotation.y -= 0.01;
}

var animate = function () {
	requestAnimationFrame( animate );

  update();
	renderer.render( scene, camera );
};

animate();