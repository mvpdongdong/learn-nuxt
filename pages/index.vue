<template>
  <div class="main">
    <topic-list-chalk :topicList="hotList">
      <load-more slot="loadMore" :getUrl="apiUrl" @loadMore="loadData"></load-more>
    </topic-list-chalk>
  </div>
</template>

<script>
import TopicListChalk from '~/components/TopicListChalk';
import LoadMore from '~/components/LoadMore';

export default {
  head () {
    return {
      titleTemplate: '%s - 最热'
    };
  },
  async asyncData ({ app }) {
    const { data } = await app.$axios.get('topics/hot.json');
    return {
      hotList: data
    };
  },
  data () {
    return {
      apiUrl: 'topics/hot.json',
      text: ''
    };
  },
  methods: {
    loadData (data) {
      this.hotList = this.hotList.concat(data);
    },
    triggerMessage () {
      this.$message.success({
        message: 'hello'
      });
    }
  },
  components: {
    TopicListChalk,
    LoadMore
  }
};
</script>
