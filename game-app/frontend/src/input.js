export function keyboard(onPause) {
  const held = new Set();
  const controls = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyP', 'Escape']);
  window.addEventListener('keydown', event => {
    if (!controls.has(event.code)) return;
    event.preventDefault();
    if (event.code === 'KeyP' || event.code === 'Escape') {
      if (!event.repeat) onPause();
    } else held.add(event.code);
  });
  window.addEventListener('keyup', event => held.delete(event.code));
  return {
    clear: () => held.clear(),
    read: () => ({
      accelerate: held.has('KeyW') || held.has('ArrowUp'),
      brake: held.has('KeyS') || held.has('ArrowDown'),
      steer: Number(held.has('KeyD') || held.has('ArrowRight')) - Number(held.has('KeyA') || held.has('ArrowLeft')),
    }),
  };
}
