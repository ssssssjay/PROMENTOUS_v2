<template>
  <!-- 대댓글 작성 영역 -->
  <div class="row">
    <div class="comment-form col-12">
      <form>
        <div class="row">
          <div class="form-group mb-3 px-2">
            <textarea
              id="retxtarea"
              class="form-control"
              rows="5"
              v-model="commentText"></textarea>
          </div>
        </div>
      </form>
      <div class="row">
        <!-- <div class="form-check ps-5 text-start col">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault" />
          <label class="form-check-label" for="flexCheckDefault">
            비밀글
          </label>
        </div> -->
        <div class="text-end col">
          <button
            type="button"
            class="btn btn-sm pro_button"
            @click="registerRecomment">
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    pageType: {
      type: String,
      default: ""
    },
    projectId: {
      type: Number,
      default: null
    },
    reviewId: {
      type: Number,
      default: null
    },
    parentId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      commentData: {
        pageType: "",
        commentText: "",
        projectId: null,
        reviewId: null
      }
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async registerRecomment() {
      // 댓글 등록 시 넘겨줄 정보들
      let data = this.commentData;
      data.pageType = this.pageType;
      data.writerId = this.$store.state.user.user_id;
      data.commentText = this.commentText;
      data.parentId = this.parentId;
      data.sequence = 1; // 댓글 그룹 내 순서(1 2 3 4)
      data.targetId = null; // 얘가 parent의 역할,, (같은 그룹을 짓는건데 부모 댓글의 id로.. )
      // 댓글 입력 없이 등록 버튼 누르는 경우 예외처리
      if (data.commentText === "" || !data.commentText) {
        return;
      }

      const paramId =
        this.pageType === "projectRecruit" ? this.projectId : this.reviewId;

      const r = await this.$post(`/comment/register/${paramId}`, data);
      if (r.status === 200) {
        document.getElementById("retxtarea").value = "";
        this.$router.go();
      }
    }
  }
};
</script>
