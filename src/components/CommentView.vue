<template>
  <div>
    <!-- 댓글 작성 UI는 별도 컴포넌트로 빼기.. -->
    <!-- 댓글 밑 부분.. -->
    <div class="col-md-12">
      <div class="panel">
        <!-- v-for로 댓글 다 가져오는데, parent null에 따라 원댓글/대댓글 구분하기.  -->
        <div
          class="panel-body"
          v-for="comment in commentList"
          :key="comment.reply_id">
          <!-- 원댓글 -->
          <div class="media-block" v-if="comment.parent_id === null">
            <!-- 왼쪽 프사 -->
            <a class="media-left" href="#">
              <img
                class="img-circle img-sm"
                style="border-radius: 10%"
                alt="댓글 작성자 사진"
                v-bind:src="comment.writer_image" />
            </a>
            <!-- 우측 영역 -->
            <div class="media-body">
              <div class="mar-btm row mb-0">
                <div class="col text-start">
                  <a
                    href="#"
                    class="btn-link text-semibold media-heading box-inline pro_a_black fs-5"
                    >{{ comment.writer_nickname }}</a
                  >
                  <p class="text-muted text-sm">
                    {{ formatDate(comment.created_datetime) }}
                  </p>
                </div>
                <!-- 수정/삭제 : 본인이 쓴 댓글만 -->
                <div class="col text-end" v-if="comment.writer_id === userId">
                  <span class="col-3 text-end">
                    <button
                      type="button"
                      class="btn btn-link com_link_blue"
                      @click="
                        editComment(comment.isEdit);
                        comment.isEdit = !comment.isEdit;
                      ">
                      {{ comment.isEdit ? "수정완료" : "  수정" }}
                    </button>
                    |
                    <button
                      type="button"
                      class="btn btn-link com_link_red"
                      @click="deleteCheckAlert(comment.reply_id)">
                      삭제
                    </button>
                  </span>
                </div>
              </div>
              <p v-show="!comment.isEdit">
                {{ comment.contents }}
              </p>
              <p v-show="comment.isEdit">
                <edit-comment-view
                  :commentId="comment.reply_id"
                  :contents="comment.contents"
                  @updateComment="updateComment" />
              </p>
              <div class="pad-ver text-end pe-4">
                <button
                  type="button"
                  class="btn pro_button btn-sm"
                  @click="comment.isRecomment = !comment.isRecomment">
                  {{ comment.isRecomment ? "취소" : "답글" }}
                </button>
              </div>
              <hr />
              <div class="mx-2 py-2" v-if="comment.isRecomment">
                <write-recomment-view
                  :pageType="pageType"
                  :projectId="projectId"
                  :reviewId="reviewId"
                  :parentId="comment.reply_id"
                  :targetId="comment.reply_id" />
                <hr />
              </div>
              <div v-for="recomment in commentList" :key="recomment.reply_id">
                <div
                  class="media-block"
                  v-if="recomment.parent_id == comment.reply_id">
                  <a class="media-left" href="#"
                    ><img
                      class="img-circle img-sm"
                      style="border-radius: 10%"
                      alt="대댓글 작성자 사진"
                      v-bind:src="recomment.writer_image"
                  /></a>
                  <div class="media-body">
                    <div class="mar-btm">
                      <div class="row mb-0">
                        <div class="col text-start">
                          <a
                            href="#"
                            class="btn-link text-semibold media-heading box-inline col-9 pro_a_black fs-5">
                            {{ recomment.writer_nickname }}
                          </a>
                          <p class="text-muted text-sm">
                            {{ formatDate(recomment.created_datetime) }}
                          </p>
                        </div>
                        <!-- 수정/삭제 : 본인이 쓴 댓글만 -->
                        <div
                          class="col text-end"
                          v-if="recomment.writer_id === userId">
                          <span class="col-3 text-end">
                            <button
                              type="button"
                              class="btn btn-link com_link_blue"
                              @click="
                                editComment(recomment.isEdit);
                                recomment.isEdit = !recomment.isEdit;
                              ">
                              {{ recomment.isEdit ? "수정완료" : "  수정" }}
                            </button>
                            |
                            <button
                              type="button"
                              class="btn btn-link com_link_red"
                              @click="deleteCheckAlert(recomment.reply_id)">
                              삭제
                            </button>
                          </span>
                        </div>
                      </div>
                      <p class="text-sm">
                        {{ recomment.insert_date }}
                      </p>
                    </div>
                    <p v-show="!recomment.isEdit">
                      {{ recomment.contents }}
                    </p>
                    <p v-show="recomment.isEdit">
                      <edit-comment-view
                        :commentId="recomment.reply_id"
                        :contents="recomment.contents"
                        @updateComment="updateComment" />
                    </p>
                    <div class="pad-ver text-end pe-4">
                      <button
                        type="button"
                        class="btn pro_button btn-sm"
                        @click="recomment.isRecomment = !recomment.isRecomment">
                        {{ recomment.isRecomment ? "취소" : "답글" }}
                      </button>
                    </div>
                    <hr />
                    <div class="mx-2 py-2" v-if="recomment.isRecomment">
                      <write-recomment-view
                        :pageType="pageType"
                        :projectId="projectId"
                        :reviewId="reviewId"
                        :parentId="comment.reply_id" />
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WriteRecommentView from "../components/WriteRecommentView.vue";
import EditCommentView from "../components/EditCommentView.vue";
export default {
  components: { WriteRecommentView, EditCommentView },
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
    }
  },
  data() {
    return {
      isRecomment: false,
      commentList: [],
      isEdit: false,
      editId: null,
      editText: "",
      userId: ""
    };
  },
  setup() {},
  created() {
    this.getCommentList();
  },
  mounted() {
    this.userId = this.$store.state.user.user_id;
  },
  unmounted() {},
  methods: {
    async getCommentList() {
      let data = {};
      data.pageType = this.pageType;
      const paramId =
        this.pageType === "projectRecruit" ? this.projectId : this.reviewId;
      this.commentList = await this.$get(
        `/comment/recruit/get/${this.pageType}/${paramId}`
      );
    },
    // 댓글 수정
    async editComment(isEdit) {
      if (!isEdit) {
        return;
      }
      let data = {};
      data.pageType = this.pageType;
      data.contents = this.editText;
      const r = await this.$patch(`/comment/edit/${this.editId}`, data);
      if (r.status === 200) {
        document.getElementById("retxtarea").value = "";
        this.$router.go();
      }
    },

    updateComment(commentData) {
      this.editId = commentData.id;
      this.editText = commentData.text;
    },

    deleteCheckAlert(commentId) {
      this.$swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제한 댓글은 되돌릴 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteComment(commentId);
          this.$swal({
            title: "삭제 완료",
            text: "댓글이 삭제되었습니다.",
            icon: "success"
          });
        }
      });
    },
    async deleteComment(commentId) {
      const r = await this.$delete(
        `/comment/delete/${this.pageType}/${commentId}`
      );
      if (r.status === 200) {
        // 콜백함수 안에서 this 호출 시 새로운 object이기 떄문에 미리 선언
        // 참고: https://stackoverflow.com/questions/69666397/typeerror-cannot-read-properties-of-undefined-reading-router-vuejs
        const self = this;
        setTimeout(function () {
          self.$router.go();
        }, 1000);
      }
    },
    formatDate(datetime) {
      // console.log(datetime);
      // TODO: 예외처리 코드 보완 필요
      if (!datetime) {
        // console.log("datetime undefined error 처리 필요");
        return "";
      }
      return datetime.substr(0, 16).replace("T", " ");
    }
  }
};
</script>
<style scoped>
body {
  margin-top: 20px;
  background: #ebeef0;
}

