<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <th v-for="column in columns">{{column.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in list">
          <td v-for="column in columns">
            {{row[column.prop]}}
          </td>
        </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SdTable',
  props: {
    list: Array
  },
  data () {
    return {
      columns: []
    };
  },
  methods: {
    addColumn (column) {
      this.columns.push(column);
    }
  }
};
</script>

