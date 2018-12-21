<template>
  <div
    class="sd-slider"
    @click.stop="onClick"
  >
    <div
      class="sd-slider__bar"
      :style="barStyle"
    >
      <span
        class="sd-slider__button"
        @touchmove.prevent.stop="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
      </span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SdSlider',
  props: {
    value: Number,
    barHeight: {
      type: String,
      default: '2px'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  computed: {
    barStyle () {
      return {
        height: this.barHeight,
        width: this.formate(this.value) + '%'
      };
    }
  },
  methods: {
    onTouchMove (event) {
      const touch = event.touches[0];
      const clientX = touch.clientX;
      const rect = this.$el.getBoundingClientRect();
      const value = (clientX - rect.left) / rect.width * 100;
      this.updateValue(value, true);
    },
    onTouchEnd (event) {
      this.updateValue(this.value, true);
    },
    onClick (event) {
      let clientX = event.clientX;
      let rect = this.$el.getBoundingClientRect();
      let value = (clientX - rect.left) / rect.width * 100;
      this.updateValue(value, true);
    },
    updateValue (value, end) {
      value = this.formate(value);
      this.$emit('input', value);
      if (end) {
        this.$emit('change', value);
      }
    },
    formate (value) {
      return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
    }
  }
};
</script>

<style lang="scss">
.sd-slider {
  position: relative;
  border-radius: 999px;
  background: #e5e5e5;
}
.sd-slider__bar {
  position: relative;
  border-radius: inherit;
  background-color: #1989fa;
}
.sd-slider__button {
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translate3d(50%, -50%, 0);
  will-change: transform;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
  }
}
</style>

