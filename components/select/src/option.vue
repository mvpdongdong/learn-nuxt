<template>
  <div @click="handleSelect">{{label}}  {{isSelected ? '选中' : '未选中'}}</div>
</template>
<script>
export default {
  name: 'SdOption',
  componentName: 'SdOption',
  inject: ['select'],
  props: {
    value: {},
    label: {}
  },
  computed: {
    isSelected () {
      return this.select.value === this.value;
    }
  },
  methods: {
    handleSelect () {
      this.select.$emit('optionSelect', this);
    }
  },
  created () {
    this.select.options.push(this);
  }
};
</script>
