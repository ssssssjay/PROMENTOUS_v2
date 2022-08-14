<template>
  <div class="row">
    <div class="comment-form col-12 pe-4">
      <form>
        <div class="row">
          <div class="form-group mb-3 px-2">
            <textarea
              id="retxtarea"
              class="form-control"
              rows="5"
              v-model="commentText"
              v-on:mouseleave="updateCommentText">
            </textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    commentId: {
      type: Number,
      default: null
    },
    contents: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      commentText: ""
    };
  },
  setup() {},
  created() {
    this.commentText = this.contents;
  },
  mounted() {},
  unmounted() {},
  methods: {
    updateCommentText() {
      let commentData = {
        id: this.commentId,
        text: this.commentText
      };
      this.$emit("updateComment", commentData);
    }
  }
};
</script>
