<template>
  <div id="app">
    <VueEditor v-model="EDITOR_CONTENTS" @blur="transEditerData"></VueEditor>

    <p></p>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";

export default {
  props: {
    contents: {
      type: String,
      default: ""
    }
  },
  components: {
    VueEditor
  },

  data() {
    return {
      EDITOR_CONTENTS: this.contents
    };
  },
  methods: {
    hi() {
      console.log("hi");
    },
    transEditerData() {
      this.$emit("send-EditorData", this.EDITOR_CONTENTS);
    }
  }
};
</script>
