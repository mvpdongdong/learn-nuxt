<template>
  <section class="container" style="height: 1500px;">
    <mu-card class="user-card">
      <sd-swipe-cell :onClose="onClose">
        <div slot="left" class="btn-danger">确定</div>
        <div>单元格</div>
        <div slot="right" class="btn-danger">取消</div>
      </sd-swipe-cell>
    </mu-card>
    <mu-card class="user-card">
      <sd-button @click="show=true">底部弹出</sd-button>
      <sd-popup v-model="show" position="bottom">
        <div style="height:300px;">
          <sd-button @click="show=false">取消</sd-button>
        </div>
      </sd-popup>
      <sd-button @click="show2=true">右侧弹出</sd-button>
      <sd-popup v-model="show2" position="right">
        <div style="height:100px;">
          <sd-button @click="show2=false">取消</sd-button>
          <sd-button @click="show3=true">右侧弹出</sd-button>
          <sd-popup v-model="show3" position="right">
            <div style="height:300px;">
              <sd-button @click="show3=false">取消</sd-button>
            </div>
          </sd-popup>
        </div>
      </sd-popup>
      <sd-button @click="show4=true">中间弹出</sd-button>
      <sd-popup v-model="show4">
        <div style="height:50px;width: 200px;">
          <sd-button @click="show4=false">取消</sd-button>
        </div>
      </sd-popup>
    </mu-card>
    <mu-card class="user-card">
      <sd-button @click="showNotify">显示消息</sd-button>
    </mu-card>
    <mu-card class="user-card">
      <div class="demo-container mb20">
        <sd-slider class="mb30" v-model="sliderValue"/>
        <sd-slider v-model="sliderValue2" bar-height="4px" :step="10"/>
      </div>
    </mu-card>
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
      show: false,
      show2: false,
      show3: false,
      show4: false,
      sliderValue: 30,
      sliderValue2: 20
    };
  },
  methods: {
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          if (confirm('确定删除吗')) {
            instance.close();
          }
          break;
      }
    },
    showNotify () {
      this.$notify('hello');
    }
  },
  layout: 'mobile'
};
</script>

<style lang="scss">
.btn-danger {
  padding: 0 20px;
  color: #fff;
  background-color: #F44;
}
.demo-container {
  padding: 30px 0;
}
.mb20 {
  margin-bottom: 20px;
}
.mb30 {
  margin-bottom: 30px;
}
</style>


