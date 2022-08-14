<template>
  <div>
    <a class="btn btn-outline btn_write"
      ><i class="bi bi-pencil me-1"></i>{{ btnText }}</a
    >
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    btnText: {
      type: String,
      default: "모집글 작성"
    }
  },
  data() {
    return {
      sampleData: ""
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>
<style scoped>
.btn_write {
  border: 1px solid #363636;
  transition: 0.2s;
}
.btn_write:hover {
  background-color: #363636;
  color: #fff;
}
</style>
