import Vue from 'vue';
import NotifyOpt from './index.vue';

let instance, timer;
const initInstance = () => {
  instance = new (Vue.extend(NotifyOpt))({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

const isObj = obj => Object.prototype.toString.call(obj) === '[Object object]';

const parseOptions = message => isObj(message) ? message : { message };

const Notify = options => {
  if (!instance) {
    initInstance();
  }

  options = {
    ...Notify.defaultOptions,
    ...parseOptions(options)
  };

  Object.assign(instance, options);

  clearTimeout(timer);
  timer = setTimeout(() => {
    Notify.clear();
  }, options.duration);
};

Notify.defaultOptions = {
  value: true,
  message: '',
  color: 'white',
  background: 'rgb(255, 68, 68)',
  duration: 3000
};

Notify.clear = () => {
  if (instance) {
    instance.value = false;
  }
};

export default Notify;
