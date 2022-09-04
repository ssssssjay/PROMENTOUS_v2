<template>
  <div class="container mt-5">
    <ProfileModal
      ref="modal"
      :leaderStack="this.leaderStack"
      :leaderDept="this.leaderDept"
      :leaderData="this.projectLeader"
      :leaderRate="this.leaderRateData"
      :leaderRateAverage="this.leaderRateAverage"
      :memberRate="this.memberRateData"
      :memberRateAverage="this.memberRateAverage"
      :memberData="this.memberValue"
      :leaderCheck="this.leaderCheck"
      :teamDept="this.TeamDept" />
    <div class="row">
      <!-- 페이지 좌측 -->
      <div class="col-lg-9 pe-xl-1-9 mb-1-9 mb-lg-0">
        <div class="content">
          <!-- 글 제목 -->
          <div class="row text-start">
            <div class="col-2">
              <span
                class="badge fs-5 mt-2"
                :class="[
                  project.status_code === `FIN`
                    ? 'pro_badge_color_disabled'
                    : 'pro_badge_color'
                ]">
                {{ recruitStatus }}
              </span>
            </div>
            <span :title="project.title" class="fs-2 col-8 pro_ellipsis pb-2">
              <strong>
                {{ project.title }}
              </strong>
            </span>
            <span class="text-end col-2 pt-3">
              {{ $formatDate(project.created_datetime) }}
            </span>
            <hr />
          </div>
          <!-- 글 내용 -->
          <div class="h4 px-2" style="text-align: left">
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 시작예정일</span>
              <span class="px-4 col-4">
                <!-- {{ project.exp_start_date.substr(0, 10) }} -->
                {{ $formatDate(project.exp_start_date) }}
              </span>
              <span class="text-muted col-2 pro_font_bold">| 진행기간</span>
              <span class="px-4 col-4">{{ project.exp_period }} 개월</span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 모집인원</span>
              <span class="px-4 col-4">{{ recruitNumber }} 명</span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 진행방식</span>
              <span class="px-4 col-4">{{ progressMethod }}</span>
              <span class="text-muted col-2 pro_font_bold">| 보증금</span>
              <!-- TODO: warranty 없을때 X로 뜨도록 하는 함수 작성해야 함 -->
              <span class="px-4 col-4">{{ warrantyText }}</span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 연락수단</span>
              <span class="px-4 col-10">{{ project.project_contact }}</span>
            </p>
            <p class="row my-4">
              <span class="text-muted col-2 pro_font_bold">| 언어/스택</span>
              <span class="px-4 col-10">
                <span
                  class="badge pro_badge_color rounded-pill me-1"
                  v-for="stack in project.stack_code"
                  :key="stack">
                  {{ stack }}
                </span>
              </span>
            </p>
            <p class="row" v-if="isRefUrl">
              <span class="text-muted col-2 pro_font_bold">| 참고링크</span>
              <span class="col-10">
                <!-- TODO: 버튼 누르면 url.url_address 새창으로 열어주기 -->
                <span v-for="url in refUrl" :key="url.ref_url_id">
                  <a
                    target="_blank"
                    :href="`${url.url_address}`"
                    class="rev_router_link_color">
                    <button type="button" class="btn btn-sm me-2 pro_button">
                      {{ url.url_title }}
                    </button>
                  </a>
                </span>
              </span>
            </p>

            <div class="my-4">
              <span class="text-muted pro_font_bold">| 프로젝트 소개</span>
              <hr />
              <div
                class="widget-box desc-project"
                v-html="project.project_desc"></div>
            </div>
            <div class="py-5" v-if="project.status_code === FIN">
              <review-carousel :projectId="projectId" />
              <hr />
            </div>
          </div>
        </div>
        <!-- 댓글 -->
        <div>
          <write-comment-view
            pageType="projectRecruit"
            :projectId="projectId" />
          <comment-view pageType="projectRecruit" :projectId="projectId" />
        </div>

        <!-- </div> -->
      </div>

      <!-- 페이지 우측 -->
      <div class="col-lg-3 pro_fixed">
        <div class="side-bar">
          <div class="text-start">
            <p class="ps-4">
              <!-- 클립보드 복사 -->
              <copy-to-clipboard :pageUrl="pageUrl" />
              <!-- <button type="button" class="btn btn-success btn-sm mx-1">
                수정
              </button>
              <button type="button" class="btn btn-danger btn-sm">삭제</button> -->
            </p>
          </div>
          <!-- div 테두리 -->
          <div class="widget widget-box ps-3">
            <div class="widget-title h4 mb-4">
              <span class="pro_font_bold">리더 정보</span>
            </div>
            <div class="row">
              <div class="col pe-1">
                <img
                  style="width: 90px; border-radius: 8%"
                  v-bind:src="projectLeader.user_image"
                  alt="리더 정보 사진" />
              </div>
              <div class="col">
                <p
                  :title="projectLeader.user_nickname"
                  class="fs-4 pro_ellipsis">
                  {{ projectLeader.user_nickname }}
                </p>
                <!-- TODO: 별점 연결 -->

                <p>
                  <i class="bi bi-star-fill pro_star_color"></i>
                  {{ leaderRateAverage }}/({{ leaderRateLength }})
                </p>
              </div>
            </div>
            <div class="ps-1">
              <p class="fs-5 mt-3 pro_font_bold">프로젝트 진행 이력</p>
              <div
                class="ps-2"
                v-show="projectLeader.leaderHistory.length === 0">
                완료한 프로젝트가 없습니다.
              </div>
              <div v-show="projectLeader.leaderHistory.length !== 0">
                <p
                  class="ps-2 pro_ellipsis"
                  :title="history.title"
                  v-for="history in projectLeader.leaderHistory"
                  :key="history.project_id">
                  - {{ history.title }}
                </p>
              </div>
            </div>
            <div class="text-end mt-3">
              <button
                type="button"
                class="btn btn-sm me-2 pro_button"
                @click="[leaderModal(), handleClick(), getLeaderRateData()]">
                상세보기
              </button>
            </div>
          </div>

          <div class="widget widget-box ps-3">
            <div class="widget-title h4 mb-4">
              <span class="pro_font_bold">분야별 모집 현황</span>
            </div>
            <ul class="list-unstyled ps-0">
              <li class="row" v-for="recruit in recruitData" :key="recruit">
                <div class="col-6">
                  <p
                    class="fs-5 mb-0 pro_ellipsis"
                    :title="recruit.apply_dept_code">
                    {{ recruit.apply_dept_code }}
                  </p>
                  <p class="fs-6 text-muted ps-1">
                    {{ recruit.total_count }}명 지원
                  </p>
                </div>
                <span class="col-2"
                  >{{ recruit.acc_count }}/{{ recruit.to }}</span
                >
                <span class="col-4">
                  <button
                    type="button"
                    class="btn btn-sm me-1 pro_button"
                    @click="
                      applyProjectAlert(
                        recruit.apply_dept_id,
                        recruit.apply_dept_code
                      )
                    "
                    :disabled="
                      project.status_code === `FIN` ||
                      project.leader_user === userId ||
                      recruit.acc_count === recruit.to ||
                      !applyAbleFlag
                    ">
                    지원
                  </button>
                </span>
              </li>
            </ul>
          </div>

          <div class="widget widget-box ps-3">
            <div class="widget-title h4 mb-4">
              <span class="pro_font_bold">팀원 정보 보기</span>
            </div>
            <div v-show="Object.keys(currentMemberList).length === 0">
              아직 참여중인 팀원이 없습니다.
            </div>
            <ul class="list-unstyled ps-0">
              <li
                class="row pe-0"
                v-for="(members, part, index) in currentMemberList"
                :key="part">
                <div class="col-6">
                  <p class="fs-6 text-muted mb-0">{{ part }}</p>
                </div>
                <p
                  class="row ps-4"
                  v-for="(member, index0) in members"
                  :key="member">
                  <span class="col-7 pt-1">{{ member.user_nickname }}</span>
                  <span class="col-5 p-0">
                    <!-- TODO: 여기를 아이콘으로 바꾸는게 나을 것 같기도.. -->
                    <button
                      type="button"
                      class="btn btn-sm me-1 pro_button"
                      @click="
                        [
                          handleClick(),
                          transPart(index),
                          transIndex(index0),
                          saveMemberValues(),
                          memberModal(),
                          saveTeamDept(),
                          getLeaderRateData()
                        ]
                      ">
                      상세정보
                    </button>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentView from "@/components/CommentView.vue";
