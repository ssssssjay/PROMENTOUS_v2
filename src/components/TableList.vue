<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr class="table-primary">
          <th :key="th.key" v-for="th in headers">{{ th.title }}</th>
          <th>상세보기</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(item, i) in items">
          <td :key="th.key" v-for="th in headers">{{ item[th.key] }}</td>
          <td>이동</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: "A"
    };
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return [];
      }
    },
    headers: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>
<style scoped>
tr {
  font-size: 18px;
  height: 50px;
}
</style>
