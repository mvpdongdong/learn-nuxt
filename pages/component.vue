<template>
  <section class="main-container">
    <el-card>
      <h2>信息弹窗组件</h2>
      <button class="btn" @click="popMessage">点击</button>
    </el-card>
    <el-card>
      <h2>单选组件</h2>
      <sd-radio-group @change="handleRadioChange" v-model="radio">
        <sd-radio label="hello"></sd-radio>
        <sd-radio label="shen"></sd-radio>
      </sd-radio-group>
      <br>
      选择值：{{radio}}
    </el-card>
    <el-card>
      <h2>多选框组件</h2>
      <sd-checkbox v-model="checkbox" label="hello" @change="handleCheckboxChange"></sd-checkbox>
      <sd-checkbox v-model="checkbox" label="shen" @change="handleCheckboxChange"></sd-checkbox>
      <sd-checkbox v-model="checkbox" label="dong" @change="handleCheckboxChange"></sd-checkbox>
      <br>
      选择值：{{checkbox}}
    </el-card>
    <el-card>
      <h2>Switch开关组件</h2>
      <sd-switch
        v-model="switchValue"
        :active-value="100"
        :inactive-value="0"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </sd-switch>
      <br>
      选择值：{{switchValue}}
    </el-card>
    <el-card>
      <h2>select组件</h2>
    </el-card>
  </section>
</template>
<script>
export default {
  head () {
    return {
      titleTemplate: '%s - 组件示例'
    };
  },
  data () {
    return {
      radio: 'hello',
      checkbox: ['hello'],
      switchValue: 100
    };
  },
  methods: {
    popMessage () {
      this.$message('hello');
    },
    handleRadioChange (val) {
      console.log(val);
    },
    handleCheckboxChange (val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  padding: 5px 20px;
  border: 1px solid #999;
  color: #666;
  border-radius: 2px;
}
</style>

