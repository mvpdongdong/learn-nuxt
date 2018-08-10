import Select from './src/select';
import Option from './src/option';

Select.install = (Vue) => {
  Vue.component(Select.name, Select);
};

Option.install = (Vue) => {
  Vue.component(Option.name, Option);
};

export {
  Select,
  Option
};
