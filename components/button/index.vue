<template>
  <button @click="onClick"
    :class="[
      'sd-button',
      'sd-button--normal',
      `sd-button--${this.type}`
    ]"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'SdButton',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event);
    }
  }
};
</script>
<style lang="scss">
.sd-button {
  position: relative;
  display: inline-block;
  height: 44px;
  line-height: 42px;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translate(-50%, -50%);
    border: inherit;
    border-color: #000;
    background-color: #000;
    border-radius: inherit;
  }
  &:active::before {
    opacity: .15;
  }
  &--default {
    color: #323233;
    background-color: #fff;
    border: 1px solid #ebedf0;
  }
  &--primary {
    color: #fff;
    background-color: #4b0;
    border: 1px solid #4b0;
  }
}
.sd-button--normal {
  padding: 0 15px;
  font-size: 14px;
}

</style>

