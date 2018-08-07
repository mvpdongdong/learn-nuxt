<template>
  <label class="sd-radio"
    :class="[
      { 'is-disabled': isDisabled },
      {'is-checked': isChecked}
    ]"
  >
    <span
      class="sd-radio__input"
      :class="[
        {'is-disabled': isDisabled},
        {'is-checked': isChecked}
      ]"
    >
      <span class="sd-radio__inner"></span>
      <input
        class="sd-radio__original"
        :value="label"
        v-model="model"
        type="radio"
        :disabled="isDisabled"
        @change="handleChange"
      >
    </span><span class="sd-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'SdRadio',
  props: {
    label: {},
    disabled: Boolean,
    value: {}
  },
  computed: {
    model: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    },
    isDisabled () {
      return this.disabled;
    },
    isChecked () {
      return this.label === this.model;
    }
  },
  data () {
    return {

    };
  },
  methods: {
    handleChange () {
      this.$nextTick(function () {
        this.$emit('change', this.model);
      });
    }
  }
};
</script>
<style lang="scss">
.sd-radio {
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
    .sd-radio__inner {
      border-color: #409eff;
      background: #409eff;
    }
    .sd-radio__label {
      color: #409eff;
    }
    .sd-radio__inner:after {
      transform: translate(-50%,-50%) scale(1);
    }
    &.is-disabled {
      .sd-radio__inner:after {
        background-color: #c0c4cc;
      }
    }
  }
  &.is-disabled {
    .sd-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      cursor: not-allowed;
    }
    .sd-radio__label {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.sd-radio__input {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.sd-radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
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
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
  }
}
.sd-radio__original {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
}
.sd-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>

