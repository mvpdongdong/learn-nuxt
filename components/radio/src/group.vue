<template>
  <div class="sd-radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SdRadioGroup',
  componentName: 'SdRadioGroup',
  props: {
    value: {},
    disabled: Boolean
  },
  data () {
    return {

    };
  }
};
</script>

