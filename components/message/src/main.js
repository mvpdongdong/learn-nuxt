import Vue from 'vue';
import Main from './main.vue';
let MessageConstructor = Vue.extend(Main);

let instances = [];
let instance;
let seed = 1;
let zIndex = 1000;

const Message = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  instance = new MessageConstructor({
    data: options
  });
  instance.id = 'message_' + seed++;
  instance.vm = instance.$mount();
  instance.dom = instance.vm.$el;
  document.body.appendChild(instance.dom);
  instance.dom.style.zIndex = zIndex + seed;
  instance.vm.visible = true;
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'error', 'info'].forEach(type => {
  Message[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.closeAll = function () {
  instances.forEach(instance => {
    instance.close();
  });
};

export default Message;
