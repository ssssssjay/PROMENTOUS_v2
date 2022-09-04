<template>
  <div>
    <StackSearch
      v-model="value"
      class="stack_search"
      placeholder="언어/스택으로
    검색해보세요"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :options="options"
      @click="transValue" />
  </div>
</template>
<script>
import StackSearch from "@vueform/multiselect";

export default {
  components: {
    StackSearch
  },
  data() {
    return {
      value: [],
      options: []
    };
  },
  setup() {},
  created() {
    this.getStackList();
  },
  updated() {},
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
    }
  }
};
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
