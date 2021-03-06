import Vue from 'vue';
import Message from '~/components/message/index.js';
import Radio from '~/components/radio/index.js';
import Checkbox from '~/components/checkbox/index.js';
import Switch from '~/components/switch/index.js';
import RadioGroup from '~/components/radio/src/group';
import CheckboxGroup from '~/components/checkbox/src/group';
import { Select, Option } from '~/components/select';
import Tabs from '~/components/tabs/tabs';
import TabPane from '~/components/tabs/tab-pane';
import Table from '~/components/table/table';
import Column from '~/components/table/column';
import SwipeCell from '~/components/swipe-cell';
import Popup from '~/components/popup';
import clickoutside from '~/utils/clickoutside';
import Notify from '~/components/notify';
import Button from '~/components/button';
import Slider from '~/components/slider';
import List from '~/components/list';
import PullRefresh from '~/components/pull-refresh';
import Swipe from '~/components/swipe/swipe';
import SwipeItem from '~/components/swipe/swipe-item';
import Pagination from '~/components/pagination';

Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(clickoutside);
Vue.component(Button.name, Button);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Table.name, Table);
Vue.component(Column.name, Column);
Vue.component(SwipeCell.name, SwipeCell);
Vue.component(Popup.name, Popup);
Vue.component(Slider.name, Slider);
Vue.component(List.name, List);
Vue.component(PullRefresh.name, PullRefresh);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notify;
