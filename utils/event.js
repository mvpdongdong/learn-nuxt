export function on (target, event, handler, passive = false) {
  target.addEventListener(event, handler, {passive, captrue: false});
};

export function off (target, event, handler) {
  target.removeEventListener(event, handler);
};
