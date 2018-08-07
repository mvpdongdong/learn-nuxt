<template>
  <div :class="[
      'sd-switch',
      { 'is-checked': isChecked },
      { 'is-disabled': disabled}
    ]"
    @click="switchValue"
  >
    <div ref="core" class="sd-switch__core"></div>
  </div>
</template>
<script>
export default {
  name: 'SdSwitch',
  props: {
    value: {},
    disabled: Boolean,
    activeValue: {
      type: [String, Boolean, Number],
      default: true
    },
    inactiveValue: {
      type: [String, Boolean, Number],
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    isChecked () {
      return this.value === this.activeValue;
    }
  },
  methods: {
    switchValue () {
      !this.disabled && this.handleChange();
    },
    handleChange () {
      this.$emit('input', this.isChecked ? this.inactiveValue : this.activeValue);
      this.$nextTick(function () {
        if (this.inactiveColor || this.activeColor) {
          this.setBackgroundColor();
        }
      });
    },
    setBackgroundColor () {
      let newColor = this.isChecked ? this.activeColor : this.inactiveColor;
      this.$refs.core.style.borderColor = newColor;
      this.$refs.core.style.backgroundColor = newColor;
    }
  },
  mounted () {
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor();
    }
  }
};
</script>
<style lang="scss">
.sd-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
}
.sd-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color .3s,background-color .3s;
  vertical-align: middle;
  &:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    transition: all .3s;
    width: 16px;
    height: 16px;
    background-color: #fff;
  }
}
.sd-switch.is-checked {
  .sd-switch__core {
    width: 40px;
    border-color: #409eff;
    background-color: #409eff;
    &:after {
      left: 100%;
      margin-left: -17px;
    }
  }
}
.sd-switch.is-disabled .sd-switch__core {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>

