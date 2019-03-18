<template>
  <div class="sd-swipe">
    <div
      class="sd-swipe__track"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @transitionend.stop="$emit('change', activeIndicator)"
    >
      <slot></slot>
    </div>
    <slot name="indicator">
      <div
        v-if="showIndicators && count > 1"
        :class="[
          'sd-swipe__indicators',
          {
            'sd-swipe__indicators--vertical': vertical
          }
        ]">
        <i
          v-for="index in count"
          :class="[
            'sd-swipe__indicator',
            {
              'sd-swipe__indicator--active': index - 1 === activeIndicator
            }
          ]"
          :style="indicatorStyle"
        >
        </i>
      </div>
    </slot>
  </div>
</template>
<script>
import Touch from '~/mixins/touch';
import { on, off } from '~/utils/event';
import { isServer } from '~/utils/index';

export default {
  name: 'SdSwipe',
  mixins: [Touch],
  props: {
    width: Number,
    height: Number,
    vertical: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 500
    },
    autoplay: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    indicatorColor: String,
    initialSwipe: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      swipes: [],
      computedWidth: 0,
      computedHeight: 0,
      swiping: false,
      deltaX: 0,
      deltaY: 0,
      offset: 0,
      active: 0
    };
  },
  computed: {
    count () {
      return this.swipes.length;
    },
    size () {
      return this.vertical ? this.computedHeight : this.computedWidth;
    },
    trackSize () {
      return this.count * this.size;
    },
    delta () {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    trackStyle () {
      const mainAxis = this.vertical ? 'height' : 'width';
      const crossAxis = this.vertical ? 'width' : 'height';
      return {
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : '',
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`
      };
    },
    activeIndicator () {
      return (this.active + this.count) % this.count;
    },
    isCorrectDirection () {
      const expect = this.vertical ? 'vertical' : 'horizontal';
      return this.direction === expect;
    },
    indicatorStyle () {
      return {
        background: this.indicatorColor
      };
    }
  },
  watch: {
    swipes () {
      this.initialize();
    },

    initialSwipe () {
      this.initialize();
    },

    autoplay (autoplay) {
      if (!autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    }
  },
  mounted () {
    this.initialize();
    if (!isServer) {
      on(window, 'resize', this.onResize, true);
    }
  },
  destroyed () {
    this.clear();

    if (!isServer) {
      off(window, 'resize', this.onResize, true);
    }
  },
  methods: {
    initialize (active = this.initialSwipe) {
      this.clear();
      const el = this.$el;
      if (el) {
        const rect = el.getBoundingClientRect();
        this.computedWidth = this.width || rect.width;
        this.computedHeight = this.height || rect.height;
      }
      this.swiping = true;
      this.active = active;
      this.offset = this.count > 1 ? -this.active * this.size : 0;
      this.swipes.forEach(swipe => {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    onTouchStart (event) {
      if (!this.touchable) return;

      this.clear();
      this.swiping = true;
      this.touchStart(event);
      this.correctPosition();
    },
    onTouchMove (event) {
      if (!this.touchable || !this.swiping) return;

      this.touchMove(event);
      if (this.isCorrectDirection) {
        event.preventDefault();
        event.stopPropagation();
        this.move(0, Math.min(Math.max(this.delta, -this.size), this.size));
      }
    },
    onTouchEnd (event) {
      if (!this.touchable || !this.swiping) return;

      if (this.delta && this.isCorrectDirection) {
        const offset = this.vertical ? this.offsetY : this.offsetX;
        this.move(offset > 0 ? (this.delta > 0 ? -1 : 1) : 0);
      }

      this.swiping = false;
      this.autoPlay();
    },
    onResize () {
      this.initialize(this.activeIndicator);
    },
    autoPlay () {
      const { autoplay, count } = this;
      if (autoplay && count > 1) {
        this.clear();
        this.timer = setTimeout(() => {
          this.swiping = true; // 去除动画duration-time，以便瞬间到达修正位置
          this.correctPosition();// loop时修正位置，回到第一个item或最后一个item

          setTimeout(() => {
            this.swiping = false;
            this.move(1);
            this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },
    clear () {
      clearTimeout(this.timer);
    },
    correctPosition () {
      if (this.active <= -1) {
        this.move(this.count);
      }
      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },
    move (move = 0, offset = 0) {
      const { active, delta, count, swipes, trackSize } = this;
      const atFirst = active === 0;
      const atLast = active === count - 1;
      const outOfBounds =
        !this.loop &&
        ((atFirst && (offset > 0 || move < 0)) ||
          (atLast && (offset < 0 || move > 0)));

      if (outOfBounds || count <= 1) {
        return;
      }

      // loop过程中，在swap-item最后一个或第一个时，改变swap-item位置，其它情况位置是0
      swipes[0] && (swipes[0].offset = atLast && (delta < 0 || move > 0) > 0 ? trackSize : 0);
      swipes[count - 1] && (swipes[count - 1].offset = atFirst && (delta > 0 || move < 0) ? -trackSize : 0);

      if (move && active + move >= -1 && active + move <= count) {
        this.active += move;
      }

      this.offset = offset - this.active * this.size;
    }
  }
};
</script>
<style lang="scss">
.sd-swipe {
  position: relative;
  overflow: hidden;
}
.sd-swipe__indicators {
  position: absolute;
  display: flex;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  &--vertical {
    flex-direction: column;
    left: 10px;
    bottom: 50%;
    transform: translate(0, 50%);
    .sd-swipe__indicator {
      &:not(:last-child) {
        margin-bottom: 6px;
        margin-right: 0;
      }
    }
  }
}
.sd-swipe__indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.3;
  background: #ebedf0;
  &:not(:last-child) {
    margin-right: 6px;
  }
  &--active {
    background: #1989fa;
    opacity: 1;
  }
}
</style>

