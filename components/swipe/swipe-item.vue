<template>
  <div
    class="sd-swipe-item"
    :style="style"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SdSwipeItem',
  data () {
    return {
      offset: 0
    };
  },
  computed: {
    style () {
      const { vertical, computedWidth, computedHeight } = this.$parent;
      return {
        width: computedWidth + 'px',
        height: vertical ? computedHeight + 'px' : '100%',
        transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
      };
    }
  },
  beforeCreate () {
    this.$parent.swipes.push(this);
  },
  destroyed () {
    const { swipes } = this.$parent;
    swipes.splice(swipes.indexOf(this), 1);
  }
};
</script>
<style lang="scss">
.sd-swipe-item {
    float: left;
    height: 100%;
}
</style>
