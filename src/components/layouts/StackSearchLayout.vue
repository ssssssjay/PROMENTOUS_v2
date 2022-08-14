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
export default {
  components: {
    StackSearch
  },
  props: {
    stacks: Object
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
    transStacks() {
      this.value = [];
      for (let i = 0; i < this.stacks.length; i++) {
        for (let j = 0; j < this.options.length; j++) {
          if (
            this.stacks.length != 0 &&
            this.options[j].label == this.stacks[i]
          ) {
            this.value.push(this.options[j].value);
          }
        }
      }
    },
    async getStackList() {
      const stackList = await this.$get(
        `http://localhost:3000/common/stackList`
      );
      console.log(stackList);
      console.log(stackList);
      console.log(stackList);
      for (let i = 0; i < stackList.length; i++) {
        // value, label
        // let data = new Stack(
        //   stackList[i].code_data_name,
        //   stackList[i].code_data_desc
        // );
        let data = {
          value: stackList[i].code_data_name,
          label: stackList[i].code_data_desc
        };
        this.options.push(data);
      }
      this.transStacks();
      // console.log(this.options);
    },
    transValue() {
      this.$emit("send-value", this.value);
      console.log(this.value);
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
