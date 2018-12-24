<template>
  <section class="container">
    <mu-card class="user-card">
      <sd-pull-refresh style="height: 500px" v-model="isLoading" @refresh="onRefresh">
        <p>刷新次数: {{ count }}</p>
      </sd-pull-refresh>
    </mu-card>
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
    <!-- <mu-card class="user-card scroller">
      <sd-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <ul>
          <li class="demo-list-li"
            v-for="item in list"
            :key="item"
          >
            {{item}}
          </li>
        </ul>
      </sd-list>
    </mu-card> -->
    <mu-card class="user-card demo-swipe">
      <sd-swipe indicator-color="white" @change="onSwipeChange">
        <sd-swipe-item>1</sd-swipe-item>
        <sd-swipe-item>2</sd-swipe-item>
        <sd-swipe-item>3</sd-swipe-item>
        <sd-swipe-item>4</sd-swipe-item>
      </sd-swipe>
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
      sliderValue2: 20,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      count: 0
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
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = this.list.length + 1;
          this.list.push(text < 10 ? '0' + text : text);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 80) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    onSwipeChange (index) {
      console.log(index);
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
ul {
  padding: 0;
  margin: 0;
}
.demo-list-li {
  line-height: 30px;
  list-style-type: none;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
}
.scroller {
   height:400px;
   overflow: auto;
   -webkit-overflow-scrolling: touch;
}
.sd-pull-refresh__panel {
  height: 100%;
}
.demo-swipe .sd-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 150px;
}
.demo-swipe .sd-swipe-item:nth-child(odd) {
    background-color: #66c6f2;
}
.demo-swipe .sd-swipe-item:nth-child(even) {
    background-color: #39a9ed;
}
</style>


