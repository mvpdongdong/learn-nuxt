<template>
  <div class="sd-list">
    <slot/>
    <slot name="loading">
      <div v-if="loading" class="list-loading">
        {{loadingText}}
      </div>
    </slot>
    <div v-if="finished" class="list-finished">
      {{finishedText}}
    </div>
  </div>
</template>
<script>
import utils from '~/utils/scroll';
import { on, off } from '~/utils/event';

export default {
  name: 'SdList',
  model: {
    prop: 'loading'
  },
  props: {
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finished: Boolean,
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    immediaCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  watch: {
    loading () {
      this.$nextTick(this.check);
    },
    finished () {
      this.$nextTick(this.check);
    }
  },
  mounted () {
    this.scroller = utils.getScrollEventTarget(this.$el);
    this.bindHandler();
    if (this.immediaCheck) {
      this.$nextTick(this.check);
    }
  },
  destroyed () {
    this.unBindHandler();
  },
  activated () {
    this.bindHandler();
  },
  deactivated () {
    this.unBindHandler();
  },
  methods: {
    check () {
      if (this.loading || this.finished) {
        return void (0);
      }

      const { scroller } = this;
      const el = this.$el;
      const scrollerHeight = utils.getVisibleHeight(scroller);

      if (
        !scrollerHeight ||
        utils.getComputedStyle(el).display === 'none' ||
        el.offsetParent === null
      ) {
        return;
      }

      const scrollTop = utils.getScrollTop(scroller);
      const scrollerScrollHeight = scroller === window ? document.documentElement.offsetHeight : scroller.scrollHeight;
      const reachBottom = scrollerScrollHeight - scrollTop - scrollerHeight < this.offset;

      if (reachBottom) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },
    bindHandler () {
      on(this.scroller, 'scroll', this.check);
    },
    unBindHandler () {
      off(this.scroller, 'scroll', this.check);
    }
  }
};
</script>
<style lang="scss">
.list-loading, .list-finished {
  color: #969799;
  font-size: 13px;
  line-height: 50px;
  text-align: center;
}
</style>

