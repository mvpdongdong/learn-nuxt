<template>
  <ul
    :class="[
      'sd-pagination',
      {'sd-pagination--simple': !isMultiMode}
    ]"
  >
    <li
      :class="[
        'sd-pagination__item',
        'sd-pagination__prev',
        {'sd-pagination__item--disabled': value === 1}
      ]"
      @click="selectPage(value - 1)"
    >
      {{prevText}}
    </li>
    <li
      :class="[
        'sd-pagination__item',
        'sd-pagination__page',
        {'sd-pagination__item--active': page.active}
      ]"
      v-for="page in pages"
      @click="selectPage(page.number)"
    >
      {{page.text}}
    </li>
    <li
      class="sd-pagination__page--desc"
      v-if="!isMultiMode"
    >
      <slot name="pageDesc">
        {{pageDesc}}
      </slot>
    </li>
    <li
      :class="[
        'sd-pagination__item',
        'sd-pagination__next',
        {'sd-pagination__item--disabled': value === computedPageCount}
      ]"
      @click="selectPage(value + 1)"
    >
      {{nextText}}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SdPagination',
  props: {
    value: Number,
    totalItems: Number,
    pageCount: Number,
    forceEllipses: Boolean,
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    showPageSize: {
      type: Number,
      default: 5
    },
    mode: {
      type: String,
      default: 'multi'
    }
  },
  computed: {
    computedPageCount () {
      const count = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count);
    },
    isMultiMode () {
      return this.mode === 'multi';
    },
    pageDesc () {
      return `${this.value}/${this.computedPageCount}`;
    },
    pages () {
      const pages = [];
      const pageCount = this.computedPageCount;
      const { showPageSize, forceEllipses } = this;

      if (!this.isMultiMode) {
        return pages;
      };

      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize !== undefined && showPageSize < pageCount;

      if (isMaxSized) {
        startPage = Math.max(this.value - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }

      for (let number = startPage; number <= endPage; number++) {
        pages.push(this.makePage(number, number, number === this.value));
      }

      if (isMaxSized && forceEllipses) {
        if (startPage > 1) {
          pages.unshift(this.makePage(startPage - 1, '...', false));
          pages.unshift(this.makePage(1, 1, false));
        }
        if (endPage < pageCount) {
          pages.push(this.makePage(endPage + 1, '...', false));
          pages.push(this.makePage(pageCount, pageCount, false));
        }
      }
      return pages;
    }
  },
  methods: {
    makePage (number, text, active) {
      return {
        number,
        text,
        active
      };
    },
    selectPage (page) {
      page = Math.max(1, page);
      page = Math.min(page, this.computedPageCount);
      if (this.value !== page) {
        this.$emit('input', page);
        this.$emit('change', page);
      }
    }
  }
};
</script>
<style lang="scss">
.sd-pagination {
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.sd-pagination__item {
  flex: 1;
  color: #1989fa;
  height: 40px;
  min-width: 36px;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;
  border: 0 solid #ebedf0;
  border-width: 1px 0 1px 1px;
  &:last-child {
    border-right-width: 1px;
  }
  &--active {
    background-color: #1989fa;
    color: #fff;
  }
  &--disabled {
    background-color: #f8f8f8;
    color: #7d7e80;
    opacity: 0.6;
  }
}
.sd-pagination__page {
  flex-grow: 0;
}
.sd-pagination__prev, .sd-pagination__next {
  padding: 0 5px;
}
.sd-pagination__page--desc {
  flex: 1;
  height: 40px;
  color: #7d7e80;
}
.sd-pagination--simple .sd-pagination__item {
  border-width: 1px;
}
</style>

