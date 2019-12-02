var camera, scene, renderer;

const NUM_QUADS = 250;
const quads = [];

function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();

  for (let i=0; i < NUM_QUADS; i++) {
    // const quadGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const quadGeometry = new THREE.PlaneGeometry(0.08, 0.08);
    const quadMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i/NUM_QUADS, 0.4, 1 - i/NUM_QUADS),
      side: THREE.DoubleSide
    });
    const quadPlane = new THREE.Mesh(quadGeometry, quadMaterial);
    quadPlane.position.x = 3 * i/NUM_QUADS - 1.5;
    // quadPlane.position.z = i/NUM_QUADS - 1;
    quadPlane.rotation.x = i/NUM_QUADS;
    quadPlane.rotation.y = i/NUM_QUADS;
    quadPlane.rotation.z = i/NUM_QUADS;
    quads.push(quadPlane);
    scene.add(quadPlane);
  }

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  quads.forEach((quad, index) => {
    const t = new Date().getTime();
    quad.rotation.x += 0.01;
    quad.rotation.y += 0.02;
    quad.position.y = 0.5 * Math.sin(((index + 1)/NUM_QUADS * 2 * Math.PI * t/3000))
    // quad.position.z = -1
    let color = new THREE.Color((index + 1)/NUM_QUADS, 0.4, index/NUM_QUADS);
    // color = color.multiplyScalar(0.5 - 0.5 * Math.sin((index/NUM_QUADS * 2 * Math.PI * t/1000)))
    const r = 0.5 - 0.5 * Math.sin(((index + 1)/NUM_QUADS * 2 * Math.PI * t/1000));
    const g = 0.5 - 0.5 * Math.cos(((index + 1)/NUM_QUADS * 2 * Math.PI * t/1000))
    color = new THREE.Color(r, g, 0.6);
    quad.material.color = color;
  })

  renderer.render( scene, camera );
}

setTimeout(() => {
  init();
  animate();
}, 0)