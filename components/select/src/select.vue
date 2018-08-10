<template>
  <div class="sd-select">
    <input type="text" readonly v-model="selectedLabel">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SdSelect',
  componentName: 'SdSelect',
  provide () {
    return {
      'select': this
    };
  },
  props: {
    value: {}
  },
  data () {
    return {
      selectedLabel: '',
      selected: '',
      options: []
    };
  },
  watch: {
    value (val, oldVal) {
      this.setSelected();
    }
  },
  methods: {
    getOption (value) {
      let selectOption = this.options.find(option => {
        return option.value === value;
      });
      return selectOption;
    },
    setSelected () {
      let selectedOption = this.getOption(this.value);
      if (selectedOption) {
        this.selected = selectedOption;
        this.selectedLabel = this.selected.label;
      }
    },
    handleOptionSelect (option) {
      this.$emit('input', option.value);
      if (this.value !== option.value) {
        this.$emit('change', option.value);
      }
    }
  },
  created () {
    this.$on('optionSelect', this.handleOptionSelect);
  },
  mounted () {
    this.setSelected();
  }
};
</script>
<style lang="scss">

</style>

