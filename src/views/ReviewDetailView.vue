<template>
  <div class="container mt-5">
    <div class="row">
      <!-- 페이지 좌측 -->
      <div class="col-lg-12 pe-xl-1-9 mb-1-9 mb-lg-0">
        <div class="content">
          <!-- 글 제목 -->
          <div class="row text-start">
            <span class="col-10">
              <p class="fs-1 m-0">{{ review.title }}</p>
              <p class="pt-1 ps-1">
                <img
                  class="img-circle img-sm me-2"
                  style="border-radius: 50%; width: 30px"
                  alt="후기글 작성자 사진"
                  v-bind:src="review.user_image" />
                {{ review.user_nickname }} &nbsp; &nbsp;| &nbsp;
                {{ formatDate(review.created_datetime) }}
              </p>
            </span>

            <span class="ps-4 col-2 m-0 pt-5 text-end">
              <!-- 클립보드 복사 -->
              <copy-to-clipboard :pageUrl="pageUrl" />
              <!-- <button type="button" class="btn btn-success btn-sm mx-1">
                수정
              </button>
              <button type="button" class="btn btn-danger btn-sm">삭제</button> -->
              <!-- </p> -->
            </span>
            <hr />
          </div>
          <!-- 글 내용 -->
          <div class="h4 pb-3 px-1" style="text-align: left">
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 진행 기간</span>
              <!-- TODO: 시작일, 종료일 DB 확인 필요.. 지금은 필드가 없다. -->
              <span class="ps-4 me-0 pe-0 col-2">2022/07/01</span>
              ~
              <span class="px-4 ms-5 col-2">2022/08/31</span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold"
                >| 진행한 프로젝트</span
              >
              <span class="px-4 col-9">
                <router-link
                  :to="`/project/recruit/${project.project_id}`"
                  target="_blank"
                  class="rev_router_link_color">
                  {{ project.title }}
                </router-link>
              </span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 결과물 링크</span>
              <span class="px-4 col-9">
                <a
                  :href="`${review.url_address}`"
                  target="_blank"
                  class="rev_router_link_color">
                  <button type="button" class="btn btn-sm me-2 pro_button">
                    {{ review.url_title }}
                  </button>
                </a>
              </span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold"
                >| 사용 언어/스택</span
              >
              <span class="px-4 col-10">
                <span
                  class="badge pro_badge_color rounded-pill me-1"
                  v-for="stack in project.stack_code"
                  :key="stack">
                  {{ stack }}
                </span>
              </span>
            </p>
            <div>
              <div
                class="widget-box fs-4 py-4 px-5 mt-5"
                v-html="review.desc"></div>
            </div>
          </div>
        </div>
        <hr />
        <!-- 댓글 -->
        <div class="pt-3">
          <!-- TODO: props로 넘겨줄 정보 추가 필요 :projectId="projectId"-->
          <write-comment-view pageType="projectReview" :reviewId="reviewId" />
          <comment-view pageType="projectReview" :reviewId="reviewId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentView from "@/components/CommentView.vue";
import WriteCommentView from "../components/WriteCommentView.vue";
import CopyToClipboard from "../components/CopyToClipboard.vue";

export default {
  name: "ReviewDetailView",
  components: { CommentView, WriteCommentView, CopyToClipboard },
  data() {
    return {
      project: {},
      review: {}
    };
  },
  beforeMount() {
    this.pageUrl = window.document.location.href;
    this.reviewId = this.$route.params.reviewId;
    this.getReviewData();
  },
  mounted() {},
  methods: {
    formatDate(datetime) {
      // TODO: 예외처리 코드 보완 필요
      if (!datetime) {
        console.log("datetime undefined error 처리 필요");
        return "";
      }
      return datetime.substr(0, 10);
    },
    async getReviewData() {
      this.review = await this.$get(`/project/review/${this.reviewId}`);

      this.project = await this.$get(
        `/project/recruit/${this.review.project_id}`
      );

      this.project.stack_code = await this.project.stack_code
        .split(",")
        .map(String);

      // console.log(this.review);
      // console.log(this.project);
    }
  }
};
</script>
<style scoped>
.widget-box {
  border: 1.5px solid gray;
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  text-align: left;
}

.pro_fixed {
  /* position: sticky; */
  top: 0;
  height: 400px;
  /* position: fixed; */
}

.pro-circle {
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
}

.pro-circle-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
