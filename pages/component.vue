<template>
  <section class="main-container">
    <el-card>
      <h2>信息弹窗组件</h2>
      <button class="btn" @click="popMessage">点击</button>
    </el-card>
    <el-card>
      <h2>单选组件</h2>
      <sd-radio @change="handleRadioChange" v-model="radio" label="hello"></sd-radio>
      <sd-radio @change="handleRadioChange" v-model="radio" label="shen"></sd-radio>
      <sd-radio-group @change="handleRadioChange" v-model="radioGroup">
        <sd-radio label="hello"></sd-radio>
        <sd-radio label="shen"></sd-radio>
      </sd-radio-group>
      <br>
      选择值：{{radioGroup}}
    </el-card>
    <el-card>
      <h2>多选框组件</h2>
      <sd-checkbox v-model="checkbox" label="hello" @change="handleCheckboxChange"></sd-checkbox>
      <sd-checkbox v-model="checkbox" label="shen" @change="handleCheckboxChange"></sd-checkbox>
      <sd-checkbox v-model="checkbox" label="dong" @change="handleCheckboxChange"></sd-checkbox>
      <sd-checkbox-group v-model="checkboxGroup" @change="handleCheckboxChange">
        <sd-checkbox label="hello"></sd-checkbox>
        <sd-checkbox label="shen"></sd-checkbox>
        <sd-checkbox label="dong"></sd-checkbox>
      </sd-checkbox-group>
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
      <sd-select @change="handleSelectChange" v-model="select">
        <sd-option value="1" label="hello"></sd-option>
        <sd-option value="2" label="shen"></sd-option>
      </sd-select>
      选择值：{{select}}
    </el-card>
    <el-card>
      <h2>tabs组件</h2>
      <sd-tabs v-model="tabs">
        <sd-tab-pane name="hello" label="tab1"><div style="color:red">pane1</div></sd-tab-pane>
        <sd-tab-pane name="world" label="tab2">pane2</sd-tab-pane>
      </sd-tabs>
      选择值：{{tabs}}
    </el-card>
    <el-card>
      <h2>table组件</h2>
      <sd-table :list="tableList">
        <sd-table-column prop="hello" label="column1"></sd-table-column>
        <sd-table-column prop="world" label="column2"></sd-table-column>
      </sd-table>
      <button @click="addTableData">add data</button>
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
      radioGroup: 'hello',
      checkbox: ['hello'],
      checkboxGroup: ['hello'],
      switchValue: 100,
      select: '1',
      tabs: 'world',
      tableList: [
        { hello: '1', world: '2' },
        { hello: '3', world: '4' }
      ]
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
    },
    handleSelectChange (val) {
      console.log(val);
    },
    addTableData () {
      let random = Math.ceil(Math.random(0, 1) * 10);
      this.tableList = this.tableList.concat({ hello: random, world: random + 1 });
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

