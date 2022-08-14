<template>
  <div>
    <section class="project_list">
      <div class="card" v-for="(project, i) in projects" :key="i">
        <section
          class="card-body"
          :class="project.status_code === '모집완료' ? 'fin' : ''"
          @click="goToDetail(project.project_id)">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="text-start text-muted desc-exp-date"
              >시작예정일 : {{ project.exp_start_date }}</span
            >
            <span class="project-status">{{ project.status_code }}</span>
          </div>
          <h2 class="mb-4 ellipsis title">{{ project.title }}</h2>
          <div class="stack mb-4">
            <div v-if="project.stack_code.length <= 3">
              <div
                class="stack-icon me-1"
                v-for="(stack, i) in project.stack_code"
                :key="i">
                {{ stack }}
              </div>
            </div>
            <span v-else>
              <div class="stack-icon me-1">{{ project.stack_code[0] }}</div>
              <div class="stack-icon me-1">{{ project.stack_code[1] }}</div>
              <div class="stack-icon me-1">{{ project.stack_code[2] }}</div>
            </span>
            <span v-show="project.stack_code.length > 3">
              + {{ project.stack_code.length - 3 }}
            </span>
          </div>
          <div class="d-flex justify-content-start pb-3 mb-3 border-bottom">
            <div class="acceptStatus">
              모집현황 :
              <strong
                >{{ project.acceptedCnt }} / {{ project.totalPeople }}</strong
              >
            </div>
            <div class="ms-3 progressMethod">
              진행방식 :
              <strong>{{
                project.progress_method === "ON" ? "온라인" : "오프라인"
              }}</strong>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <!-- TODO : 프사 로딩 오류시에는?  -->
            <div>
              <span class="image me-2">
                <img v-bind:src="project.user_image" alt="프사" />
              </span>
              <span class="mb-1">{{ project.user_nickname }}</span>
            </div>
            <div>
              <i class="bi bi-eye me-2"></i>
              <span> {{ project.viewCount }}</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    projects: Array
  },
  components: {},
  data() {
    return {};
  },
  setup() {
    // props.projects = this.d;
  },
  created() {
    // passProjects();
  },
  mounted() {},
  unmounted() {},
  methods: {
    // 카드 클릭시 id를 파라미터로 전달하고 해당 상세글로 이동
    goToDetail(id) {
      window.scrollTo(0, 0);
      const path = `/project/recruit/${id}`;
      this.$router.push({
        path: path,
        name: "projectdetail",
        params: { projectId: id }
      });
    }
    // passProjects(data) {
    //   const d = data;
    // }
  }
};
</script>
<style lang="scss" scoped>
.project_list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
}
.project_list .card {
  border-radius: 15px;
  width: 18rem;
  /* max-height: 253px; */
  /* overflow: hidden; */
  margin-right: 48px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.project_list .fin::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 15px;
  content: "";
  width: 100%;
  height: 298.5px;
  background-color: rgba($color: #fff, $alpha: 0.5);
}
.project_list .card:nth-child(4n) {
  margin-right: 0;
}
.project_list .card:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.desc-exp-date {
  font-size: 15px;
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
.project-status {
  display: inline-block;
  padding: 0 12px;
  font-size: 13px;
  text-align: center;
  border-radius: 28px;
  border: 1px solid #000;
  box-sizing: border-box;
}
.ellipsis {
  width: 254px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2rem;
  height: 4rem;
}
.image > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 4px;
}
.acceptStatus,
.progressMethod {
  display: inline-block;
  color: #888;
  border-radius: 5px;
  text-align: center;
  font-size: 15px;
  strong {
    color: #000;
    font-size: 1.15em;
    font-weight: 700;
  }
}
</style>
