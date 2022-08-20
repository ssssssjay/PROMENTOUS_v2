<template>
  <div>
    <!-- 케러셀 -->
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel">
      <div id="user-wrap" class="carousel-inner">
        <div id="user-image" class="carousel-item active">
          <img src="../assets/back.png" class="d-block w-200" alt="..." />
          <div class="user-text">
            <h1 style="font-size: 3vw"><strong>프로젝트</strong></h1>
            <p>프로젝트에 참여할 사람을 모집하거나, 참여하세요.</p>
          </div>
          <div class="user-img">
            <img src="../assets/플젝1.png" alt="" />
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/back.png" class="d-block w-200" alt="..." />
          <div class="user-text">
            <h1 style="font-size: 3vw"><strong>멘토링</strong></h1>
            <p>프로젝트가 막막할 때, 당신의 멘토가 기다리고 있습니다.</p>
          </div>
          <div class="user-img2">
            <img src="../assets/멘토링.png" alt="" />
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 캐러셀 -->
    <!-- 상단 : 프로젝트 리스트 -->
    <div class="container">
      <div class="row mt-5">
        <p id="tb" class="col-3 text-start h2">
          <strong>프로젝트 리스트</strong>
        </p>
        <p class="col-9 text-end">
          <a
            href="../project/recruit"
            style="text-decoration: none; color: black"
            >프로젝트 더보기</a
          >
        </p>
        <hr />
      </div>
      <CardList class="mt-3" :projects="projects"></CardList>
      <!-- 상단 : 프로젝트 리스트 -->

      <!-- 하단 : 멘토리스트 -->
      <div style="margin-top: 120px"></div>
      <div class="row mt-5">
        <p id="tb" class="col-2 text-start h2"><strong>멘토 리스트</strong></p>
        <p class="col-10 text-end">
          <a href="../mentolist" style="text-decoration: none; color: black"
            >멘토 더보기</a
          >
        </p>
        <hr />
      </div>
      <div class="mentorList">
        <div class="row text-center">
          <div
            id="card2"
            class="col card my-3"
            style="
              max-width: 400px;
              min-width: 400px;
              min-height: 400px;
              max-height: 400px;
            "
            v-for="(mentor, index) in mentors2"
            :key="index"
            @click="goToMentorDetail(`/mentordetail/${mentor.user_id}`)">
            <div class="card-title text-center mt-4 mb-0">
              <img
                :src="mentor.user_image"
                alt="../assets/default.jpg"
                style="border-radius: 70%; width: 150px; height: 150px" />
            </div>
            <div id="to" class="card-body">
              <h2 class="fs-5 mt-0">
                <strong>{{ mentor.user_nickname }}</strong>
              </h2>
              <i class="bi bi-star-fill pro_star_color"></i>{{ rate1[index] }} /
              ({{ rate2[index] }})

              <div class="text">
                <p class="card-text">
                  {{ mentor.mentoring_intro }}
                </p>
              </div>
            </div>
            <div class="card-body">
              <hr />
              <div
                class="stack-icon mx-1"
                style="width: auto; font-size: 14px"
                v-for="(part, index) in mentor.mentoring_dept_code"
                :key="index">
                {{ part }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardList from "@/components/CardList.vue";

export default {
  name: "HomeView",
  components: { CardList },
  data() {
    return {
      rate1: [3.7, 4.6, 4.9, 3.2, 4, 2.7],
      rate2: [12, 43, 5, 10, 34, 20],
      mentors: [],
      projects: [],
      mentors2: []
    };
  },
  created() {
    this.getProjectData();
    this.getMentorData();
  },
  methods: {
    async getProjectData() {
      const response = await this.$get("http://localhost:3000/project/recruit");
      console.log(response);
      this.projects = response;
      this.projects.forEach((project) => {
        project.status_code = this.isPossible(project.status_code);
        project.exp_start_date = this.expDate(project.exp_start_date);
      });
    },
    async getMentorData() {
      const response2 = await this.$get("http://localhost:3000/mentor");
      console.log(response2);
      this.mentors2 = response2;
    },
    goToMentorDetail(path) {
      window.scrollTo(0, 0);
      this.$router.push({ path: path });
      /**/
    },

    isPossible(status) {
      if (status === "REC") {
        return "모집중";
      } else if (status === "FIN") {
        return "모집완료";
      }
    },
    expDate(date) {
      return date.substring(0, 10);
    }
  }
};
</script>

<style scoped>
.d-block {
  width: 100%;
  height: 40vh;
}

.stack-icon {
  font-size: 12px;
  display: inline-block;
  padding: 0 12px;
  text-align: center;
  border-radius: 28px;
  color: white;
  background-color: #1379d2;
  box-sizing: border-box;
  width: auto;
}

.row {
  vertical-align: middle;
}

.card {
  justify-content: center;
}

#card {
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 35px;
}

#card:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

#card2 {
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 30px;
}

#card2:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.user-text {
  position: absolute;
  top: 50%;
  left: 113%;
  width: 200%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  text-align: start;
  color: white;
}

.user-img {
  position: absolute;
  top: 58%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 300px;
}

.user-img2 {
  position: absolute;
  top: 59%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 300px;
}

.user-img img,
.user-img2 img {
  width: 100%;
  height: 100%;
}

#user-wrap {
  width: 100%;
  /* margin: 10px auto; */
  position: relative;
}

#user-image {
  width: 100%;
  vertical-align: middle;
}
div.text {
  height: 30px;
}
.card-text {
  font-size: 13px;
  /* min-height: 80px; */

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
