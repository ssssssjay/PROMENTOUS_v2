<template>
  <div>
    <section class="banner">
      <div class="comment container">
        <h1 class="title">팀 관리</h1>
        <p class="des">팀 상태 및 공유링크를 확인하고 팀원/멘토를 평가해요</p>
      </div>
    </section>

    <section class="container">
      <!-- <hr />

      applicants ////
      <div>{{ this.applicants }}</div>
      <hr />
      teamMembers //// {{ this.teamMembers }}
      <hr />
      {{ this.teamTotalInfo.data }}
      <hr />

      <hr /> -->

      <!-- <div>//지원자정보 (배열)>> 팀선택시변경되어야</div> -->

      <!-- <div>멘토정보 (배열)>> 팀선택시변경되어야</div>
      <div>{{ this.mentoring }}</div>
      <div>팀상태</div>
      <div>{{ this.teamStatusList }}</div>
      <div><br /></div>
      <div><br /></div>
      <div><br /></div>-->

      <!--<div>{{ typeof this.projectList }}</div>
      <div>{{ this.projectList[0] }}</div>
      <div><br /></div>
      <div><br /></div>
      <div>프로젝트리스트2</div>
      <div>{{ this.projectList2 }}</div>
      <div>{{ typeof this.projectList2 }}</div>
      <div>{{ this.projectList2[0] }}</div>-->
      <!-- <div>{{ this.teamTotalInfo.data }}</div>
      <hr />
      <div>{{ this.applicants }}</div>

      {{ teamStatus }}
      {{ teamStatusName }} -->

      <!-- <div>//팀원 (배열)>> 팀선택시변경되어야</div> -->

      <!--
      <div>멘토정보 (배열)>> 팀선택시변경되어야</div> -->

      <div class="row">
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

        <!-- 팀모임링크 -->
        <!-- ////////////////////////////////////////////////////////// -->
        <div class="row p-2 mb-5 bd-highlight teamUrl">
          <div class="tab-title">팀모임 링크</div>
          <span
            class="url showurl form-control"
            v-show="correctionMode === false"
            style="width: 500px">
            <span class="me-3">링크제목</span>
            <span>{{ urlTitle }}</span>
          </span>
          <span class="col url m-0" v-show="correctionMode">
            <div class="input-group">
              <span class="input-group-text">링크제목</span>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                v-model="urlTitle" />
            </div>
          </span>
          <span
            class="url showurl form-control"
            v-show="correctionMode === false"
            style="width: 500px">
            <span class="me-3">URL</span>
            <span>{{ urlAddress }}</span>
          </span>
          <span class="col url m-0" v-show="correctionMode">
            <div class="input-group">
              <span class="input-group-text">URL</span>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                v-model="urlAddress" />
            </div>
          </span>
        </div>

        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 팀 STATUS -->

        <div class="p-2 mb-5 d-inline-flex bd-highlight TeamStatus">
          <div class="tab-title">팀 STATUS</div>
          <TeamStatus
            class="TeamStatusSelect"
            v-model="teamStatus"
            placeholder="팀상태를 선택해주세요"
            :options="[
              { value: 'REC', label: '모집중' },
              { value: 'ING', label: '모집완료' },
              { value: 'ADD', label: '추가모집' },
              { value: 'FIN', label: '활동종료' }
            ]"
            v-show="correctionMode === true" />

          <button class="btn btn-primary" v-show="correctionMode === false">
            {{ teamStatusName }}
          </button>
        </div>
        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 진행기간 -->
        <div class="p-2 d-inline-flex mb-5 bd-highlight">
          <div class="tab-title">시작일</div>

          <input
            type="datetime-local"
            class="datepicker"
            v-model="actualStartDate"
            v-show="correctionMode === true" />

          <p v-show="correctionMode === false" class="">
            {{ actualStartDate.slice(0, 10) }}
          </p>
        </div>
        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 보증금 -->
        <div class="p-2 mb-5 d-inline-flex bd-highlight">
          <div class="tab-title">보증금</div>
          <input
            type="number"
            class="deposit form-control"
            v-model="deposit"
            v-show="correctionMode" />
          <div class="deposit" v-show="correctionMode === false">
            {{ deposit }}원
          </div>
        </div>

        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 모집글 링크 -->
        <div class="row p-2 mb-5 bd-highlight">
          <div class="tab-title">모집글 링크</div>
          <span class="col url text-start">
            <router-link
              target="_blank"
              :to="this.path"
              style="text-decoration: none; color: #1379d2"
              ><strong @click="goToProjectDetail(this.selectedProjectId)">
                모집글 링크로
              </strong></router-link
            >
          </span>
        </div>

        <!-- <router-link
          target="_blank"
          :to="this.path"
          style="text-decoration: none; color: #1379d2"
          ><strong @click="goToProjectDetail(this.selectedProjectId)">
            모집글 링크로
          </strong></router-link
        > -->
        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 지원자관리  -->

        <ApplicantProfileModal
          ref="modal4"
          :content="modalContent"
          :applicantData="this.applicants[this.memberIndex]" />
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
                class="applicant text-center card m-2"
                style="width: 240px"
                :key="index"
                v-for="(app, index) in applicants">
                <img
                  v-bind:src="app.userImage"
                  class="card-img-top m-2 userImage"
                  alt="..."
                  @click="
                    [handleClick3(), transIndex(index), applicantModal()]
                  " />

                <h5 class="card-title applicantNickname">
                  {{ app.applicantNickname }}
                </h5>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item applicantAccount">
                    이메일 {{ app.applicantAccount }}
                  </li>
                  <li class="list-group-item insertDate">
                    신청일시 {{ app.insertDate.substr(0, 10) }}
                  </li>
                  <li class="list-group-item">
                    신청분야
                    <button class="btn btn-primary">
                      {{ app.applyDeptCode }}
                    </button>
                  </li>
                  <li class="row list-group-item likeStackCode">
                    관심스택
                    <br />
                    <div>
                      <button
                        class="btn m-1 btn-primary Stack"
                        :key="i"
                        v-for="(stack, i) in applicants[index].likeStackCode">
                        {{ stack }}
                      </button>
                    </div>
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
          :modalData="this.ModalData" />
        <div class="p-2 mb-5 d-inline-flex bd-highlight">
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
                class="applicant text-center card"
                style="width: 240px"
                :key="index"
                v-for="(mem, index) in teamMembers">
                <img
                  v-bind:src="mem.userImage"
                  class="card-img-top mt-2 userImage"
                  alt="..."
                  @click="
                    [handleClick3(), transIndex(index), teamMemberModal()]
                  " />

                <h5 class="card-title applicantNickname">
                  {{ mem.userNickname }}
                </h5>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item applicantAccount">
                    이메일
                    {{ mem.memberEmail }}
                  </li>

                  <li class="list-group-item">
                    역할
                    <button class="btn btn-primary role">
                      {{ mem.role }}
                    </button>
                  </li>
                  <li class="list-group-item userSocialUrl">
                    소셜링크
                    <a
                      href="{{url.address}}"
                      :key="index0"
                      v-for="(url, index0) in teamMembers[index].userSocialUrl"
                      >{{ url.title }}<br />
                    </a>
                  </li>
                  <li class="row list-group-item" style="height: 120px">
                    관심스택
                    <br />
                    <div>
                      <button
                        class="btn m-1 btn-primary Stack"
                        :key="i"
                        v-for="(stack, i) in teamMembers[index].likeStackCode"
                        v-show="stack.length > 0">
                        {{ stack }}
                      </button>
                    </div>
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
          :colors="teamRatingColor" />

        <!-- ---------------------------------------------------------------------------------------------- -->
        <!-- 멘토링  -->

        <!-- <div class="p-2 mb-5 d-inline-flex bd-highlight">
          <div class="mentoringText">
            멘토링
            <div class="mentorRating">
              <button
                class="btn btn-outline-secondary"
                @click="handleClick2"
                v-if="this.FinishMentoring.length > 0">
                멘토평가
              </button>
              <button
                class="btn btn-outline-secondary"
                @click="handleClick2"
                v-else
                disabled>
                멘토평가
              </button>
            </div>
          </div>

          <div class="List mx-5">
            <div class="row">
              <div
                class="col mentoring"
                :key="index2"
                v-for="(men, index2) in mentoring">
                <p class="mentoringName">
                  {{ men.mentorUserId }}멘토님의 {{ men.mentoringTitle }}
                </p>
                <button class="btn btn-primary">
                  <i class="bi bi-check-circle-fill"></i>
                </button>
                <button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus > 1">
                  <i class="bi bi-check-circle-fill"></i>
                </button>
                <button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus == -1">
                  <i class="bi bi-file-excel-fill"></i>
                </button>
                <button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus > 2">
                  <i class="bi bi-check-circle-fill"></i>
                </button>
                <button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus >= 4">
                  <i class="bi bi-check-circle-fill"></i>
                </button>
                <button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus == 5">
                  <i class="bi bi-check-circle-fill"></i></button
                ><button
                  class="btn btn-primary"
                  v-show="men.mentoringStatus != -1 && men.mentoringStatus < 5">
                  <i class="bi bi-circle"></i>
                </button>
                <div class="mentoringStatus">
                  <span>신청중 </span>
                  <span v-show="men.mentoringStatus >= 1">승인됨</span>
                  <span v-show="men.mentoringStatus == -1">반려됨 </span>
                  <span v-show="men.mentoringStatus >= 2">결제진행 </span>
                  <span v-show="men.mentoringStatus >= 3">멘토링중 </span>
                  <span v-show="men.mentoringStatus >= 4">완료 </span>
                </div>
                <div class="mentoringBtn">
                  <button
                    class="btn btn-outline-secondary"
                    v-show="men.mentoringStatus == 4">
                    멘토링종료
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    v-show="men.mentoringStatus > 4"
                    disabled>
                    멘토링종료
                  </button>
                  <button
                    class="ms-1 btn btn-outline-secondary"
                    v-show="men.mentorRating.rated == 'yes'"
                    disabled>
                    평가완료
                  </button>
                </div>
              </div>


              <MentorRatingModal
                ref="modal2"
                :content="modalContent"
                :mentoring="FinishMentoring"
                :colors="mentorRatingColor" />
            </div>
          </div>
        </div> -->
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

