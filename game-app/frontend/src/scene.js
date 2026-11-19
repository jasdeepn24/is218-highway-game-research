import * as THREE from 'three';

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#adcbd6');
  scene.fog = new THREE.Fog('#adcbd6', 45, 130);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 180);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3b5047, 2.4));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(-12, 20, 8);
  scene.add(sun);
  const box = new THREE.BoxGeometry(1, 1, 1);
  const materials = {};
  function block(w, h, d, color, x, y, z, parent = scene) {
    materials[color] ||= new THREE.MeshStandardMaterial({ color, roughness: 0.8 });
    const mesh = new THREE.Mesh(box, materials[color]);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  block(200, 0.1, 200, '#537b68', 0, -0.15, -70);
  block(11, 0.1, 180, '#303f4c', 0, -0.05, -70);
  for (const x of [-5.6, 5.6]) {
    block(0.12, 0.04, 180, '#f6d984', x, 0.03, -70);
    block(0.2, 0.5, 180, '#91a2a6', x * 1.12, 0.25, -70);
  }
  const markings = [];
  for (let i = 0; i < 30; i++) for (const x of [-1.75, 1.75]) {
    markings.push(block(0.1, 0.02, 3, '#d6e4e6', x, 0.02, -i * 6));
  }
  function car(color) {
    const group = new THREE.Group();
    block(1.6, 0.65, 3.2, color, 0, 0.65, 0, group);
    block(1.3, 0.55, 1.5, '#263e51', 0, 1.22, 0.15, group);
    for (const x of [-0.85, 0.85]) for (const z of [-1, 1]) {
      block(0.25, 0.55, 0.65, '#14252e', x, 0.35, z, group);
    }
    for (const x of [-0.55, 0.55]) block(0.35, 0.16, 0.06, '#ff704b', x, 0.7, 1.62, group);
    scene.add(group);
    return group;
  }
  const player = car('#24d6b2');
  const traffic = new Map();
  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  return game => {
    player.position.x = game.x;
    camera.position.set(game.x * 0.4, 6.5, 11);
    camera.lookAt(game.x * 0.5, 0.8, -15);
    markings.forEach((mesh, index) => { mesh.position.z = 10 - (Math.floor(index / 2) * 6 + 180 - game.distance % 6) % 180; });
    const active = new Set(game.obstacles.map(obstacle => obstacle.id));
    for (const [id, mesh] of traffic) if (!active.has(id)) { scene.remove(mesh); traffic.delete(id); }
    for (const obstacle of game.obstacles) {
      if (!traffic.has(obstacle.id)) traffic.set(obstacle.id, car('#e9944c'));
      traffic.get(obstacle.id).position.set(obstacle.x, 0, obstacle.z);
    }
    renderer.render(scene, camera);
  };
}
