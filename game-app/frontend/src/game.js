export const DURATION = 20;
export const MAX_SPEED = 40;
export const ROAD_LIMIT = 4.8;

export function createGame() {
  return { status: 'ready', elapsed: 0, distance: 0, score: 0, speed: 0, x: 0,
    obstacles: [], spawnIn: 0.8, nextId: 0, reason: '' };
}

export function togglePause(game) {
  if (game.status === 'running') game.status = 'paused';
  else if (game.status === 'paused') game.status = 'running';
}

// Pure simulation boundary: no DOM, Three.js, or network dependencies.
// Called at a fixed 60 Hz by the UI; RNG is injectable for focused tests.
export function step(game, input, dt, random = Math.random) {
  if (game.status !== 'running' || dt <= 0) return;
  dt = Math.min(dt, DURATION - game.elapsed);
  const acceleration = input.brake ? -28 : input.accelerate ? 14 : -3;
  game.speed = Math.max(0, Math.min(MAX_SPEED, game.speed + acceleration * dt));
  game.x = Math.max(-ROAD_LIMIT, Math.min(ROAD_LIMIT,
    game.x + (input.steer || 0) * 5 * (game.speed / MAX_SPEED) * dt));
  game.distance += game.speed * dt;
  game.score = Math.floor(game.distance);
  game.elapsed = Math.min(DURATION, game.elapsed + dt);
  game.spawnIn -= dt;
  if (game.spawnIn <= 0) {
    // One obstacle per row leaves two lanes open and gives ample warning.
    game.obstacles.push({ id: game.nextId++, x: (Math.floor(random() * 3) - 1) * 3.5, z: -95 });
    game.spawnIn = 1.8;
  }
  for (const obstacle of game.obstacles) {
    const previousZ = obstacle.z;
    obstacle.z += game.speed * dt;
    // Swept longitudinal overlap prevents tunnelling through obstacles.
    if (Math.abs(obstacle.x - game.x) < 1.65 && previousZ < 3.2 && obstacle.z > -3.2) {
      game.status = 'over';
      game.reason = 'collision';
    }
  }
  game.obstacles = game.obstacles.filter(obstacle => obstacle.z < 12);
  if (game.status === 'running' && game.elapsed >= DURATION - 1e-9) {
    game.elapsed = DURATION;
    game.status = 'over';
    game.reason = 'finished';
  }
}
