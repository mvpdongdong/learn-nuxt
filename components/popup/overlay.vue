<template>
  <transition name="sd-fade">
    <div
      @touchmove.prevent.stop
      @click="$emit('click', $event)"
      v-show="visible"
      class="sd-overlay"
      :style="style"
      >
    </div>
  </transition>
</template>
<script>
export default {
  name: 'overlay',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    zIndex: Number
  },
  computed: {
    style () {
      return {
        zIndex: this.zIndex
      };
    }
  }
};
</script>
<style lang="scss">
.sd-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.3s ease-out;
  background: rgba($color: #000, $alpha: 0.7)
}
.sd-fade-enter, .sd-fade-leave-to {
  opacity: 0;
}
</style>


