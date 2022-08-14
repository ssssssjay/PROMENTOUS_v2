<template>
  <div class="container">
    <!-- 상단 -->
    <div class="row mt-5">
      <div class="col-2 text-center">
        <img
          src="../assets/profile.jpg"
          alt=""
          style="width: 120px; border-radius: 10%" />
        <div class="mt-2 h4">
          <strong>{{ nickname }}</strong>
        </div>
        <div>
          <button class="btn btn-outline-primary">
            <i class="bi bi-star-fill pro_star_color"></i>
            {{ score }} / ({{ scoreCount }})
          </button>
        </div>
      </div>

      <div class="col-6 text-start px-4">
        <p class="h2"><strong>자기소개</strong></p>
        <p class="h5">{{ selfInfo }}</p>
      </div>
    </div>
    <!-- 평판 부분 -->
    <div class="row mt-5">
      <hr />
      <br />
      <div class="col-2 h4 text-center"><strong>최근 평판</strong></div>
      <div class="col">
        <div
          data-bs-spy="scroll"
          data-bs-target="#list-example"
          data-bs-offset="0"
          class="scrollspy-example"
          tabindex="0">
          <h4 id="list-item-1">
            <i class="bi bi-star-fill pro_star_color"></i> {{ score }}
          </h4>
          <p>시간을 잘 지키십니다.</p>
          <h4 id="list-item-2">
            <i class="bi bi-star-fill pro_star_color"></i> 5
          </h4>
          <p>항상 성실하게 맡은 임무를 수행해오십니다.</p>
          <h4 id="list-item-3">
            <i class="bi bi-star-fill pro_star_color"></i> 0.5
          </h4>
          <p>코딩을 너무 못해요</p>
          <h4 id="list-item-4">
            <i class="bi bi-star-fill pro_star_color"></i> {{ score }}
          </h4>
          <p>...</p>
        </div>
      </div>
      <hr />
    </div>
    <!-- 관심 정보 -->
    <div class="info mt-5">
      <div class="row">
        <span class="col-2 h4 text-center"><strong>관심 스택</strong></span>
        <div class="col-8 h4 text-start">
          <span
            class="stack-icon mx-2"
            style="width: auto"
            v-for="(stack, index) in likeStack"
            :key="index"
            >{{ stack }}</span
          >
        </div>
      </div>
      <div class="row my-5">
        <span class="col-2 h4 text-center"><strong>관심 분야</strong></span>
        <div class="col-8 h4 text-start">
          <span
            class="stack-icon mx-2"
            style="width: auto"
            v-for="(part, index) in likePart"
            :key="index"
            >{{ part }}</span
          >
        </div>
      </div>
      <div class="mt-5 mb-5">
        <hr />
      </div>
    </div>
    <!-- 활동 기록 -->
    <div class="log mt-5">
      <div class="row">
        <div class="col-2 h4 text-center"><strong>진행한 프로젝트</strong></div>
        <div class="col text-start px-4 h5">
          <div class="mb-3" v-for="(project, i) in projects" :key="i">
            <a
              :href="project.href"
              style="text-decoration: none; color: #1379d2"
              ><strong>{{ project.name }}</strong></a
            >
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-2 h4 text-center"><strong>작성한 후기글</strong></div>
        <div class="col text-start px-4 h5">
          <div class="mb-3" v-for="(review, i) in reviews" :key="i">
            <a :href="review.href" style="text-decoration: none; color: #1379d2"
              ><strong>{{ review.name }}</strong></a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <hr />
    </div>
    <p class="row mt-5">
      <span class="col-2 h4 text-center"><strong>소셜 정보</strong></span>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selfInfo:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      nickname: "joansdev",
      score: "4.5",
      scoreCount: "25",
      likeStack: ["Spring", "React", "MySQL"],
      likePart: ["프론트엔드", "백엔드", "모바일"],
      projects: [
        {
          name: "찰리와 초콜릿기계 설계해보기",
          href: "https://www.naver.com/"
        },
        { name: "쀼 프로젝트", href: "https://www.naver.com/" },
        { name: "업무자동화 프로그램 개발", href: "https://www.naver.com/" }
      ],
      reviews: [
        { name: "처음부터 잘하는 사람은 없다", href: "https://www.naver.com/" },
        { name: "Vue를 다뤄보다", href: "https://www.naver.com/" },
        { name: "나의 첫 팀프로젝트", href: "https://www.naver.com/" }
      ]
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>

<style scoped>
.stack-icon {
  font-size: 20px;
  display: inline-block;
  padding: 0 20px;
  text-align: center;
  border-radius: 28px;
  color: white;
  background-color: #1379d2;
  box-sizing: border-box;
}
</style>
