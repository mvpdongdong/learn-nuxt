<template>
  <div class="sd-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SdCheckboxGroup',
  componentName: 'SdCheckboxGroup',
  props: {
    value: {},
    disabled: Boolean
  },
  provide () {
    return {
      'checkboxGroup': this
    };
  }
};
</script>
