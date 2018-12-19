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
      <button @click="show=true">底部弹出</button>
      <sd-popup v-model="show" position="bottom">
        <div style="height:300px;">
          <button @click="show=false">取消</button>
        </div>
      </sd-popup>
      <button @click="show2=true">右侧弹出</button>
      <sd-popup v-model="show2" position="right">
        <div style="height:100px;">
          <button @click="show2=false">取消</button>
          <button @click="show3=true">右侧弹出</button>
          <sd-popup v-model="show3" position="right">
            <div style="height:300px;">
              <button @click="show3=false">取消</button>
            </div>
          </sd-popup>
        </div>
      </sd-popup>
      <button @click="show4=true">中间弹出</button>
      <sd-popup v-model="show4">
        <div style="height:50px;width: 200px;">
          <button @click="show4=false">取消</button>
        </div>
      </sd-popup>
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
      show4: false
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
</style>


