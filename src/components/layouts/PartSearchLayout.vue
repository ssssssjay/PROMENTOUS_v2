<template>
  <div>
    <PartSearch
      v-model="value"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :groups="false"
      :options="options"
      @click="transValue()"
      placeholder="멘토의 분야를 선택해보세요!" />
  </div>
</template>
<script>
export default {
  components: {
    PartSearch
  },
  props: {
    parts: Object
  },

  data() {
    return {
      value: [],

      //   프론트엔드: "FE",
      //   백엔드: "BE",
      //   풀스택: "FS",
      //   디자인: "DE",
      //   UIUX: "UU",
      //   기획: "PL",
      //   PM: "PM",
      //   데이터베이스: "DB",
      //   알고리즘: "AL",
      //   퍼블리싱: "PB",
      //   데브옵스: "DO",
      //   데이터사이언스: "DA"
      options: [
        { value: "FE", label: "프론트엔드" },
        { value: "BE", label: "백엔드" },
        { value: "FS", label: "풀스택" },
        { value: "DE", label: "디자인" },
        { value: "UU", label: "UIUX" },
        { value: "PL", label: "기획" },
        { value: "PM", label: "PM" },
        { value: "DB", label: "데이터베이스" },
        { value: "AL", label: "알고리즘" },
        { value: "PB", label: "퍼블리싱" },
        { value: "DO", label: "데브옵스" },
        { value: "DA", label: "데이터사이언스" }
      ]
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    transValue() {
      this.$emit("send-value", this.value);
    }
  }
};
import PartSearch from "@vueform/multiselect";
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect {
  width: 400px;
}
</style>
<style>
.multiselect.is-active {
  box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #1379d2);
}
.multiselect-tag {
  background: var(--ms-tag-bg, #1379d2);
}
.multiselect-group-label.is-selected {
  background: var(--ms-group-label-bg-selected, #1379d2);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-group-label.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #1379d2);
  color: var(--ms-group-label-color-selected-pointed, #fff);
}
</style>
