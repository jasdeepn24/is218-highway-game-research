import './style.css';
import { createGame, step, togglePause, DURATION } from './game.js';
import { keyboard } from './input.js';
import { createScene } from './scene.js';

const $ = id => document.getElementById(id);
let game = createGame();
let accumulator = 0;
const input = keyboard(pause);
function pause() {
  togglePause(game);
  input.clear();
  accumulator = 0;
}
function loseFocus() {
  if (game.status === 'running') pause();
  input.clear();
}
window.addEventListener('blur', loseFocus);
document.addEventListener('visibilitychange', () => { if (document.hidden) loseFocus(); });
$('pause').onclick = pause;
$('action').onclick = () => {
  if (game.status === 'paused') pause();
  else {
    game = createGame();
    game.status = 'running';
    input.clear();
    accumulator = 0;
  }
  $('action').blur();
};
function updateUI() {
  $('time').textContent = Math.max(0, DURATION - game.elapsed).toFixed(1);
  $('score').textContent = game.score;
  $('speed').textContent = Math.round(game.speed * 3.6);
  $('pause').disabled = !['running', 'paused'].includes(game.status);
  $('pause').textContent = game.status === 'paused' ? 'Resume' : 'Pause';
  $('panel').hidden = game.status === 'running';
  if (game.status === 'paused') {
    $('title').textContent = 'Take a breather.';
    $('message').textContent = 'Your run is paused. Resume when you’re ready.';
    $('action').textContent = 'Resume driving';
  } else if (game.status === 'over') {
    $('title').textContent = game.reason === 'collision' ? 'End of the road.' : 'Run complete.';
    $('message').textContent = `${game.reason === 'collision' ? 'You hit traffic.' : 'You made it through 20 seconds.'} Score: ${game.score} · Distance: ${Math.floor(game.distance)} m`;
    $('action').textContent = 'Drive again';
  }
}
try {
  const draw = createScene($('scene'));
  let previous = performance.now();
  function frame(now) {
    const elapsed = Math.min((now - previous) / 1000, 0.1);
    previous = now;
    if (game.status === 'running') {
      accumulator += elapsed;
      while (accumulator >= 1 / 60) {
        step(game, input.read(), 1 / 60);
        accumulator -= 1 / 60;
      }
    }
    draw(game);
    updateUI();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
} catch (error) {
  $('title').textContent = '3D graphics unavailable';
  $('message').textContent = 'Enable hardware acceleration or try a browser with WebGL support.';
  $('action').hidden = true;
  console.error(error);
}
