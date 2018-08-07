import Vue from 'vue';
import Message from '~/components/message/index.js';
import Radio from '~/components/radio/index.js';
import Checkbox from '~/components/checkbox/index.js';
import Switch from '~/components/switch/index.js';

Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.prototype.$message = Message;