.img-sm {
  width: 46px;
  height: 46px;
}

.panel {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.075);
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}

.panel .panel-footer,
.panel > :last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.panel .panel-heading,
.panel > :first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.panel-body {
  /* padding: 25px 20px; */
}

.media-block .media-left {
  display: block;
  float: left;
}

.media-block .media-right {
  float: right;
}

.media-block .media-body {
  display: block;
  overflow: hidden;
  width: auto;
  text-align: left;
  padding-left: 20px;
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
  vertical-align: middle;
}

.thumbnail {
  border-radius: 0;
  border-color: #e9e9e9;
}

.tag.tag-sm,
.btn-group-sm > .tag {
  padding: 5px 10px;
}

.tag:not(.label) {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #cdd6e1;
  font-size: 12px;
  line-height: 1.42857;
  vertical-align: middle;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}
.text-muted,
a.text-muted:hover,
a.text-muted:focus {
  color: #acacac;
}
.text-sm {
  font-size: 0.9em;
}
.text-5x,
.text-4x,
.text-5x,
.text-2x,
.text-lg,
.text-sm,
.text-xs {
  line-height: 1.25;
}

.btn-trans {
  background-color: transparent;
  border-color: transparent;
  color: #929292;
}

.btn-icon {
  padding-left: 9px;
  padding-right: 9px;
}

.btn-sm,
.btn-group-sm > .btn,
.btn-icon.btn-sm {
  padding: 5px 10px !important;
}

.mar-top {
  margin-top: 15px;
}
</style>
