<template>
  <topic-list :topicList="qnaList" />
</template>

<script>
import { fetchTopicList } from '~/utils'
import TopicList from '~/components/TopicList'

export default {
  head () {
    return {
      titleTemplate: '%s - 问与答'
    }
  },
  async asyncData ({ app }) {
    const qnaList = await fetchTopicList(app.$axios, 'qna')

    return {
      qnaList
    }
  },
  layout: 'mobile',
  components: {
    TopicList
  }
}
</script>
