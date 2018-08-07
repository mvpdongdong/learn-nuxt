<template>
  <div v-if="!isNoMoreDate" class="module-load-more" @click="fetchData">
    <span v-if="!isLoading">点击加载更多</span>
    <span v-else>加载中。。。</span>
  </div>
  <div v-else class="module-load-more">
    到底了~
  </div>
</template>
<script>
export default {
  name: 'LoadMore',
  props: {
    getUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pageNum: 2,
      isLoading: false,
      totalPage: 5,
      isNoMoreDate: false,
      text: '点击加载更多'
    };
  },
  methods: {
    async fetchData () {
      if (this.isLoading) return;
      this.isLoading = true;
      const { data } = await this.$axios.get(`${this.getUrl}?pageNum=${this.pageNum}`);
      this.$emit('loadMore', data);
      this.isLoading = false;
      this.pageNum += 1;
      if (this.totalPage < this.pageNum) {
        this.isNoMoreDate = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.module-load-more {
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
</style>

