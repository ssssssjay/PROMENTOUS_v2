<template>
  <div>
    <section class="banner">
      <div class="comment container">
        <h1 class="title">팀 관리</h1>
        <p class="des">팀 상태 및 공유링크를 확인하고 팀원/멘토를 평가해요</p>
      </div>
    </section>
    <section class="container">
      <div class="row" v-show="!correctionMode">
        <div class="col select d-inline-block">
          <div class="d-flex select">
            <Status
              class="StatusSelect"
              v-model="selectedStatus"
              :selected="selectedStatus"
              style="width: 200px"
              :options="[
                ...new Set(
                  projectList.map((data) => {
                    return data.statusName;
                  })
                )
              ]"
              :key="componentKey" />
            <select
              name=""
              id=""
              v-model="selectedProjectId"
              :selected="selectedProjectId"
              class="ProjectSelect"
              @change="projectIdSelect()">
              <option
                :value="project.projectId"
                :key="project.projectName"
                v-for="project in projectList.filter(
                  (p) => p.statusName === selectedStatus
                )">
                {{ project.projectName }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>
    <!-- 선택안했을때 보여줄 기본페이지 -->
    <div class="row justify-content-md-center" v-if="selectedProjectId === ''">
      <div class="col-md-auto emptyProject">
        <img class="" src="@/img/emptyProject.jpg" alt="" />
        <p>진행중인 프로젝트가 없습니다</p>
      </div>
    </div>
    <section class="container" v-else>
      <!-- v-if="SelectedProject" -->
      <!-- 선택해서 불러온 프로젝트 내용 -->
      <div class="d-flex flex-column bd-highlight mb-3">
        <!--수정버튼 -->
        <div class="d-flex justify-content-center title"></div>
        <div class="d-flex justify-content-end register">
          <RegisterbtnLayout
            :btnText="btnText"
            v-show="correctionMode === false"
            @click="correction()" />
          <!-- 수정하기 -->
          <RegisterbtnLayout
            :btnText="btnText2"
            v-show="correctionMode"
            @click="[watch(), saveTeamInfo()]" />
          <!--저장하기 -->
        </div>

        <div class="col">
          <div class="content">
            <div class="h4 px-2" style="text-align: left">
              <p class="row title-tab">
                <span class="tab-title col-2">팀 STATUS</span>
                <span class="px-4 col-4 tab-des"
                  ><TeamStatus
                    class="TeamStatusSelect col-3"
                    v-model="teamStatus"
                    placeholder="팀상태를 선택해주세요"
                    :options="[
                      { value: 'REC', label: '모집중' },
                      { value: 'ING', label: '모집완료' },
                      { value: 'ADD', label: '추가모집' },
                      { value: 'FIN', label: '활동종료' }
                    ]"
                    v-show="correctionMode === true" />
                  <button
                    class="btn btn-primary statusname"
                    v-show="
                      correctionMode === false && this.teamStatusName != ''
                    ">
                    {{ teamStatusName }}
                  </button></span
                >
                <span class="tab-title col-2">시작일</span>
                <span class="px-4 col-4 tab-des"
                  ><Datepicker
                    v-model="actualStartDate"
                    :enableTimePicker="false"
                    utc
                    v-show="correctionMode" />
                  <p v-show="correctionMode === false" class="">
                    {{ actualStartDate.slice(0, 10) }}
                  </p></span
                >
              </p>
              <p class="row title-tab">
                <span class="tab-title col-2"> 보증금</span>
                <span class="px-4 col-4 tab-des"
                  ><input
                    type="number"
                    class="deposit form-control"
                    v-model="deposit"
                    v-show="correctionMode" />
                  <div class="deposit" v-show="correctionMode === false">
                    {{ deposit }}원
                  </div></span
                >
                <span class="tab-title col-2">모집글 링크</span>
                <span class="px-4 col tab-des"
                  ><span class="col url text-start">
                    <router-link
                      target="_blank"
                      :to="this.path"
                      style="text-decoration: none; color: #1379d2"
                      ><strong
                        @click="goToProjectDetail(this.selectedProjectId)">
                        모집글 링크로
                      </strong></router-link
                    >
                  </span></span
                >
              </p>

              <p class="row title-tab">
                <span class="tab-title col-2">팀모임 링크</span>
                <span class="px-4 col tab-des">
                  <span v-if="!correctionMode">
                    <span class="me-3">{{ urlTitle }} </span>
                    <a
                      :href="this.urlAddress"
                      target="_blank"
                      class="urlAddress"
                      >{{ urlAddress }}</a
                    >
                  </span>

                  <span v-if="correctionMode">
                    <span class="input-group" style="width: 800px">
                      <span class="input-group-text">링크제목</span>
                      <input
                        type="text"
                        aria-label="First name"
                        class="form-control me-3"
                        v-model="urlTitle" />
                      <span class="input-group-text">URL</span>
                      <input
                        type="text"
                        aria-label="First name"
                        class="form-control"
                        v-model="urlAddress" />
                    </span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 지원자관리  -->

        <div class="applicantPage p-2 mb-5 d-inline-flex bd-highlight">
          <div class="tab-title">지원자관리</div>

          <div class="row">
            <div v-show="this.applicants[0] == null">
              <img class="emptyApplicant" src="@/img/applicant.jpg" alt="" />
              <p style="text-align: center; font-size: 25px">
                현재 지원자가 없습니다
              </p>
            </div>
            <div
              class="row applicantList bg"
              v-show="this.applicants[0] != null">
              <div
                class="applicantCard text-start card m-2"
                @click="
                  [
                    transIndex(index),
                    getApplicantRateData(),
                    handleClick3(),
                    applicantModal()
                  ]
                "
                :key="index"
                v-for="(app, index) in applicants">
                <div class="profile">
                  <img v-bind:src="app.userImage" class="userImage" alt="..." />
                  <p class="applicantNickname">
                    {{ app.applicantNickname }}
                  </p>
                  <p class="Dept">{{ app.applyDeptCode }}</p>
                </div>

                <ul class="content">
                  <li class="mb-3">
                    <i class="bi bi-envelope-fill me-2"></i
                    >{{ app.applicantAccount }}
                  </li>
                  <li class="mb-3">
                    <i class="bi bi-calendar-fill me-2"></i>
                    {{ app.insertDate.substr(0, 10) }}
                  </li>

                  <li class="row likeStackCode">
                    <span
                      v-show="
                        applicants[index].likeStackCode != null &&
                        applicants[index].likeStackCode.length != 0
                      ">
                      <i class="bi bi-bookmark-check-fill">
                        <button
                          class="btn m-1 btn-primary Stack"
                          :key="i"
                          v-for="(stack, i) in userStackCode[index]">
                          {{ stack }}
                        </button>
                        <span
                          v-show="
                            applicants[index].likeStackCode != null &&
                            applicants[index].likeStackCode.length > 3
                          ">
                          +{{ userStackNumber[index] }}
                        </span>
                      </i>
                    </span>
                    <span
                      v-show="
                        applicants[index].likeStackCode == null ||
                        applicants[index].likeStackCode.length == 0
                      ">
                      <i class="bi bi-bookmark-check-fill me-2"> </i>
                      <span>등록된 관심스택이 없습니다</span>
                    </span>
                  </li>
                </ul>
                <div class="card-body">
                  <button
                    class="btn m-1 btn-primary"
                    @click="approve(index)"
                    v-show="app.applyStatus == 'NEW'">
                    승인
                  </button>
                  <button
                    class="btn m-1 btn-primary"
                    @click="reject(index)"
                    v-show="app.applyStatus == 'NEW'">
                    거절
                  </button>
                  <button
                    class="btn m-1 btn-primary"
                    v-show="app.applyStatus == 'ACC'">
                    승인됨
                  </button>
                  <button
                    class="btn m-1 btn-primary"
                    v-show="app.applyStatus == 'REJ'">
                    거절됨
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 모달 -->
        <!-- ////////////////////////////////////////////////////////// -->

        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 팀원  -->
        <TeamMemberProfileModal
          ref="modal3"
          :memberData="this.teamMembers[this.memberIndex]"
          :applicantData="this.applicants[this.memberIndex]"
          :applicantRate="this.applicantRate"
          :applicantAverageRate="this.applicantAverageRate"
          :memberRate="this.memberRate"
          :memberAverageRate="this.memberAverageRate"
          :modalData="this.ModalData" />

        <div class="mb-5 p-2 d-inline-flex bd-highlight">
          <div class="memberText">
            <div class="tab-title">팀원정보</div>
            <div class="memberRating">
              <button
                class="btn m-1 btn-primary"
                @click="handleClick"
                v-if="this.teamStatus == 'FIN'">
                팀원평가
              </button>
              <button
                v-else
                class="btn m-1 btn-primary"
                @click="handleClick"
                disabled>
                팀원평가
              </button>
            </div>
          </div>

          <div class="row">
            <div class="row applicantList bg">
              <div
                class="applicantCard text-start card m-2"
                @click="
                  [
                    handleClick3(),
                    transIndex(index),
                    teamMemberModal(),
                    getMemberRateData()
                  ]
                "
                :key="index"
                v-for="(app, index) in teamMembers">
                <div class="profile">
                  <img v-bind:src="app.userImage" class="userImage" alt="..." />
                  <p class="applicantNickname">
                    {{ app.userNickname }}
                  </p>
                  <p class="Dept">{{ app.role }}</p>
                </div>

                <ul class="content">
                  <li class="mb-3">
                    <i class="bi bi-envelope-fill me-2"></i
                    >{{ app.memberEmail }}
                  </li>

                  <li class="row likeStackCode">
                    <span
                      v-show="
                        teamMembers[index].likeStackCode != null &&
                        teamMembers[index].likeStackCode.length != 0
                      ">
                      <i class="bi bi-bookmark-check-fill me-2"></i>
                      <button
                        class="btn m-1 btn-primary Stack"
                        :key="i"
                        v-for="(stack, i) in memberStackCode[index]">
                        {{ stack }}
                      </button>
                      <span
                        v-show="
                          teamMembers[index].likeStackCode != null &&
                          teamMembers[index].likeStackCode.length > 3
                        ">
                        +{{ memberStackNumber[index] }}
                      </span>
                    </span>

                    <span
                      v-show="
                        teamMembers[index].likeStackCode == null ||
                        teamMembers[index].likeStackCode.length == 0
                      ">
                      <i class="bi bi-bookmark-check-fill me-2"> </i>
                      <span>등록된 관심스택이 없습니다</span>
                    </span>
                  </li>
                  <li>
                    <span v-show="teamMembers[index].userSocialUrl.length > 0">
                      <i class="bi bi-globe me-1"></i>
                      <a
                        class="url me-2"
                        :href="url.address"
                        target="_blank"
                        :key="index0"
                        style="text-decoration: none"
                        v-for="(url, index0) in teamMembers[index]
                          .userSocialUrl"
                        >{{ url.title }}
                      </a>
                    </span>
                    <span
                      class="emptyUrl"
                      v-show="teamMembers[index].userSocialUrl.length == 0">
                      <i class="bi bi-globe me-1"></i> 등록된 소셜링크가
                      없습니다
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <TeamRatingModal
          ref="modal"
          :content="modalContent"
          :teammember="FinishMemberRating"
          :colors="teamRatingColor"
          :selectedProjectId="selectedProjectId" />
      </div>
    </section>
  </div>
