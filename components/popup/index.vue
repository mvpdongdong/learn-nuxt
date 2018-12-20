<template>
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
</template>
<script>
import Vue from 'vue';
import context from '~/mixins/popup/context';
import touch from '~/mixins/touch';
import scrollUtils from '~/utils/scroll';
import { on, off } from '~/utils/event';
import Overlay from './overlay';

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
      this.renderOverlay();
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
      this.overlay.visible = false;
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
    },
    renderOverlay () {
      if (!this.overlay) {
        this.overlay = new (Vue.extend(Overlay))({
          el: document.createElement('div')
        });
        this.overlay.visible = true;
        this.overlay.$on('click', () => {
          this.close();
        });
        let target = this.$el.parentNode || document.body;
        target.appendChild(this.overlay.$el);
      }
      this.overlay.visible = true;
      this.$nextTick(() => {
        this.overlay.zIndex = context.zIndex++;
        this.$el.style.zIndex = context.zIndex++;
      });
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
</style>


