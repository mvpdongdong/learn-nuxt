<template>
  <div class="CornerButtons">
    <div
      class="CornerAnimayedFlex"
      :class="{
        'CornerAnimayedFlex--hidden': isHidden
      }"
      @click="toTop"
      >
      <button data-tooltip="回到顶部" data-tooltip-position="left" aria-label="回到顶部" type="button" class="Button CornerButton Button--plain">
        <svg class="Zi Zi--BackToTop" title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import Animator from '~/utils/Animator';

export default {
  name: 'BackTop',
  data () {
    return {
      isHidden: true,
      animatorDuration: 300
    };
  },
  mounted () {
    let self = this;
    let wh = document.documentElement.clientHeight;
    window.addEventListener('scroll', function (e) {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > wh) {
        self.isHidden = false;
      } else {
        self.isHidden = true;
      }
    });
  },
  methods: {
    toTop () {
      let self = this;
      let scrollTop = document.documentElement.scrollTop;
      if (this.animator) return;
      this.animator = new Animator(self.animatorDuration, function (p) {
        document.documentElement.scrollTop = scrollTop * (1 - p * p);
      });
      this.animator.start(() => {
        this.animator = null;
      });
    }
  }
};
</script>

<style scoped>
.CornerButtons {
  position: fixed;
  bottom: 0;
  right: 12px;
  display: flex;
  flex-direction: column;
  transition: transform .2s ease;
  will-change: transfrom;
}
.CornerAnimayedFlex {
  width: 40px;
  height: 52px;
  transition: height .2s ease;
}
.CornerAnimayedFlex--hidden {
  height: 0;
}
button {
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  appearance: none;
}
.Button--link, .Button--plain {
  height: auto;
  padding: 0;
  line-height: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
}
.CornerButton {
  background: #fff;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.CornerButton .Zi, .CornerButton .Zi:hover {
  fill: #8590a6;
}
</style>
