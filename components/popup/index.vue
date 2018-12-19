<template>
  <div class="sd-popup-component">
    <transition :name="currentTransition">
      <div
        ref="popup"
        v-show="value"
        :class="[
          'sd-popup',
          {
            [`sd-popup-${position}`]: this.position
          }
        ]">
        <slot></slot>
      </div>
    </transition>
    <transition name="sd-fade">
      <div
        @touchmove.prevent.stop
        @click="close"
        ref="overlay"
        v-show="value"
        class="sd-overlay"
        >
      </div>
    </transition>
  </div>
</template>
<script>
import context from '~/mixins/popup/context';
import touch from '~/mixins/touch';
import scrollUtils from '~/utils/scroll';
import { on, off } from '~/utils/event';

export default {
  name: 'SdPopup',
  mixins: [touch],
  props: {
    value: Boolean,
    position: String,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentTransition () {
      return this.position ? `popup-slide-${this.position}` : 'sd-fade';
    }
  },
  watch: {
    value (val) {
      this[val ? 'open' : 'close']();
    }
  },
  mounted () {
    if (this.value) {
      this.open();
    }
  },
  methods: {
    open () {
      this.$refs.overlay.style.zIndex = context.zIndex++;
      this.$refs.popup.style.zIndex = context.zIndex++;
      if (this.lockScroll) {
        on(document, 'touchstart', this.touchStart);
        on(document, 'touchmove', this.onTouchMove);
        if (!context.lockCount) {
          document.body.classList.add('sd-overflow-hidden');
        }
        context.lockCount++;
      }
    },
    close () {
      this.$emit('input', false);
      if (this.lockScroll) {
        off(document, 'touchstart', this.touchStart);
        off(document, 'touchmove', this.onTouchMove);
        context.lockCount--;
        if (!context.lockCount) {
          document.body.classList.remove('sd-overflow-hidden');
        }
      }
    },
    onTouchMove (e) {
      this.touchMove(e);
      const direction = this.deltaY > 0 ? '10' : '01';
      const el = scrollUtils.getScrollEventTarget(e.target, this.$refs.popup);
      const { scrollHeight, offsetHeight, scrollTop } = el;
      let status = '11';

      /* istanbul ignore next */
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01';
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10';
      }

      /* istanbul ignore next */
      if (
        status !== '11' &&
        this.direction === 'vertical' &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
};
</script>
<style lang="scss">
.sd-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  transition: 0.3s ease-out;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(-50%, -50%, 0);
}
.sd-popup-bottom {
  width: 100%;
  top: auto;
  bottom: 0;
  transform: translate3d(-50%, 0, 0);
}
.sd-popup-right, .sd-popup-left {
  width: 100%;
  height: 100%;
}
.popup-slide-left-enter, .popup-slide-left-leave-to {
  transform: translate3d(-100%, -50%, 0);
}
.popup-slide-right-enter, .popup-slide-right-leave-to {
  transform: translate3d(100%, -50%, 0);
}
.popup-slide-bottom-enter, .popup-slide-bottom-leave-to {
  transform: translate3d(-50%, 100%, 0);
}
.sd-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0.3s ease-out;
  background: rgba($color: #000, $alpha: 0.7)
}
.sd-fade-enter, .sd-fade-leave-to {
  opacity: 0;
}
</style>


