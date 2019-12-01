var camera, scene, renderer;

const NUM_SNOWFLAKES = 80;
const snowflakes = [];

function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();

  for (let i=0; i < NUM_SNOWFLAKES; i++) {
    // const snowflakeGeometry = new THREE.PlaneGeometry(0.1, 0.1);
    const snowflakeGeometry = new THREE.PlaneGeometry(0.08, 0.08);
    const snowflakeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i/NUM_SNOWFLAKES, 0.4, 1 - i/NUM_SNOWFLAKES),
      side: THREE.DoubleSide
    });
    const snowflakePlane = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
    snowflakePlane.position.x = 3 * i/NUM_SNOWFLAKES - 1.5;
    // snowflakePlane.position.z = i/NUM_SNOWFLAKES - 1;
    snowflakePlane.rotation.x = i/NUM_SNOWFLAKES;
    snowflakePlane.rotation.y = i/NUM_SNOWFLAKES;
    snowflakePlane.rotation.z = i/NUM_SNOWFLAKES;
    snowflakes.push(snowflakePlane);
    scene.add(snowflakePlane);
  }

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  snowflakes.forEach((flake, index) => {
    const t = new Date().getTime();
    flake.rotation.x += 0.01;
    flake.rotation.y += 0.02;
    flake.position.y = 0.5 * Math.sin(((index + 1)/NUM_SNOWFLAKES * 2 * Math.PI * t/3000))
    let color = new THREE.Color((index + 1)/NUM_SNOWFLAKES, 0.4, index/NUM_SNOWFLAKES);
    // color = color.multiplyScalar(0.5 - 0.5 * Math.sin((index/NUM_SNOWFLAKES * 2 * Math.PI * t/1000)))
    const r = 0.5 - 0.5 * Math.sin(((index + 1)/NUM_SNOWFLAKES * 2 * Math.PI * t/1000));
    const g = 0.5 - 0.5 * Math.cos(((index + 1)/NUM_SNOWFLAKES * 2 * Math.PI * t/1000))
    color = new THREE.Color(r, g, 0.6);
    flake.material.color = color;
  })

  renderer.render( scene, camera );
}

setTimeout(() => {
  init();
  animate();
}, 0)