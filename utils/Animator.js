function pollyfill () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
                                    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        fn(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}

process.browser && pollyfill();

function Animator (duration, progress, easing) {
  this.duration = duration;
  this.progress = progress;
  this.easing = easing || function (p) {
    return p;
  };
}

Animator.prototype = {
  start: function (finished) {
    var startTime = Date.now();
    var duration = this.duration;
    var self = this;

    requestAnimationFrame(function step () {
      var p = (Date.now() - startTime) / duration;
      var next = true;

      if (p < 1.0) {
        self.progress(self.easing(p), p);
      } else {
        if (typeof finished === 'function') {
          next = finished() === false;
        } else {
          next = finished === false;
        }

        if (!next) {
          self.progress(self.easing(1.0), 1.0);
        } else {
          startTime += duration;
          self.progress(self.easing(p), p);
        }
      }

      if (next) requestAnimationFrame(step);
    });
  }
};

export default Animator;
