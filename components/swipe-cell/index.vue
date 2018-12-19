<template>
  <div
    class="sd-swiper-cell"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
    @click="onClick('cell')"
    v-clickoutside:touchstart="onClick"
  >
    <div
     class="swiper-cell-wrapper"
     :style="wrapperStyle"
    >
      <div class="cell-left" @click.stop="onClick('left')">
        <slot name="left"></slot>
      </div>
      <div class="cell">
        <slot></slot>
      </div>
      <div class="cell-right" @click.stop="onClick('right')">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import touch from '~/mixins/touch';

const THRESHOLD = 0.15;
export default {
  name: 'SdSwipeCell',
  mixins: [touch],
  props: {
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      draging: false,
      offset: 0,
      leftWidth: 0,
      rightWidth: 0
    };
  },
  computed: {
    wrapperStyle () {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transition: this.draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
      };
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.render();
    });
  },
  methods: {
    render () {
      if (this.$slots['left']) {
        this.hasLeft = true;
        this.caculateSlotWidth('left');
      }
      if (this.$slots['right']) {
        this.hasRight = true;
        this.caculateSlotWidth('right');
      }
    },

    caculateSlotWidth (direction) {
      const slot = document.querySelector('.cell-' + direction);
      const width = slot.getBoundingClientRect().width;
      if (direction === 'left') {
        this.leftWidth = width;
      } else {
        this.rightWidth = width;
      }
    },

    startDrag (event) {
      this.touchStart(event);
      this.draging = true;
      if (this.opened) {
        this.startX -= this.offset;
      }
    },

    onDrag (event) {
      this.touchMove(event);
      const { deltaX } = this;
      if ((deltaX > 0 && (deltaX > this.leftWidth || !this.leftWidth)) ||
        (deltaX < 0 && (deltaX < -this.rightWidth || !this.rightWidth))
      ) {
        return false;
      }
      if (this.direction === 'horizontal') {
        event.preventDefault();
        this.swipeMove(deltaX);
      }
    },

    endDrag (event) {
      this.draging = false;
      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? -1 : 1);
      }
    },

    onClick (position = 'outside') {
      if (!this.offset) {
        return false;
      }
      if (this.onClose) {
        this.onClose(position, this);
      } else {
        this.swipeMove();
      }
    },

    swipeMove (offset = 0) {
      this.offset = offset;
      offset && (this.swiping = true);
      !offset && (this.opened = false);
    },

    swipeLeaveTransition (direction) {
      const { offset, leftWidth, rightWidth } = this;
      const threshold = this.opened ? (1 - THRESHOLD) : THRESHOLD;

      // right
      if (direction > 0 && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right');
      // left
      } else if (direction < 0 && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left');
      } else {
        this.swipeMove();
      }
    },

    open (position) {
      const offset = position === 'left' ? this.leftWidth : -this.rightWidth;
      this.swipeMove(offset);
      this.resetSwipeStatus();
    },

    close () {
      this.offset = 0;
    },

    resetSwipeStatus () {
      this.swiping = false;
      this.opened = true;
    }
  }
};
</script>
<style scoped lang="scss">
  .sd-swiper-cell {
    position: relative;
    overflow: hidden;
    .cell-left {
      position: absolute;
      left: 0;
      top: 0;
      height: 44px;
      line-height: 44px;
      transform: translateX(-100%);
    }
    .cell-right {
      position: absolute;
      right: 0;
      top: 0;
      height: 44px;
      line-height: 44px;
      transform: translateX(100%);
    }
    .swiper-cell-wrapper {
      position: relative;
      .cell {
        padding-left: 10px;
        height: 44px;
        line-height: 44px;
        color: #333;
      }
    }
  }

</style>


