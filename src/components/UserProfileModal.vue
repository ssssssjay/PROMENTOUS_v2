<template>
  <Modal ref="baseModal" class="modal">
    <div class="container" v-if="this.modalData === 'applicant'">
      <!-- 상단 -->
      <div class="row mt-5">
        <div class="col-2 text-center">
          <img
            v-bind:src="applicantData.userImage"
            alt=""
            style="width: 120px; border-radius: 10%" />
          <div class="mt-2 h4">
            {{ applicantData.userNickname }}
          </div>
          <div>
            <i class="bi bi-star-fill pro_star_color"></i>
            {{ averageRate }} ({{ applicantData.rating.length }})
          </div>
        </div>
        <div class="col text-start px-4">
          <p class="h2"><strong>자기소개</strong></p>
          <p
            class="h5 intro"
            :key="i"
            v-html="this.applicantData.userIntro"></p>
        </div>
      </div>
      <!-- 평판 부분 -->
      <div class="row mt-5">
        <hr />
        <br />
        <div class="col-2 h4 text-center"><strong>최근 평판</strong></div>
        <div class="col" style="height: 180px; overflow: auto">
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-offset="0"
            class="scrollspy-example"
            tabindex="0">
            <h4
              id="list-item-1"
              :key="i"
              v-for="(rate, i) in applicantData.rating">
              <i class="bi bi-star-fill pro_star_color"></i> {{ rate.score }}
              <span>{{ rate.comment }}</span>
            </h4>
          </div>
        </div>
        <hr />
      </div>
      <!-- 관심 정보 -->
      <div class="info mt-5">
        <div class="row">
          <span class="col-2 h4 text-center"><strong>관심 스택</strong></span>
          <div class="col-8 h4 text-start">
            <p
              class="emptyValue"
              v-if="applicantData.likeStackCode == null || []">
              등록된 관심 스택이 없습니다
            </p>
            <button
              v-else
              class="btn m-1 btn-primary Stack"
              v-for="(stack, index) in applicantData.likeStackCode"
              :key="index">
              {{ stack }}
            </button>
          </div>
        </div>
        <div class="row my-5">
          <span class="col-2 h4 text-center"><strong>관심 분야</strong></span>
          <div class="col-8 h4 text-start">
            <p class="emptyValue" v-if="applicantData.likeDeptCode == null">
              등록된 관심 분야가 없습니다
            </p>
            <button
              class="btn m-1 btn-primary Stack"
              v-for="(Dept, index) in applicantData.likeDeptCode"
              :key="index">
              {{ Dept }}
            </button>
          </div>
        </div>
        <div class="mt-5 mb-5">
          <hr />
        </div>
      </div>
      <!-- 활동 기록d -->
      <div class="log mt-5">
        <div class="row">
          <div class="col-2 h4 text-center">
            <strong>진행한 프로젝트</strong>
          </div>
          <div class="col text-start px-4 h5">
            <p class="emptyValue" v-if="applicantData.project.length == 0">
              진행한 프로젝트가 없습니다
            </p>
            <div
              class="mb-3"
              v-for="(project, i) in applicantData.project"
              :key="i">
              <router-link
                v-if="project.length != 0"
                target="_blank"
                :to="this.path"
                style="text-decoration: none; color: #1379d2"
                ><strong @click="goToProjectDetail(project.project_id)">
                  {{ project.title }}
                </strong></router-link
              >
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-2 h4 text-center">
            <strong>작성한 후기글</strong>
          </div>
          <div class="col text-start px-4 h5">
            <p class="emptyValue" v-if="applicantData.review.length == 0">
              작성한 후기글이 없습니다
            </p>
            <div
              class="mb-3"
              v-for="(review, i) in applicantData.review"
              :key="i">
              <router-link
                v-if="review.length != 0"
                target="_blank"
                :to="this.path"
                style="text-decoration: none; color: #1379d2"
                ><strong @click="goToReviewDetail(review.review_id)">{{
                  review.title
                }}</strong></router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <hr />
      </div>
      <div class="row mt-5">
        <span class="col-2 h4 text-center"><strong>소셜 정보</strong></span>
        <p class="col-3 emptyValue" v-if="applicantData.url_list.length == 0">
          등록된 소셜 정보가 없습니다
        </p>
        <div
          v-else
          class="col-2 mb-3"
          v-for="(url, i) in applicantData.url_list"
          :key="i">
          <a class="url" target="_blank" :href="`https://${url.url_address}`">{{
            url.url_title
          }}</a>
        </div>
      </div>
    </div>

    <!-- 팀원 데이터 -->
    <!-- ----------------------------------------------------------------------------------- -->
    <div class="container" v-if="this.modalData === 'teammember'">
      <!-- 상단 -->
      <div class="row mt-5">
        <div class="col-2 text-center">
          <img
            v-bind:src="memberData.userImage"
            alt=""
            style="width: 120px; border-radius: 10%" />
          <div class="mt-2 h4">
            {{ memberData.userNickname }}
          </div>
          <div>
            <i class="bi bi-star-fill pro_star_color"></i>
            {{ averageRate }} ({{ memberData.rating.length }})
          </div>
        </div>

        <div class="col text-start px-4">
          <p class="h2"><strong>자기소개</strong></p>
          <p class="h5 intro" :key="i" v-html="this.memberData.userIntro"></p>
        </div>
      </div>
      <!-- 평판 부분 -->
      <div class="row mt-5">
        <hr />
        <br />
        <div class="col-2 h4 text-center"><strong>최근 평판</strong></div>
        <div class="col" style="height: 180px; overflow: auto">
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-offset="0"
            class="scrollspy-example"
            tabindex="0">
            <h4
              id="list-item-1"
              :key="i"
              v-for="(rate, i) in memberData.rating">
              <i class="bi bi-star-fill pro_star_color"></i> {{ rate.score }}
              <span>{{ rate.comment }}</span>
            </h4>
          </div>
        </div>
        <hr />
      </div>
      <!-- 관심 정보 -->
      <div class="info mt-5">
        <div class="row">
          <span class="col-2 h4 text-center"><strong>관심 스택</strong></span>
          <div class="col-8 h4 text-start">
            <p class="emptyValue" v-if="memberData.likeDeptCode == null || []">
              등록된 관심 스택이 없습니다
            </p>
            <button
              v-else
              class="btn m-1 btn-primary Stack"
              v-for="(stack, index) in memberData.likeStackCode"
              :key="index">
              {{ stack }}
            </button>
          </div>
        </div>
        <div class="row my-5">
          <span class="col-2 h4 text-center"><strong>관심 분야</strong></span>
          <div class="col-8 h4 text-start">
            <p class="emptyValue" v-if="memberData.likeDeptCode == null">
              등록된 관심 분야가 없습니다
            </p>
            <button
              v-else
              class="btn m-1 btn-primary Stack"
              v-for="(Dept, index) in memberData.likeDeptCode"
              :key="index">
              {{ Dept }}
            </button>
          </div>
        </div>
        <div class="mt-5 mb-5">
          <hr />
        </div>
      </div>
      <!-- 활동 기록d -->
      <div class="log mt-5">
        <div class="row">
          <div class="col-2 h4 text-center">
            <strong>진행한 프로젝트</strong>
          </div>
          <div class="col text-start px-4 h5">
            <p class="emptyValue" v-if="memberData.project.length == 0">
              진행한 프로젝트가 없습니다
            </p>
            <div
              class="mb-3"
              v-for="(project, i) in memberData.project"
              :key="i">
              <router-link
                v-if="project.length != 0"
                target="_blank"
                :to="this.path"
                style="text-decoration: none; color: #1379d2"
                ><strong @click="goToProjectDetail(project.project_id)">
                  {{ project.title }}
                </strong></router-link
              >
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-2 h4 text-center">
            <strong>작성한 후기글</strong>
          </div>
          <div class="col text-start px-4 h5">
            <p class="emptyValue" v-if="memberData.review.length == 0">
              작성한 후기글이 없습니다
            </p>
            <div class="mb-3" v-for="(review, i) in memberData.review" :key="i">
              <router-link
                v-if="review.length != 0"
                target="_blank"
                :to="this.path"
                style="text-decoration: none; color: #1379d2"
                ><strong @click="goToReviewDetail(review.review_id)">{{
                  review.title
                }}</strong></router-link
              >
            </div>
          </div>
        </div>
        <div class="mt-3">
          <hr />
        </div>
        <div class="row mt-5">
          <span class="col-2 h4 text-center"><strong>소셜 정보</strong></span>
          <p class="col-3 emptyValue" v-if="memberData.url_list.length == 0">
            등록된 소셜 정보가 없습니다
          </p>
          <div
            v-else
            class="col-2 mb-3"
            v-for="(url, i) in memberData.url_list"
            :key="i">
            <a
              class="url"
              target="_blank"
              :href="`https://${url.url_address}`"
              >{{ url.url_title }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <!-- <button class="btn confirm" @click="[confirm()]">확인</button> -->
      <button class="btn cancel" @click="cancel">닫기</button>
    </div>
  </Modal>
</template>
<script>
import Modal from "@/components/BaseModal2.vue";
import { ref } from "vue";
export default {
  name: "UserProfileModal2",
  components: { Modal },
  props: {
    memberData: Object,
    applicantData: Object,
    modalData: String
  },
  data() {
    return {
      averageRate: 1,
      path: ""
      // *userNickname
      // *likeStackCode
      // *userImage
      // *userIntro
      // *likeDeptCode
      // {진행한 프로젝트 모집글 제목 , 모집글링크 } [{title:'',address:''}]이런식으로
      // {작성한 리뷰 제목 , 주소}  REVIEW테이블   [{title:'',address:''}]이런식으로
      // 소셜정보  마이페이지 URL_LIST   [{title:'',address:''}]이런식으로

      // 평판 보류
      // 평점총합/평점.length
      // 평점.length
      // {평점 + 평가 코멘트 }  RATE테이블  RATE /  RATE_COMMENT
    };
  },
  setup() {
    const baseModal = ref(null);
    const resolvePromise = ref(null);

    const show = () => {
      baseModal.value.open();
      return new Promise((resolve) => {
        resolvePromise.value = resolve;
      });
    };

    const confirm = () => {
      baseModal.value.close();
      resolvePromise.value(true);
    };

    const cancel = () => {
      baseModal.value.close();
      resolvePromise.value(false);
    };
    return { baseModal, show, confirm, cancel };
  },
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    goToProjectDetail(id) {
      window.scrollTo(0, 0);
      this.path = `/project/recruit/${id}`;
    },
    goToReviewDetail(id) {
      window.scrollTo(0, 0);
      this.path = `/project/review/${id}`;
    }
  }
};
</script>
<style scoped>
button.btn.btn-primary {
  background-color: #49c0d0;
  border-color: #49c0d0;
}
.Stack {
  font-size: 15px;
}
.emptyValue {
  font-size: 15px;
  margin-top: 7px;
}
.url {
  text-decoration: none;
  color: #1379d2;
  font-size: 20px;
  font-weight: bold;
}
.intro {
  overflow: auto;
  height: 200px;
}
</style>
