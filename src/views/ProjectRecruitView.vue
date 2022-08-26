<template>
  <div>
    <section class="banner d-flex align-items-center">
      <div class="container">
        <h1>프로젝트</h1>
        <p>관심있는 프로젝트에 참여해보세요!</p>
      </div>
    </section>
    <section class="container">
      <div
        class="d-flex pb-5 align-items-start justify-content-between section_first">
        <div class="d-flex">
          <RegionSortLayout
            :onlineSort="onlineSort"
            @send-LargeCity="SendLargeCity"
            @send-RestCity="SendRestCity" />
          <RecruitStatus @status-sort="statusSort" />
        </div>
        <registerbtn-layout
          v-if="user.user_id"
          :btnText="btnText"
          @click="goToMenu('../Recruitwrite')" />
      </div>
      <div
        class="d-flex pt-5 mb-4 align-items-start justify-content-end section_second">
        <!-- 우선은 정렬기능 비활성화 -->
        <!-- <RecruitSortLayout /> -->
        <div class="d-flex">
          <SingleStackSearchLayout @send-value="sendValue" />
          <SearchAll @search-keyword="SearchKeyword" />
        </div>
      </div>
      <!-- 리스트 or 로딩컴포넌트 or 에러메세지 -->
      <div v-if="error">에러입니다</div>
      <div v-else-if="!isLoaded">
        <LoadingComponent />
      </div>
      <div v-else-if="projects[0] === undefined" class="project-empty">
        <div class="col-md-auto emptyProject">
          <img class="" src="@/img/emptyProject.jpg" alt="" />
          <p>원하시는 조건에 맞는 모집 공고가 없습니다!!</p>
        </div>
      </div>
      <CardList v-else :projects="projects" />
      <PaginationLayout :page="page" @paging="paging" class="pagination" />
    </section>
  </div>
</template>
<script>
// import RecruitSortLayout from "../components/layouts/RecruitSortLayout.vue";
import RegionSortLayout from "@/components/layouts/RegionSortLayout.vue";
import SingleStackSearchLayout from "@/components/layouts/SingleStackSearchLayout.vue";
import SearchAll from "../components/SearchAll.vue";
import RecruitStatus from "@/components/layouts/RecruitStatus.vue";
import CardList from "@/components/CardList.vue";
import RegisterbtnLayout from "../components/layouts/RegisterbtnLayout.vue";
import PaginationLayout from "@/components/layouts/PaginationLayout.vue";
import LoadingComponent from "@/components/layouts/LoadingComponent.vue";

export default {
  components: {
    // RecruitSortLayout,
    RegionSortLayout,
    SingleStackSearchLayout,
    SearchAll,
    RecruitStatus,
    CardList,
    RegisterbtnLayout,
    PaginationLayout,
    LoadingComponent
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      MAIN_AREA_CODE: "",
      SUB_AREA_CODE: "",
      stacks: [],
      btnText: "모집글 작성",
      page: null, // 총 페이지
      projects: [],
      pageToMove: 1, // 이동할 페이지
      recruitStatus: "REC",
      keyword: "",
      error: null,
      isLoaded: false,
      onlineSort: { value: "ON", label: "온라인" }
    };
  },
  setup() {},
  created() {
    this.getProjectsData();
  },
  mounted() {},
  unmounted() {},
  methods: {
    goToMenu(path) {
      this.$router.push({ path: path });
    },
    sendValue(data) {
      this.stacks = data;
      this.isLoaded = false;
      this.getProjectsData();
    },
    SendLargeCity(data) {
      this.MAIN_AREA_CODE = data;
      this.isLoaded = false;
      this.getProjectsData();
    },
    SendRestCity(data) {
      this.SUB_AREA_CODE = data;
      this.isLoaded = false;
      this.getProjectsData();
    },
    SearchKeyword(data) {
      this.keyword = data;
      this.isLoaded = false;
      this.getProjectsData();
    },
    async getProjectsData() {
      try {
        const response = await this.$post(`/project/recruit/`, {
          param: {
            page: this.pageToMove,
            status: this.recruitStatus,
            stacks: this.stacks,
            main_area: this.MAIN_AREA_CODE,
            rest_area: this.SUB_AREA_CODE,
            keyword: this.keyword
          }
        });
        this.isLoaded = true;
        this.page = Math.ceil(Math.ceil(response.data.count[0].cnt / 8));
        this.projects = response.data.projectRecruitList;
        this.projects.forEach((project) => {
          project.exp_start_date = this.$formatDate(project.exp_start_date);
          project.stack_code = project.stack_code.split(","); // string to arr
          project.status_code = this.$setStatusText(project.status_code);
        });
        // console.log(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    statusSort(status) {
      this.recruitStatus = status;
      this.isLoaded = false;
      this.getProjectsData();
    },
    paging(data) {
      this.pageToMove = data;
      this.isLoaded = false;
      this.getProjectsData();
    }
  }
};
</script>
<style scoped>
.banner {
  color: #fff;
  height: 200px;
  background-color: #1379d2;
  margin-bottom: 42px;
}
.section_first {
  border-bottom: 1px solid #838383;
}
.stack_search {
  width: 200px;
}
.btn_write {
  border: 1px solid #363636;
  transition: 0.2s;
}
.btn_write:hover {
  background-color: #363636;
  color: #fff;
}
.project-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
}
.project-list .card {
  border-radius: 15px;
  width: 18rem;
  /* max-height: 253px; */
  /* overflow: hidden; */
  margin-right: 48px;
  cursor: pointer;
  transition: all 0.3s;
}
.project-list .card:nth-child(4n) {
  margin-right: 0;
}
.project-list .card:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
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
}
.project-status {
  display: inline-block;
  padding: 0 12px;
  font-size: 12px;
  text-align: center;
  border-radius: 28px;
  border: 1px solid black;
  box-sizing: border-box;
}
.ellipsis {
  width: 200px;
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
.project-empty {
  padding: 24px 0 0 12px;
  font-size: 24px;
  font-weight: bold;
}
.emptyProject {
  min-width: 1000px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.emptyProject > img {
  width: 400px;
  height: 400px;
}
</style>
