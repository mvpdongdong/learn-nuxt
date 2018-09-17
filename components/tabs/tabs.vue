<template>
  <div class="tabs">
    <div class="tabs-nav">
      <li v-for="pane in panes" @click="selectTab(pane.name)">
        {{pane.label}}
      </li>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SdTabs',
  componentName: 'SdTabs',
  props: {
    value: String
  },
  data () {
    return {
      panes: [],
      currentTabName: this.value
    };
  },
  methods: {
    addPane (pane) {
      this.panes.push(pane);
    },
    selectTab (tabName) {
      this.currentTabName = tabName;
      this.$emit('input', this.currentTabName);
    }
  }
};
</script>
<style lang="scss" scoped>
.tabs-nav {
  overflow: hidden;
  li {
    float: left;
    border: 1px solid #eee;
    &.active {
      color: red;
    }
  }
}
</style>

