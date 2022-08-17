<template>
  <div id="app">
    <VueEditor
      v-model="EDITOR_CONTENTS"
      :editor-toolbar="customToolbar"
      style="height: 500px"
      @text-change="transEditerData"></VueEditor>
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
      EDITOR_CONTENTS: this.contents,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }]
      ]
    };
  },
  methods: {
    transEditerData() {
      this.$emit("send-EditorData", this.EDITOR_CONTENTS);
    }
  }
};
</script>
