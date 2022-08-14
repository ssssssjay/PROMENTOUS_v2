<template>
  <div class="d-inline-block">
    <RecruitSort
      v-model="recruitSort"
      class="recruit_sort"
      mode="single"
      :native="false"
      :options="recruitSortOptions"
      placeholder="정렬"
      ref="recruitsort"
      @select="onSelectSort" />
  </div>
</template>
<script>
import RecruitSort from "@vueform/multiselect";
export default {
  components: {
    RecruitSort
  },
  data() {
    return {
      recruitSort: "",
      recruitSortOptions: ["최신순", "조회수순", "스크랩 많은순"]
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    onSelectSort() {
      console.log(this.recruitSort);
    }
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.recruit_sort {
  width: 168px;
}
</style>
<style>
.multiselect-option {
  transition: all 0.2s;
}
.multiselect-option:hover {
  background: var(--ms-option-bg-selected, #1379d2);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #1379d2);
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #1379d2);
  color: var(--ms-option-color-selected-pointed, #fff);
}
</style>