export default {
  name: "App",
  components: {
    Status,
    // Project,
    TeamStatus,
    RegisterbtnLayout,
    TeamRatingModal,
    TeamMemberProfileModal
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      ModalData: "empty",
      path: "",
      //db작업 x 변수
      teamStatusName: "",
      memberIndex: 0,
      teamRatingColor: "#ddee4d",
      mentorRatingColor: "#1379d2",
      applicantsList: [],
      btnText: "수정하기",
      btnText2: "저장하기",
      FinishMentoring: [],
      FinishMemberRating: [],
      actualStartDate: "2022-07-18T11:32",
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
          console.log(temp == null);
          console.log(temp == {});
          console.log(typeof temp);
          console.log("=========initUrl 팀 리스트끌고오기 ==========");
          console.log(this.initUrl);
          console.log("=========가져온결과 temp==========");
          console.log(temp);

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
        console.log(this.r);
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
      console.log(data);
      let r = await this.$post(`/project/recruit/projectApplyAccept`, data);
      console.log("승인결과");
      console.log(r);
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
      console.log("거절 선택result");
      console.log(r);
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
      console.log("=========SESSION USERID ==========");
      console.log(this.sessionUserId);
      // 팀STATUS 필드 셀렉박스용
      this.teamStatusList = await this.$get(
        `/common/getTeamStatusListForTeamManage/`
      );

      // 내 SESSIONID기준으로  팀 리스트끌고오기
      this.initUrl = `/manage/getTeamListForManage/`;
      this.initUrl += this.sessionUserId;
      let temp = await this.$get(this.initUrl, {});
      console.log(temp == null);
      console.log(temp == {});
      console.log(typeof temp);
      console.log("=========initUrl 팀 리스트끌고오기 ==========");
      console.log(this.initUrl);
      console.log("=========가져온결과 temp==========");
      console.log(temp);

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

      console.log(this.teamMembers.length);
      for (let i = 0; i < this.teamMembers.length; i++) {
        console.log("============================");
        console.log(this.teamMembers[i].rating);
        if (this.teamMembers[i].rating.rated != "") {
          if (this.teamMembers[i].rating.rated == "no") {
            this.FinishMemberRating.push(this.teamMembers[i]);
          }
        } else {
          this.FinishMemberRating.push([]);
        }
      }
    },
    selected() {
      console.log("SelectedStatus : ", this.SelectedStatus);
      console.log("SelectedProject : ", this.SelectedProject);
    },
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
      console.log(this.selectedProjectId);
      this.projectInfoParams.project_id = this.selectedProjectId;
      // teamTotalInfo .
      console.log(this.projectInfoParams);
      console.log(this.projectInfoParams.project_id);
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
      // this.filterFinishMemberRating();
      this.mentoring = this.teamTotalInfo.data.mentorings;
      this.filterFinishMentoring();
    }
  },
  /*팀개요화면에서 튕겨나가기 */
  exitTeamManage(e) {
    console.log("exitTeamManage 실행");
    console.log(e);
    //alert("자신에게 해당되는 프로젝트가 없습니다. 메인 화면으로 이동합니다. ");
    // TODO : ROUTER PUSH  to main(?)
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
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
.applicantAccount {
  height: 90px;
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
  width: 300px;
  margin: 0px 10px;
}
.url {
  width: 300px;
  margin: 0px;
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
  height: 150px;
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
  height: 650px;
}
.emptyApplicant {
  width: 700px;
  height: 400px;
}
.row.applicantList.bg {
  background-color: gainsboro;
  width: 1300px;
  height: 650px;
  padding: 10px;
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
.userImage {
  width: 200px;
  height: 150px;
}
</style>
