import Vue from 'vue';
import Message from '~/components/message/index.js';
import Radio from '~/components/radio/index.js';
import Checkbox from '~/components/checkbox/index.js';
import Switch from '~/components/switch/index.js';
import RadioGroup from '~/components/radio/src/group';
import CheckboxGroup from '~/components/checkbox/src/group';
import {Select, Option} from '~/components/select';

Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.prototype.$message = Message;
