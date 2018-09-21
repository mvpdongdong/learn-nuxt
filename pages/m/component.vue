<template>
  <section class="container">
    <mu-card class="user-card">
      <sd-swipe-cell :onClose="onClose">
        <div slot="left" class="btn-danger">确定</div>
        <div>单元格</div>
        <div slot="right" class="btn-danger">取消</div>
      </sd-swipe-cell>
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

<style lang="scss" scoped>
.btn-danger {
  padding: 0 20px;
  color: #fff;
  background-color: #F44;
}
</style>


