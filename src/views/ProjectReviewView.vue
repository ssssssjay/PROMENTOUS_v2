<template>
  <div>
    <section class="banner d-flex align-items-center">
      <div class="container">
        <h1>프로젝트 후기</h1>
        <p>우리는 이런걸 만들었어요</p>
      </div>
    </section>
    <section class="container">
      <div class="d-flex pt-4 pb-4 justify-content-end section_first">
        <registerbtn-layout
          v-if="user.user_id"
          :btnText="btnText"
          @click="goToMenu('../Reviewwrite')" />
      </div>
      <div class="d-flex pt-4 mb-4 align-items-start justify-content-end">
        <!-- 우선은 정렬기능 비활성화 -->
        <!-- <RecruitSortLayout /> -->
        <div class="d-flex">
          <SingleStackSearchLayout @send-value="sendValue" />
          <SearchAll @search-keyword="SearchKeyword" />
        </div>
      </div>
      <main class="review_list d-flex flex-wrap">
        <div
          class="card"
          style="width: 40rem; height: 240px"
          v-for="(review, i) in reviews"
          @click="
            (e) => goToReviewDetail(review.project_id, review.review_id, e)
          "
          :key="i">
          <div class="d-flex">
            <!-- TODO : DB 상에 이미지 경로가 이상하여 전부 깨져서 우선은 로컬이미지로 렌더링 -->
            <img
              :src="review.thumbnail_image"
              class="thumbnail"
              alt="후기썸네일이미지" />
            <div class="card-body">
              <h4 class="card-title-ellipsis">{{ review.title }}</h4>
              <p class="card-text ellipsis" v-html="review.desc"></p>
              <div class="mb-4">
                <div v-if="review.stack_code.length <= 3">
                  <div
                    class="stack-icon me-1"
                    v-for="(stack, i) in review.stack_code"
                    :key="i">
                    {{ stack }}
                  </div>
                </div>
                <span v-else>
                  <div class="stack-icon me-1">{{ review.stack_code[0] }}</div>
                  <div class="stack-icon me-1">{{ review.stack_code[1] }}</div>
                  <div class="stack-icon me-1">{{ review.stack_code[2] }}</div>
                </span>
                <span v-show="review.stack_code.length > 3">
                  + {{ review.stack_code.length - 3 }}
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <!-- TODO : 프사 로딩 오류시에는?  -->
                <div class="d-flex align-items-center">
                  <div>
                    <span class="image me-2">
                      <img v-bind:src="review.user_image" alt="프사" />
                    </span>
                    <span class="mb-1">{{ review.user_nickname }}</span>
                  </div>
                  <div class="ms-4">
                    <i class="bi bi-eye me-2"></i>
                    <span> {{ review.viewCount }}</span>
                    <!-- TODO : 아래의 기능은 구현여부 결정 -->
                    <!-- <i class="bi bi-bookmark me-2"></i> -->
                    <!-- <span class="me-1">{{ review.bookmarkCount }}</span> -->
                    <!-- <i class="bi bi-chat-right-text me-2"></i> -->
                    <!-- <span class="me-1">{{ review.commentCount }}</span> -->
                    <!-- <i class="bi bi-heart me-2"></i> -->
                    <!-- <span>{{ review.likeCount }}</span> -->
                  </div>
                </div>
                <a class="btn btn-sm btn-outline-dark">모집 공고 보러가기</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PaginationLayout :page="page" @paging="paging" class="pagination" />
    </section>
  </div>
</template>
<script>
// import RecruitSortLayout from "@/components/layouts/RecruitSortLayout.vue";
import SingleStackSearchLayout from "@/components/layouts/SingleStackSearchLayout.vue";
import SearchAll from "@/components/SearchAll.vue";
import RegisterbtnLayout from "../components/layouts/RegisterbtnLayout.vue";
import PaginationLayout from "@/components/layouts/PaginationLayout.vue";

export default {
  components: {
    // RecruitSortLayout,
    SingleStackSearchLayout,
    SearchAll,
    RegisterbtnLayout,
    PaginationLayout
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      btnText: "프로젝트 후기 작성하기",
      reviews: [],
      stacks: [],
      page: 1,
      pageToMove: 1,
      keyword: ""
    };
  },
  setup() {},
  created() {
    this.getReviewList();
  },
  mounted() {},
  unmounted() {},
  methods: {
    async getReviewList() {
      const response = await this.$post(`/project/review`, {
        param: {
          page: this.pageToMove,
          stacks: this.stacks,
          keyword: this.keyword
        }
      });
      console.log(response);
      this.page = Math.ceil(Math.ceil(response.data.count[0].cnt / 8));
      this.reviews = response.data.reviewList;
      this.reviews.forEach((review) => {
        review.stack_code = this.convertStack(review.stack_code);
      });
    },
    convertStack(raw_stack) {
      return raw_stack.split(",").map(String);
    },
    goToMenu(path) {
      this.$router.push({ path: path });
    },
    goToDetail(id) {
      window.scrollTo(0, 0);
      const path = `/project/review/${id}`;
      this.$router.push({
        path: path,
        name: "reviewdetail",
        params: { reviewId: id }
      });
    },
    goToReviewDetail(projectId, reviewId, e) {
      if (e.target.className === "btn btn-sm btn-outline-dark") {
        window.scrollTo(0, 0);
        this.$router.push(`/project/recruit/${projectId}`);
        return;
      }
      this.goToDetail(reviewId);
    },
    sendValue(data) {
      this.stacks = data;
      this.getReviewList();
    },
    SearchKeyword(data) {
      this.keyword = data;
      this.getReviewList();
    },
    paging(data) {
      this.pageToMove = data;
      this.getReviewList();
    }
  }
};
</script>
<style lang="scss" scoped>
.review_list {
  row-gap: 20px;
}
.card {
  margin-right: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.card:nth-child(2n) {
  margin-right: 0;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.card-title {
  font-weight: 700;
}
.card-text ::v-deep * {
  color: black !important;
  font-size: 1rem;
  line-height: 1.8rem;
  margin: 0;
}

.btn_write {
  border: 1px solid #363636;
  transition: 0.2s;
}
.btn_write:hover {
  background-color: #363636;
  color: #fff;
}
.banner {
  color: #fff;
  height: 200px;
  background-color: #0b72cd;
}
.section_first {
  border-bottom: 1px solid #838383;
}
.thumbnail {
  width: 240px;
  height: 238px;
  /* object-fit: cover; */
  object-fit: contain;
  /* background-color: #d7d7d7; */
  border-right: 1px solid #dddddd;
}
.stack-icon {
  font-size: 14px;
  display: inline-block;
  padding: 0 12px;
  text-align: center;
  border-radius: 28px;
  color: white;
  background-color: #1379d2;
  box-sizing: border-box;
}
.card-title-ellipsis {
  width: 358px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.ellipsis {
  width: 368px;
  height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pagination {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.image > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 4px;
}
</style>
