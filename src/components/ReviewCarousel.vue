<template>
  <div class="mb-5" v-if="isReviewList">
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <h2>후기 모아보기</h2>
        <div
          id="myCarousel"
          class="carousel carousel-dark slide"
          data-bs-ride="carousel">
          <!-- Carousel indicators -->
          <div class="carousel-indicators">
            <button
              v-for="(review, idx) in reviewList"
              :key="idx"
              type="button"
              data-bs-target="#myCarousel"
              :data-bs-slide-to="idx"
              class="active"
              aria-current="true"
              aria-label="`Slide ${idx + 1}`"></button>
          </div>
          <!-- Wrapper for carousel items -->
          <div class="carousel-inner text-center ellipsis">
            <div
              class="carousel-item"
              v-for="review in reviewList"
              :key="review.review_id"
              :class="{ active: review.review_id == firstReviewId }">
              <a
                @click="goToReviewDetail(review.review_id)"
                :title="review.title"
                class="btn-link text-semibold media-heading box-inline pro_a_black fs-3 pro_ellipsis">
                {{ review.title }}
              </a>
              <!-- TODO: css ellipsis 라인 수 제한 줘야함.-->
              <p
                :title="review.desc"
                class="d-block mt-4 fs-5 pro_ellipsis pro_carousel_text"
                v-html="review.desc"></p>
            </div>
          </div>

          <!-- Carousel controls -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev">
            <i class="bi bi-chevron-left"></i>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next">
            <i class="bi bi-chevron-right"></i>
            <span class="visually-hidden">Next</span>
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
    projectId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      firstReviewId: "",
      reviewList: [],
      isReviewList: true
    };
  },
  setup() {},
  created() {
    this.getAllReview();
  },
  mounted() {},
  unmounted() {
    // 캐러셀 item 넘어가는 시간 간격 옵션 추가 -> error 나서 지움
    // let firstCarouselItem = document.querySelector(".carousel-item");
    // firstCarouselItem.setAttribute("data-bs-interval", 7000);
  },
  methods: {
    async getAllReview() {
      this.reviewList = await this.$get(
        `/project/recruit/${this.projectId}/all_review`
      );
      if (!this.reviewList[0]) {
        this.isReviewList = false;
        return;
      }
      this.firstReviewId = this.reviewList[0].review_id;
    },
    goToReviewDetail(id) {
      window.scrollTo(0, 0);
      this.$router.push(`/project/review/${id}`);
    }
  }
};
</script>
<style scoped>
h2 {
  color: #333;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  margin: 30px 0 60px;
}
h2::after {
  content: "";
  width: 100px;
  position: absolute;
  margin: 0 auto;
  height: 3px;
  background: #49c0d0;
  left: 0;
  right: 0;
  bottom: -10px;
}
.col-center {
  margin: 0 auto;
  float: none !important;
}
.carousel {
  padding: 0 70px;
}
/* .carousel .carousel-item {
  color: #999;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  min-height: 290px;
} */
.carousel .carousel-item {
  color: #999;
  font-size: 15px;
  /* text-align: center; */
  overflow: hidden;
  /* min-height: 290px; */
}

/* .carousel .testimonial {
  padding: 30px 0 10px;
} */

.carousel-control-prev,
.carousel-control-next {
  width: 40px;
  height: 40px;
  margin-top: -20px;
  top: 50%;
  background: none;
}
.carousel-control-prev i,
.carousel-control-next i {
  font-size: 68px;
  line-height: 42px;
  position: absolute;
  display: inline-block;
  color: rgba(0, 0, 0, 0.8);
  text-shadow: 0 3px 3px #e6e6e6, 0 0 0 #000;
}
.carousel-indicators {
  bottom: -40px;
}
.carousel-indicators li,
.carousel-indicators li.active {
  width: 11px;
  height: 11px;
  margin: 1px 3px;
  border-radius: 50%;
  border: none;
}
.carousel-indicators li {
  background: #999;
  border-color: transparent;
  box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.2);
}
.carousel-indicators li.active {
  background: #555;
  box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.2);
}

.pro_carousel_text ::v-deep * {
  font-size: 1rem;
}

.ellipsis {
  width: 668px;
  max-height: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
