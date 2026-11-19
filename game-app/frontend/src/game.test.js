import { describe, it, expect } from 'vitest';
import { createGame, step, togglePause, ROAD_LIMIT } from './game.js';
const running = () => ({ ...createGame(), status: 'running', spawnIn: 100 });
function advance(game, seconds, input = {}, hz = 60) {
  for (let i = 0; i < Math.round(seconds * hz); i++) step(game, input, 1 / hz, () => 0);
}
describe('highway rules', () => {
  it('accelerates, brakes, clamps steering and scores distance', () => {
    const game = running();
    advance(game, 4, { accelerate: true, steer: 1 });
    expect(game.speed).toBe(40);
    expect(game.x).toBe(ROAD_LIMIT);
    expect(game.score).toBe(Math.floor(game.distance));
    expect(game.score).toBeGreaterThan(90);
    advance(game, 2, { brake: true });
    expect(game.speed).toBe(0);
  });
  it('freezes everything when paused and resumes', () => {
    const game = running();
    advance(game, 1, { accelerate: true });
    togglePause(game);
    const snapshot = structuredClone(game);
    advance(game, 5, { accelerate: true });
    expect(game).toEqual(snapshot);
    togglePause(game);
    advance(game, 1);
    expect(game.elapsed).toBeGreaterThan(snapshot.elapsed);
  });
  it('ends at 20 seconds, freezes the result, and resets for replay', () => {
    const game = running();
    advance(game, 20, { accelerate: true });
    expect(game.status).toBe('over');
    expect(game.reason).toBe('finished');
    expect(game.elapsed).toBe(20);
    const score = game.score;
    advance(game, 2, { accelerate: true });
    expect(game.score).toBe(score);
    expect(createGame()).toMatchObject({ score: 0, elapsed: 0, obstacles: [], status: 'ready' });
  });
  it('detects collisions but allows adjacent lanes', () => {
    const game = running();
    game.obstacles = [{ id: 0, x: 3.5, z: -3 }];
    step(game, {}, 1 / 60);
    expect(game.status).toBe('running');
    game.obstacles[0].x = 0;
    step(game, {}, 1 / 60);
    expect(game.reason).toBe('collision');
  });
  it('spawns one distant obstacle with two clear lanes', () => {
    const game = running();
    game.spawnIn = 0;
    step(game, {}, 1 / 60, () => 0.5);
    expect(game.obstacles).toEqual([{ id: 0, x: 0, z: -95 }]);
  });
  it('keeps distance within 1% across frame rates', () => {
    const a = running(), b = running();
    advance(a, 10, { accelerate: true }, 30);
    advance(b, 10, { accelerate: true }, 60);
    expect(Math.abs(a.distance - b.distance) / b.distance).toBeLessThan(0.01);
  });
});
