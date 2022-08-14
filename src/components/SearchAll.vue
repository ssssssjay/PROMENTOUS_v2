<template>
  <div class="search_all">
    <div class="d-inline-flex">
      <form @submit.prevent="onSubmitSearchAll" @keyup="test">
        <input
          v-model="searchAll"
          class="searchAllInput"
          type="text"
          placeholder="제목, 내용, 작성자로 검색해보세요!"
          aria-label="default input example" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchAll: ""
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    test(e) {
      if (e.keyCode === 8 && this.searchAll === "") {
        this.$emit("search-keyword", this.searchAll);
      }
    },
    onSubmitSearchAll() {
      if (this.searchAll === "") {
        alert("단어를 입력하셔야 합니다!!!");
        return;
      }
      this.$emit("search-keyword", this.searchAll);
    }
  }
};
</script>
<style lang="scss" scoped>
.search_all {
  margin-left: 24px;
}
.searchAllInput {
  width: 400px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
}
.searchAllInput:focus {
  border: 1px solid #fff;
  outline: 3px solid #1379d2;
}
.form-control-sm {
  padding-left: 1.5rem;
}
.searchIcon {
  cursor: pointer;
}
</style>
