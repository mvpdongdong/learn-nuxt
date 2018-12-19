<template>
  <transition name="sd-slide-down">
    <div v-show="value" :style="style" class="sd-notify">
      {{message}}
    </div>
  </transition>
</template>
<script>
import context from '~/mixins/popup/context';

export default {
  name: 'SdNotify',
  props: {
    value: Boolean,
    message: [String, Number],
    color: {
      type: String,
      value: 'white'
    },
    background: {
      type: String,
      value: 'rgb(255, 68, 68)'
    },
    duration: {
      type: Number,
      value: 3000
    }
  },
  computed: {
    style () {
      return {
        background: this.background,
        color: this.color
      };
    }
  },
  mounted () {
    this.$el.style.zIndex = context.zIndex++;
  }
};
</script>
<style lang="scss">
.sd-notify {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 6px 15px;
  font-size: 14px;
  line-height: 20px;
  transition: 0.3s ease
}
.sd-slide-down-enter, .sd-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>

