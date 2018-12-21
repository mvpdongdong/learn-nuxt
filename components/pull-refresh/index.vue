<template>
  <div class="sd-pull-refresh">
    <div
      class="sd-pull-refresh__panel"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      :style="style"
    >
      <div class="sd-pull-refresh__head">
        <slot name="normal" v-if="status === 'normal'"></slot>
        <slot name="pulling" v-if="status === 'pulling'">
          <span class="pulling-text">{{pullingText || '下拉即可刷新...'}}</span>
        </slot>
        <slot name="loosing" v-if="status === 'loosing'">
          <span class="loosing-text">{{loosingText || '释放即可刷新...'}}</span>
        </slot>
        <slot name="loading" v-if="status === 'loading'">
          <span class="loading-text">{{loadingText || '加载中...'}}</span>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import utils from '~/utils/scroll';
import Touch from '~/mixins/touch';

export default {
  name: 'SdPullRefresh',
  mixins: [Touch],
  props: {
    pullingText: String,
    loosingText: String,
    loadingText: String,
    value: {
      type: Boolean,
      required: true
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    }
  },
  computed: {
    style () {
      return {
        transform: `translate3d(0, ${this.height}px, 0)`,
        transition: `${this.duraton}ms`
      };
    },
    untouchable () {
      return this.status === 'loading';
    }
  },
  watch: {
    value (val) {
      this.duraton = this.animationDuration;
      this.setStatus(val ? this.headHeight : 0, val);
    }
  },
  data () {
    return {
      status: 'normal',
      height: 0,
      duraton: 0
    };
  },
  mounted () {
    this.scroller = utils.getScrollEventTarget(this.$el);
  },
  methods: {
    onTouchStart (event) {
      if (this.untouchable) {
        return void (0);
      }
      if (this.isCeiling()) {
        this.duraton = 0;
        this.touchStart(event);
      }
    },
    onTouchMove (event) {
      if (this.untouchable) {
        return void (0);
      }
      this.touchMove(event);
      if (!this.ceiling && this.isCeiling()) {
        this.duraton = 0;
        this.startY = event.touches[0].clientY;
        this.deltaY = 0;
      }

      if (this.ceiling && this.deltaY >= 0) {
        if (this.direction === 'vertical') {
          this.setStatus(this.ease(this.deltaY));
        }
      }
    },
    onTouchEnd () {
      if (this.untouchable) {
        return void (0);
      }

      if (this.ceiling && this.deltaY >= 0) {
        this.duraton = this.animationDuration;
        if (this.status === 'loosing') {
          this.setStatus(this.headHeight, true);
          this.$emit('input', true);
          this.$emit('refresh');
        } else {
          this.setStatus(0);
        }
      }
    },
    setStatus (height, isLoading) {
      this.height = height;
      const status = isLoading
        ? 'loading'
        : this.height === 0
          ? 'normal'
          : this.height < this.headHeight
            ? 'pulling'
            : 'loosing';
      if (this.status !== status) {
        this.status = status;
      }
    },
    ease (height) {
      const { headHeight } = this;
      return height < this.headHeight
        ? height
        : height < 2 * headHeight
          ? Math.round(headHeight + (height - headHeight) / 2)
          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
    },
    isCeiling () {
      this.ceiling = utils.getScrollTop(this.scroller) === 0;
      return this.ceiling;
    }
  }
};
</script>
<style lang="scss">
.sd-pull-refresh {
  position: relative;
  overflow: hidden;
}
.sd-pull-refresh__head {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #999;
  text-align: center;
  overflow: hidden;

}
</style>


