<template>
  <transition name="message-fade"
    @after-leave="afterLeave"
  >
    <div
      :class="[
        'module-message',
        type ? `module-message-${type}` : ''
      ]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <p class="module-message__content">
        {{message}}
      </p>
      <i v-if="showClose" class="module-message__closeBtn" @click="close">x</i>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Message',
  data () {
    return {
      message: '',
      visible: false,
      duration: 3000,
      closed: false,
      timer: null,
      type: 'info',
      showClose: false,
      onClose: null
    };
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  methods: {
    destroyElement () {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimer () {
      clearTimeout(this.timer);
    },
    keydown (e) {
      if (e.keyCode === 27) {
        if (!this.closed) {
          this.close();
        }
      }
    },
    afterLeave (el) {
      this.destroyElement();
    }
  },
  mounted () {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDetroyed () {
    document.removeEventListener('keydown', this.keydown);
  }
};
</script>
<style lang="scss" scoped>
.module-message {
  position: fixed;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-width: 380px;
  padding: 10px 20px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  background-color: #edf2fc;
  transition: transform 0.4s, opacity 0.3s;
  &-info {
    .module-message__content {
      color: #909399;
    }
  }
  &-success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    .module-message__content {
      color: #67c23a;
    }
  }
  &-error {
    background-color: #fef0f0;
    border-color: #fde2e2;
    .module-message__content {
      color: #f56c6c;
    }
  }
  &-warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    .module-message__content {
      color: #e6a23c;
    }
  }
}
.module-message__content {
  margin: 0;
}
.module-message__closeBtn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  font-style: normal;
  cursor: pointer;
}
.message-fade-enter, .message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>

