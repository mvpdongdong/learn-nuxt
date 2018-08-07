<template>
  <div class="main">
    <topic-list-chalk :topicList="newList">
      <load-more slot="loadMore" :getUrl='apiUrl' @loadMore="loadData"></load-more>
    </topic-list-chalk>
  </div>
</template>

<script>
import TopicListChalk from '~/components/TopicListChalk';
import LoadMore from '~/components/LoadMore';

export default {
  head () {
    return {
      titleTemplate: '%s - 最新'
    };
  },
  async asyncData ({ app }) {
    const { data } = await app.$axios.get('topics/latest.json');

    return {
      newList: data
    };
  },
  data () {
    return {
      apiUrl: 'topics/latest.json'
    };
  },
  methods: {
    loadData (data) {
      this.newList = this.newList.concat(data);
    }
  },
  components: {
    TopicListChalk,
    LoadMore
  }
};
</script>
