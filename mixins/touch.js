const MIN_DISTANCE = 10;
function getDirection (x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}
export default {
  data () {
    return {
      direction: ''
    };
  },
  methods: {
    touchStart (event) {
      const touch = event.touches[0];
      this.resetTouchStatus();
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    touchMove (event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    },
    resetTouchStatus () {
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.direction = '';
    }
  }
};
