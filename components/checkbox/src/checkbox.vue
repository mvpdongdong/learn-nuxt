<template>
  <label
    :class="[
      'sd-checkbox',
      { 'is-disabled': isDisabled },
      { 'is-checked': isChecked }
    ]"
  >
    <span :class="[
        'sd-checkbox__input',
        { 'is-disabled': isDisabled },
        { 'is-checked': isChecked }
      ]"
    >
      <span class="sd-checkbox__inner"></span>
      <input
        class="sd-checkbox__original"
        type="checkbox"
        :disabled="isDisabled"
        :value="label"
        v-model="model"
        @change="handleChange"
      >
    </span>
    <span class="sd-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'SdCheckbox',
  componentName: 'SdCheckbox',
  inject: {
    checkboxGroup: {
      default: null
    }
  },
  props: {
    label: {},
    value: {},
    disabled: Boolean
  },
  computed: {
    model: {
      get () {
        return this.checkboxGroup ? this.checkboxGroup.value : this.value;
      },
      set (val) {
        this.$emit('input', val);
        this.checkboxGroup && this.checkboxGroup.$emit('input', val);
      }
    },
    isDisabled () {
      return (this.checkboxGroup && this.checkboxGroup.disabled) || this.disabled;
    },
    isChecked () {
      return this.model.indexOf(this.label) !== -1;
    }
  },
  methods: {
    handleChange () {
      this.$emit('change', this.model);
      this.checkboxGroup && this.checkboxGroup.$emit('change', this.model);
    }
  }
};
</script>
<style lang="scss">
.sd-checkbox {
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  white-space: nowrap;
  line-height: 1;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  outline: none;
  &.is-checked {
    .sd-checkbox__inner {
      border-color: #409eff;
      background: #409eff;
    }
    .sd-checkbox__label {
      color: #409eff;
    }
    .sd-checkbox__inner:after {
      transform: rotate(45deg) scale(1);
    }
    &.is-disabled {
      .sd-checkbox__inner:after {
        background-color: #c0c4cc;
      }
    }
  }
  &.is-disabled {
    .sd-checkbox__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      cursor: not-allowed;
    }
    .sd-checkbox__label {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.sd-checkbox__input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.sd-checkbox__inner {
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  &:after {
    content: "";
    width: 4px;
    height: 7px;
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    position: absolute;
    left: 4px;
    top: 1px;
    transform: rotate(45deg) scale(0);
    transition: transform .15s ease-in .05s;
    transform-origin: center;
  }
}
.sd-checkbox__original {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
}
.sd-checkbox__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>

