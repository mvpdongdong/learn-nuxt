<template>
  <div class="tab-pane" v-show="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SdTabPane',
  componentName: 'SdTabPane',
  props: {
    name: String,
    label: String
  },
  computed: {
    active () {
      const active = this.$parent.currentTabName === (this.name || this.index);
      return active;
    }
  },
  data () {
    return {
      show: false
    };
  },
  mounted () {
    this.$parent.addPane(this);
  }
};
</script>
