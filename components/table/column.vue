<template></template>
<script>
export default {
  name: 'SdTableColumn',
  props: {
    prop: String,
    label: String
  },
  created () {
    this.$parent.addColumn(this);
  }
};
</script>