</template>
<script>
import Status from "@vueform/multiselect";
// import Project from "@vueform/multiselect";
import TeamStatus from "@vueform/multiselect";
import RegisterbtnLayout from "../components/layouts/RegisterbtnLayout.vue";
import { ref } from "vue";
import TeamRatingModal from "@/components/TeamRatingModal.vue";
// import MentorRatingModal from "@/components/MentorRatingModal.vue";
import TeamMemberProfileModal from "@/components/UserProfileModal.vue";
import Datepicker from "@vuepic/vue-datepicker";

export default {
  name: "App",
  components: {
    Status,
    // Project,
    TeamStatus,
    RegisterbtnLayout,
    TeamRatingModal,
    TeamMemberProfileModal,
    Datepicker
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      memberStackCode: [],
      memberStackNumber: [],
      userStackCode: [],
      userStackNumber: [],
      Rate: 0,
      applicantAverageRate: 0,
      applicantRate: [[]],
      memberAverageRate: 0,
      memberRate: [[]],
      memberList: [],
      applicantList: [],
      ModalData: "empty",
      path: "",
      //db작업 x 변수
      teamStatusName: "모집중",
      memberIndex: 0,
      teamRatingColor: "#FFB800",
      mentorRatingColor: "#1379d2",
      applicantsList: [],
      btnText: "수정하기",
      btnText2: "저장하기",
      FinishMentoring: [],
      FinishMemberRating: [],
      actualStartDate: "2022-08-20",
      selectedStatus: "",

      datetime: "2011-08-03tdst324324234234",
      correctionMode: false,
      projectList2: [],
      projectList: [],

      projectid: "",
      urlAddress: "",
      urlTitle: "",
      teamStatus: "",

      deposit: 0,
      recruitingUrl: "https://www.naver.com",
      applicants: [
        {
          userImage: "",
          applyAdminId: "", // 무얼 위한 변수인지??
          applicantId: "",
          applicantNickName: "",
          applicantAccount: "evelo0702@gmail.com",
          likeStackCode: ["Javascript", "Java", "Python", "Node"],
          applyDeptId: "백엔드",
          applyStatus: "NEW",
          insertDate: "2022.07.02"
        }
      ],
      teamMembers: [
        {
          userImage: "",
          memberId: "",
          userNickname: "aa",
          memberEmail: "evelo0702@gmail.com",
          userSocialUrl: [
            {
              title: "기술블로그",
              address: "주소"
            },
            {
              title: "깃허브",
              address: "주소"
            }
          ],
          role: "백엔드",
          likeStackCode: ["Javascript", "Java", "Python", "Node"],
          rating: [{ comment: "c", score: 4, rated: "yes" }]
        }
      ],
      mentoring: [
        {
          mentoringId: "",
          mentorUserId: "evelo",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: "5",
          mentorRating: { comment: "a", score: 1, rated: "yes" }
        }
      ],
      //paging 처리 위한 object
      mentoringTotalPageCount: 0,
      projectInfoParams: {
        project_id: "", //"1",
        mentoring_page: "", //"1"
        sessionUserId: ""
      },
      params: {},
      /*저장용 saveParam OBJECT */
      saveParam: {},
      teamTotalInfo: {},
      sessionUserId: "",
      initUrl: "",
      componentKey: 0,
      selectedProjectId: "",
      projectId: ""
    };
  },
  setup() {
    const modal = ref(null);
    const modal2 = ref(null);
    const modal3 = ref(null);

    const modalContent = ref(["코멘트와 평점을 입력해주세요"]);
    const result = ref("");
    const result2 = ref("");
    const result3 = ref("");

    const handleClick = async () => {
      const ok = await modal.value.show();
      if (ok) {
        result.value = "ok";
      } else {
        result.value = "cancel";
      }
    };
    const handleClick2 = async () => {
      const ok = await modal2.value.show();
      if (ok) {
        result2.value = "ok";
      } else {
        result2.value = "cancel";
      }
    };
    const handleClick3 = async () => {
      const ok = await modal3.value.show();
      if (ok) {
        result3.value = "ok";
      } else {
        result3.value = "cancel";
      }
    };

    return {
      modal,
      modal2,
      modal3,

      modalContent,
      result,
      result2,
      result3,

      handleClick,
      handleClick2,
      handleClick3
    };
  },
  created() {
    /* 로그인 한 계정 USERID 심어주는 부분! 여기에 3, 22,20 등을 넣어서
    확인하고픈 userId 처리가능합니다. */
    this.sessionUserId = this.user.user_id;
    //user from computed()
    // this.sessionUserId = 20;
  },
  beforeMount() {},
  mounted() {
    // this.filterStatusCode();
    this.managePageInit();
  },
  unmounted() {},
  methods: {
    applicantModal() {
      this.ModalData = "applicant";
    },
    teamMemberModal() {
      this.ModalData = "teammember";
    },
    goToProjectDetail(id) {
      window.scrollTo(0, 0);
      this.path = `/project/recruit/${id}`;
    },
    goToReviewDetail(id) {
      window.scrollTo(0, 0);
      this.path = `/project/review/${id}`;
    },
    changeStatusName() {
      if (this.teamStatus == "REC") {
        this.teamStatusName = "모집중";
      } else if (this.teamStatus == "ING") {
        this.teamStatusName = "모집완료";
      } else if (this.teamStatus == "ADD") {
        this.teamStatusName = "추가모집";
      } else if (this.teamStatus == "FIN") {
        this.teamStatusName = "활동종료";
      }
    },

    async saveTeamInfo() {
      /* eslint-disable */
      let flag = confirm("저장하시겠습니까? ");
      if (flag) {
        let data = {};
        let project_id = this.selectedProjectId;
        // this.params.selectedPage = this.selectedMentoringPage;
        //입력 없이 등록 버튼 누르는 경우 예외처리
        // 댓글 입력 없이 등록 버튼 누르는 경우 예외처리
        data.project = {};
        data.project_status = {};
        data.project.meeting_url = this.urlAddress;
        data.project.meeting_url_title = this.urlTitle;
        data.project.status_code = this.teamStatus;
        data.project.warranty = this.deposit;
        data.project_status.project_id = project_id;
        data.project_status.project_status = this.teamStatus;
        data.project_status.changer = this.$store.state.user.user_id;
        // saveTeamManageInfo
        const r = await this.$patch(
          // TODO: axios.defaults.baseURL로 변경
          `/manage/saveTeamManageInfo/${project_id}`,
          data
        );
        if (r.status === 200) {
          let temp = await this.$get(this.initUrl, {});

          /* refresh 프로젝트 리스트    */
          this.projectList = [];
          if (temp.length == 1) {
            this.projectList = temp;
          } else {
            temp.forEach((element) => {
              this.projectList.push(element);
            });
          }
          this.selectedStatus = this.projectList[0].statusName;
          /* refresh 프로젝트 내용   */
          this.projectIdSelect();
        }
      } else {
        return;
      }
      // selectedPage가 바뀔 때.에를들어 기존1에서 2를 골랐을 때 색깔 바뀌는 처리 HOW ?
    },
    async approve(index) {
      this.applicantsList[index].applyStatus = "ACC";
      let data = {};
      data.applicant_id = this.applicantsList[index].applicantId;
      data.project_id = this.applicantsList[index].projectId;
      data.apply_dept_id = this.applicantsList[index].applyDeptId;
      data.apply_status = this.applicantsList[index].applyStatus;
      let r = await this.$post(`/project/recruit/projectApplyAccept`, data);
      if (r.status === 200) {
        this.projectIdSelect(); /* refresh  */
      }
    },

    async reject(index) {
      this.applicantsList[index].applyStatus = "REJ";
      let data = {};
      data.applicant_id = this.applicantsList[index].applicantId;
      data.project_id = this.applicantsList[index].projectId;
      data.apply_dept_id = this.applicantsList[index].applyDeptId;
      data.apply_status = this.applicantsList[index].applyStatus;
      let r = await this.$post(`/project/recruit/projectApplyReject`, data);
      if (r.status === 200) {
        this.projectIdSelect(); /* refresh  */
      }
    },
    transIndex(index) {
      this.memberIndex = index;
    },
    modalOn() {
      this.modalStatus = true;
    },
    modalOff() {
      this.modalStatus = false;
    },
    /*managePageInit  페이지 최초 실행 시  동작하는 로직  */
    async managePageInit() {
      // 팀STATUS 필드 셀렉박스용
      this.teamStatusList = await this.$get(
        `/common/getTeamStatusListForTeamManage/`
      );

      // 내 SESSIONID기준으로  팀 리스트끌고오기
      this.initUrl = `/manage/getTeamListForManage/`;
      this.initUrl += this.sessionUserId;
      let temp = await this.$get(this.initUrl, {});

      // 내연관 팀들 배열 중에서
      // 첫번째 값(DEFAULT) 으로 팀정보 다끌고오기위한 처리
      this.projectList = [];
      try {
        if (temp.length == 1) {
          this.projectList = temp;
        } else {
          temp.forEach((element) => {
            this.projectList.push(element);
          });
        }

        this.selectedStatus = this.projectList[0].statusName;
        this.selectedProjectId = this.projectList[0].projectId;
        this.projectInfoParams.project_id = this.selectedProjectId;
        this.projectInfoParams.sessionUserId = this.sessionUserId;
        this.projectIdSelect(); /* 팀개요 정보 다가져옴. */
      } catch (e) {
        exitTeamManage(e);
      }
    },
    filterApplicant() {
      let temp = [];
      for (let i = 0; i < this.applicants.length; i++) {
        if (this.applicants[i].applyStatus == "NEW") {
          temp.push(this.applicants[i]);
        }
      }
      this.applicantsList = temp;
    },
    filterFinishMentoring() {
      this.FinishMentoring = [];
      for (let i = 0; i < this.mentoring.length; i++) {
        if (
          this.mentoring[i].mentoringStatus == "5" &&
          this.mentoring[i].mentorRating[0].rated == "no"
        ) {
          this.FinishMentoring.push(this.mentoring[i]);
        }
      }
    },

    filterFinishMemberRating() {
      this.FinishMemberRating = [];
      for (let i = 0; i < this.teamMembers.length; i++) {
        if (
          this.teamMembers[i].rating[0].comment.length == 0 &&
          this.teamMembers[i].userId !== this.sessionUserId
        ) {
          this.FinishMemberRating.push(this.teamMembers[i]);
        }
      }
    },
    selected() {},
    deselected() {
      this.SelectedProject = "";
    },
    correction() {
      this.correctionMode = true;
    },
    watch() {
      this.correctionMode = false;
    },

    getMentorTxt: function (txt) {
      this.MentorRatingComment = txt;
    },
    getMentorRating: function (rating) {
      this.MentorRatingScore = rating;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    stringToArray(string) {
      return string.split(",");
    },
    async getApplicantRateData() {
      this.applicantRate = [];
      const RateData = await this.$get(
        `http://127.0.0.1:3000/user/rate/${
          this.applicantList[this.memberIndex]
        }`
      );
      this.applicantRate.push(RateData);
      this.applicantAverageRate = 0;
      this.Rate = 0;
      for (let i = 0; i < this.applicantRate[0].length; i++) {
        this.Rate += this.applicantRate[0][i].rate;
      }
      this.applicantAverageRate = (
        this.Rate / this.applicantRate[0].length
      ).toFixed(1);
    },
    filterApplicantRate() {
      this.applicantList = [];
      for (let i = 0; i < this.applicants.length; i++) {
        this.applicantList.push(this.applicants[i].applicantId);
      }
    },
    async getMemberRateData() {
      this.memberRate = [];
      const RateData = await this.$get(
        `http://127.0.0.1:3000/user/rate/${this.memberList[this.memberIndex]}`
      );
      this.memberRate.push(RateData);
      this.memberAverageRate = 0;
      this.Rate = 0;
      for (let i = 0; i < this.memberRate[0].length; i++) {
        this.Rate += this.memberRate[0][i].rate;
      }
      this.memberAverageRate = (this.Rate / this.memberRate[0].length).toFixed(
        1
      );
    },
    filterMemberRate() {
      this.memberList = [];
      for (let i = 0; i < this.teamMembers.length; i++) {
        this.memberList.push(this.teamMembers[i].userId);
      }
    },
    filterStackCode() {
      this.userStackCode = [];
      this.memberStackCode = [];
      this.userStackNumber = [];
      this.memberStackNumber = [];

      for (let i = 0; i < this.applicants.length; i++) {
        if (
          this.applicants[i].likeStackCode == null ||
          this.applicants[i].likeStackCode.length <= 3
        ) {
          this.userStackCode.push(this.applicants[i].likeStackCode);
          this.userStackNumber.push(0);
        } else if (this.applicants[i].likeStackCode.length > 3) {
          this.userStackCode.push(this.applicants[i].likeStackCode.slice(0, 2));
          this.userStackNumber.push(
            this.applicants[i].likeStackCode.length - 2
          );
        }
      }

      for (let j = 0; j < this.teamMembers.length; j++) {
        if (
          this.teamMembers[j].likeStackCode == null ||
          this.teamMembers[j].likeStackCode.length <= 3
        ) {
          this.memberStackCode.push(this.teamMembers[j].likeStackCode);
          this.memberStackNumber.push(0);
        } else if (this.teamMembers[j].likeStackCode.length > 3) {
          this.memberStackCode.push(
            this.teamMembers[j].likeStackCode.slice(0, 2)
          );
          this.memberStackNumber.push(
            this.teamMembers[j].likeStackCode.length - 2
          );
        }
      }
    },

    // 페이지 클릭시점에 멘토링정보 끌고오는 메서드
    //  DB에서 받은 정보는 :: this.mentoring 에 꽃힌다
    async getMentoringsBySelectedPage() {
      this.params.project_id = this.selectedProjectId;
      this.params.selectedPage = this.selectedMentoringPage;
      // mentoringInfo 가져오고 filter동작시킬 것!
      this.mentoring = await this.$post(
        // TODO: axios.defaults.baseURL로 변경
        `/manage/getMentoringsBySelectedPage`,
        this.params
      );
      this.filterFinishMentoring();
      this.selectedMentoringPage = this.params.selectedPage;
      // selectedMentoringPage가 바뀔 때.에를들어 기존1에서 2를 골랐을 때 색깔 바뀌는 처리 HOW ?
    },

    // 선택 하는 순간에 해당 project 정보 teamTotalInfo 끌어옴
    async projectIdSelect() {
      this.projectInfoParams.project_id = this.selectedProjectId;
      // teamTotalInfo .
      this.teamTotalInfo = await this.$post(
        // TODO: axios.defaults.baseURL로 변경
        `/manage/getProjectInfo`,
        this.projectInfoParams
      );
      /*TODO 데이터 가져온 이후 처리 - 필드 별 메서드화 진행TRY */

      this.teamStatus = this.teamTotalInfo.data.basicInfo.statusCode;
      this.changeStatusName();
      // 팀모임 URL
      this.urlTitle = this.teamTotalInfo.data.basicInfo.meetingUrlTitle;
      this.urlAddress = this.teamTotalInfo.data.basicInfo.meetingUrl;
      //보증금
      if (this.teamTotalInfo.data.basicInfo.warranty == -1) {
        this.deposit = 0;
      } else {
        this.deposit = this.teamTotalInfo.data.basicInfo.warranty;
      }

      //지원자정보 (배열)
      this.applicants = this.teamTotalInfo.data.applicants;

      this.filterApplicant();
      //멤버정보 (배열)
      let array = [];
      if (typeof this.teamTotalInfo.data.members == "object") {
        for (
          let index = 0;
          index < this.teamTotalInfo.data.members.length;
          index++
        ) {
          const element = this.teamTotalInfo.data.members[index];

          array.push(this.teamTotalInfo.data.members[index]);
        }
        this.teamMembers = array;
      }
      this.teamMembers = this.teamTotalInfo.data.members;
      this.filterFinishMemberRating();
      this.mentoring = this.teamTotalInfo.data.mentorings;
      this.filterFinishMentoring();
      this.filterApplicantRate();
      this.filterMemberRate();
      this.filterStackCode();
    }
  },
  /*팀개요화면에서 튕겨나가기 */
  exitTeamManage(e) {
    //alert("자신에게 해당되는 프로젝트가 없습니다. 메인 화면으로 이동합니다. ");
    // TODO : ROUTER PUSH  to main(?)
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
a {
  color: black;
}
ul {
  padding: 0px;
}
.urlAddress {
  display: inline-block;
}
.tab-des {
  font-size: 18px;
}
.multiselect.is-active {
  box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #1379d2);
}
.multiselect-tag {
  background: var(--ms-tag-bg, #1379d2);
}
.multiselect-group-label.is-selected {
  background: var(--ms-group-label-bg-selected, #1379d2);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-group-label.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #1379d2);
  color: var(--ms-group-label-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-group-label-bg-selected, #1379d2);
  color: var(--ms-group-label-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #1379d2);
  color: var(--ms-group-label-color-selected-pointed, #fff);
}
</style>
<style scoped>
.tab-title {
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  padding: 0px;
}
.ProjectSelect {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 400px;
}

.ProjectSelect:focus {
  box-shadow: 0 0 0 var(--ms-ring-width, 3px) var(--ms-ring-color, #1379d2);

  border: 0px;
}

.banner {
  margin-bottom: 42px;
  height: 200px;
  background-color: #1379d2;
}
.comment {
  padding-top: 50px;
  color: white;
  font-weight: 900;
}
.select {
  float: right;
}
.StatusSelect,
.ProjectSelect {
  margin: 0;
}
.d-flex {
  column-gap: 12px;
}
.d-flex.select {
  justify-content: flex-end;
}
div.title {
  font-size: 30px;
  margin-top: 10px;
}
.applicantNickname {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

/* 유저카드 */

.profile {
}
.userImage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
}
.applicantCard {
  display: flex;
  border-radius: 15px;
  border: 3px solid #dce8f3;
  height: 500px;
  width: 260px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.applicantCard:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.Dept {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
.goToProfile {
  width: 100%;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
}
.content {
}

section.container {
  margin-bottom: 10px;
}
div.register {
  margin-top: 10px;
}
.noData {
  display: block;
  height: 300px;
}
.teamUrl > span {
  margin: 10px;
}
span.url.showurl {
  margin: 0px 10px;
}
.urlTtitle {
  width: 100px;
}

.url > span:first-child {
  font-size: 14px;
}
.TeamStatusSelect {
  width: 300px;
  margin: 0px;
}

.TeamStatus > button {
}
.deposit {
  width: 300px;
  margin: 0px;
}
.teamMember {
}
div.applicantList {
  max-width: 1000px;
  overflow-x: auto;
  flex-wrap: nowrap;
}
.Stack {
  font-size: 12px;
}
.likeStackCode {
  height: 50px;
}
.List {
  max-width: 950px;
  height: 400px;
  background-color: gainsboro;
  overflow-x: auto;
  flex-wrap: nowrap;
}

div.col.mentoring {
  width: 470px;
  height: 160px;
  display: flex;
  flex: 0 0 0%;
  background: white;
  margin: 10px;
  padding-left: 30px;
  align-items: center;
  position: relative;
}

.List > div {
  height: auto;
  --bs-gutter-x: auto;
}
.mentoring > button {
  margin-right: 20px;
  margin-left: 20px;
}

.mentoringName {
  position: absolute;
  bottom: 100px;
  font-weight: bold;
  font-size: 20px;
}
.mentoringStatus {
  position: absolute;
  top: 100px;
  left: 55px;
  font-size: 12px;
}
.mentoringStatus > span {
  margin-right: 40px;
}
.mentoringStatus > span:nth-child(2) {
  margin-right: 40px;
}
.mentoringStatus > span:nth-child(4) {
  margin-right: 40px;
}
.mentoringStatus > span:nth-child(5) {
  margin-right: 40px;
}

.mentoringBtn {
  position: absolute;
  top: 120px;
  left: 275px;
  font-size: 12px;
}
.mentoringBtn > button {
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 12px;
}
button.btn.btn-primary {
  background-color: #1379d2;
  border-color: #1379d2;
}

.emptyProject {
  min-width: 1400;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.emptyProject > img {
  width: 400px;
  height: 400px;
}
.emptyProject > p {
  font-size: 24px;
  font-weight: bold;
}
.partTo > input {
  display: inline;
  margin-right: 5px;
}
.userSocialUrl {
  height: 150px;
}
.userSocialUrl > a {
  display: block;
}
p.form-control {
  width: 200px;
  display: inline-block;
  margin-right: 5px;
}
.applicantPage {
  width: 1300px;
  height: 550px;
}
.emptyApplicant {
  width: 700px;
  height: 400px;
}
.row.applicantList.bg {
  width: 1300px;
  height: 550px;
}
.mentoringText {
  position: relative;
}
.mentorRating {
  position: absolute;
  width: 100px;
  left: -10px;
}
.memberText {
  position: relative;
}
.memberRating {
  position: absolute;
  width: 100px;
  left: -10px;
}

.statusname {
  width: 100px;
}
.title-tab:first-child {
  margin: 0px 0px 35px 0px;
}
.title-tab {
  margin: 70px 0px;
}
</style>
