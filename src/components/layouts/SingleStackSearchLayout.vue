<template>
  <div>
    <StackSearch
      v-model="value"
      class="stack_search"
      placeholder="언어/스택으로
    검색해보세요"
      mode="single"
      :close-on-select="true"
      :searchable="false"
      :create-option="true"
      :options="options"
      @select="transValue"
      @clear="clearValue" />
  </div>
</template>
<script>
export default {
  components: {
    StackSearch
  },

  data() {
    return {
      value: [],
      options: [] // 배열들을 갖다 넣기
    };
  },
  setup() {},
  created() {
    this.getStackList();
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getStackList() {
      const stackList = await this.$get(
        `http://localhost:3000/common/stackList`
      );
      for (let i = 0; i < stackList.length; i++) {
        let data = {
          value: stackList[i].code_data_name,
          label: stackList[i].code_data_desc
        };
        this.options.push(data);
      }
    },
    transValue() {
      this.$emit("send-value", this.value);
    },
    clearValue() {
      this.value = [];
      this.$emit("send-value", this.value);
    }
  }
};
import StackSearch from "@vueform/multiselect";
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.stack_search {
  min-width: 264px;
}
</style>
<style>
.multiselect.is-active {
  box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #1379d2);
}
.multiselect-tag {
  background: var(--ms-tag-bg, #1379d2);
}
/* .multiselect-group-label.is-selected {
  background: var(--ms-group-label-bg-selected, #1379d2);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-group-label.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #1379d2);
  color: var(--ms-group-label-color-selected-pointed, #fff);
} */
.multiselect-option.is-selected {
  background: var(--ms-group-label-bg-selected, #1379d2);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #1379d2);
  color: var(--ms-group-label-color-selected-pointed, #fff);
}
</style>
