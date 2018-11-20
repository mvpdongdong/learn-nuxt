import { isServer } from './';
let surportPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get () {
        surportPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

export function on (target, event, handler, passive = false) {
  target.addEventListener(event, handler,
    surportPassive ? { passive, capture: false } : false
  );
};

export function off (target, event, handler) {
  target.removeEventListener(event, handler);
};
