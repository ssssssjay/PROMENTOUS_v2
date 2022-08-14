<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination" id="nav">
        <!-- 전페이지 -->
        <!-- <li class="page-item disabled"> -->
        <!-- <li class="page-item">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true" style="color: #0bc0eb">&laquo;</span>
          </a>
        </li> -->
        <!-- 숫자들 -->
        <li class="page-item" v-for="(data, index) in page" :key="index">
          <button
            class="page-link"
            @click="$emit('paging', data)"
            style="color: #0bc0eb">
            {{ data }}
          </button>
        </li>
        <!-- 다음페이지 -->
        <!-- <li class="page-item">
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true" style="color: #0bc0eb">&raquo;</span>
          </a>
        </li> -->
      </ul>
    </nav>
  </div>
</template>
<script>
// this.page로 접근
export default {
  props: {
    page: Number
  },
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>
<style scoped></style>