import ReviewCarousel from "@/components/ReviewCarousel.vue";
import WriteCommentView from "../components/WriteCommentView.vue";
import CopyToClipboard from "../components/CopyToClipboard.vue";
import ProfileModal from "../components/DetailPageProfileModal.vue";
import { ref } from "vue";

export default {
  name: "ProjectDetailView",
  components: {
    CommentView,
    ReviewCarousel,
    WriteCommentView,
    CopyToClipboard,
    ProfileModal
  },

  data() {
    return {
      memberId: 0,
      leaderRateData: [[]],
      memberRateData: [[]],
      leaderRateAverage: 0,
      leaderRateLength: 0,
      memberRateAverage: 0,
      memberRateLength: 0,
      TeamDept: [],
      leaderCheck: true,
      memberIndex: 0,
      partIndex: 0,
      memberValue: {},
      leaderStack: [],
      leaderDept: [],
      warrantyText: "",
      projectId: null,
      recruitStatus: "모집중",
      progressMethod: "온라인",
      project: {
        leader_user: "",
        project_id: null,
        title: "",
        exp_start_date: "",
        stack_code: [],
        project_contact: "",
        status_code: "",
        warranty: null
      },
      refUrl: [],
      isRefUrl: true,
      projectLeader: {
        user_nickname: "",
        leaderHistory: []
      },
      recruitData: [],
      recruitNumber: null, // 모집인원
      currentMemberList: [],
      /*지원가능여부 FLAG  */
      applyAbleFlag: false
    };
  },
  created() {
    this.userId = this.$store.state.user.user_id;
    this.pageUrl = window.document.location.href;
    this.projectId = this.$route.params.projectId;
    this.getProjectData();
    this.getLeaderData();
    this.getRecruitData();
    this.getRefUrl();
    this.getCurrentMembers();
    this.checkApplyAble();
  },
  setup() {
    const modal = ref(null);
    const result = ref("");
    const handleClick = async () => {
      const ok = await modal.value.show();
      if (ok) {
        result.value = "ok";
      } else {
        result.value = "cancel";
      }
    };
    return {
      modal,
      result,
      handleClick
    };
  },
  methods: {
    memberModal() {
      this.leaderCheck = false;
    },
    leaderModal() {
      this.leaderCheck = true;
    },
    transIndex(value) {
      this.memberIndex = value;
    },
    transPart(value) {
      this.partIndex = value;
    },
    saveTeamDept() {
      this.TeamDept = [];
      if (
        Object.values(this.currentMemberList)[this.partIndex][this.memberIndex]
          .like_dept_code[0] == null
      ) {
        return (this.TeamDept = []);
      } else {
        this.TeamDept = Object.values(this.currentMemberList)[this.partIndex][
          this.memberIndex
        ].like_dept_code;
      }
    },
    saveMemberValues() {
      if (
        Object.values(this.currentMemberList)[this.partIndex][
          this.memberIndex
        ] != null
      ) {
        this.memberValue = Object.values(this.currentMemberList)[
          this.partIndex
        ][this.memberIndex];
        this.memberId = Object.values(this.currentMemberList)[this.partIndex][
          this.memberIndex
        ].applicant_id;
      }
    },

    stackToArray() {
      if (this.projectLeader.like_stack_code.length == 1) {
        this.leaderStack.push(this.projectLeader.like_stack_code);
      } else {
        this.leaderStack = this.projectLeader.like_stack_code.split(",");
      }
    },
    partToArray() {
      if (this.projectLeader.like_dept_code.length == 1) {
        this.leaderDept.push(this.projectLeader.like_dept_code);
      } else if (this.projectLeader.like_dept_code.length != 0) {
        this.leaderDept = this.projectLeader.like_dept_code.split(",");
      }
    },

    setWarrantyText(warranty) {
      if (warranty === -1) {
        return "X";
      } else {
        return warranty + " 원";
      }
    },

    setProgressMethodText(progress_method) {
      if (progress_method === "ON") {
        return "온라인";
      } else if (progress_method === "OFF") {
        return "오프라인";
      }
    },

    getRecruitNumber() {
      // this.recruitData 가지고 처리
      const recData = this.recruitData;
      const len = recData.length;
      let recNum = 0;
      for (let i = 0; i < len; i++) {
        recNum += recData[i].to;
      }
      return recNum;
    },

    async getProjectData() {
      this.project = await this.$get(`/project/recruit/${this.projectId}`);

      this.project.stack_code = await this.project.stack_code.split(","); // string to array
      this.recruitStatus = await this.$setStatusText(this.project.status_code);
      this.warrantyText = await this.setWarrantyText(this.project.warranty);
      this.progressMethod = await this.setProgressMethodText(
        this.project.progress_method
      );
    },
    //모집상세글 ---- 팀리더  정보 가져오기
    async getLeaderData() {
      this.projectLeader = await this.$get(
        `/project/recruit/${this.projectId}/leader`
      );

      const reviewHistory = await this.$get(
        `/project/review/history/${this.projectLeader.user_id}`
      );

      // 유저 상세모달을 위한 데이터
      this.projectLeader.review = reviewHistory;
      this.projectLeader.project = this.projectLeader.leaderHistory;
      this.stackToArray();
      this.partToArray();
      this.getLeaderRateData();
      console.log("this.projectLeader");
      console.log(this.projectLeader);
    },
    //모집상세글----- 팀원 정보 가져오기
    async getCurrentMembers() {
      this.currentMemberList = await this.$get(
        `/project/recruit/${this.projectId}/currentMembers`
      );

      console.log("this.currentMemberList");
      console.log(this.currentMemberList);
    },
    // 모집 인원
    async getRecruitData() {
      this.recruitData = await this.$get(
        `/project/recruit/${this.projectId}/recruit_data`
      );

      // 모집 인원수
      this.recruitNumber = await this.getRecruitNumber();
    },
    async getRefUrl() {
      this.refUrl = await this.$get(
        `/project/recruit/${this.projectId}/ref_url`
      );
      if (this.refUrl.length === 0) {
        this.isRefUrl = false;
      }
    },
    // 지원 가능여부 확인
    async checkApplyAble() {
      /* eslint-disable */
      let data = {};
      data.project_id = this.projectId;
      data.user_id = this.$store.state.user.user_id;

      let result = await this.$post(`/project/recruit/checkApplyAble`, data);
      if (result.data[0].flag == null) {
        this.applyAbleFlag = true;
      }
    },
    // 지원 팝업
    applyProjectAlert(dept_id, dept_code) {
      this.$swal({
        title: `[ ${dept_code} ] 분야에 지원하시겠습니까?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "지원",
        cancelButtonText: "취소"
      }).then((result) => {
        if (result.isConfirmed) {
          this.projectApplyNew(dept_id);
          this.$swal({
            title: "지원 완료",
            text: "지원이 완료되었습니다.",
            icon: "success"
          });
        }
      });
    },

    // 프로젝트 지원
    async projectApplyNew(apply_dept_id) {
      /* eslint-disable */
      if (this.applyAbleFlag) {
        let data = {};
        data.applicant_id = this.$store.state.user.user_id;
        data.project_id = this.projectId;
        data.apply_dept_id = apply_dept_id;
        let result = await this.$post(`/project/recruit/projectApplyNew`, data);
        if (result.status === 200) {
          const self = this;
          setTimeout(function () {
            self.$router.go();
          }, 1000);
        }
      } else {
        // console.log("지원 가능");
        return;
      }
    },
    // 평판데이터
    async getLeaderRateData() {
      if (this.leaderCheck == true) {
        this.leaderRateData = [];
        const RateData = await this.$get(
          `http://127.0.0.1:3000/user/rate/${this.projectLeader.user_id}}`
        );
        this.leaderRateData.push(RateData);
        this.leaderRateAverage = 0;
        this.Rate = 0;
        for (let i = 0; i < this.leaderRateData[0].length; i++) {
          this.Rate += this.leaderRateData[0][i].rate;
        }
        this.leaderRateAverage = (
          this.Rate / this.leaderRateData[0].length
        ).toFixed(1);
        this.leaderRateLength = 0;
        this.leaderRateLength = this.leaderRateData[0].length;
      } else if (this.leaderCheck == false) {
        this.memberRateData = [];
        const RateData0 = await this.$get(
          `http://127.0.0.1:3000/user/rate/${this.memberId}}`
        );
        this.memberRateData.push(RateData0);
        this.memberRateAverage = 0;
        this.Rate = 0;
        for (let i = 0; i < this.memberRateData[0].length; i++) {
          this.Rate += this.memberRateData[0][i].rate;
        }
        this.memberRateAverage = (
          this.Rate / this.memberRateData[0].length
        ).toFixed(1);
        this.memberRateLength = 0;
        this.memberRateLength = this.memberRateData[0].length;
      }
    }
    //       /* eslint-disable */
    //   let flag = confirm("저장하시겠습니까? ");
    //   if(flag){
    //   let data = {};
    //   let project_id = this.selectedProjectId;
    //   // this.params.selectedPage = this.selectedMentoringPage;
    //   //입력 없이 등록 버튼 누르는 경우 예외처리
    //   // 댓글 입력 없이 등록 버튼 누르는 경우 예외처리
    //   data.project = {};
    //   data.project_status = {};
    //   data.project.meeting_url = this.urlAddress;
    //   data.project.meeting_url_title = this.urlTitle;
    //   data.project.status_code = this.teamStatus;
    //   data.project.warranty = this.deposit;
    //   data.project_status.project_id = project_id;
    //   data.project_status.project_status = this.teamStatus;
    //   data.project_status.changer = this.$store.state.user.user_id;

    //   // saveTeamManageInfo
    //   const r = await this.$patch(
    //     // TODO: axios.defaults.baseURL로 변경
    //     `/manage/saveTeamManageInfo/${project_id}`,
    //     data
    //   );
    //   if (r.status === 200) {
    //     this.$router.go();/* refresh  */
    //     }
    //   console.log(this.r);
    // }else{
    //   return;
    // }
    //   // selectedPage가 바뀔 때.에를들어 기존1에서 2를 골랐을 때 색깔 바뀌는 처리 HOW ?
  }
};
</script>
<style lang="scss" scoped>
.widget-box {
  border: 1.5px solid gray;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  text-align: left;
}
.widget-box.desc-project :deep {
  border: none;
  padding: 0;
  * {
    margin-bottom: 0;
    line-height: 1.6em;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
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
