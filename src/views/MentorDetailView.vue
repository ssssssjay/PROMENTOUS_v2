<template>
  <!-- 유저 프로필 모달 영역 -->
  <div>
    <!-- 배너 -->
    <div>
      <section class="banner">
        <div class="comment container">
          <h1 class="title">멘토</h1>
          <p class="des">멘토 상세정보를 확인해보세요.</p>
        </div>
      </section>
      <div class="container mt-5">
        <!-- 상단 -->
        <div class="top">
          <!-- {{ mentorData }} -->
          <p class="row">
            <span class="col-9 h2"
              ><strong v-show="infoStatus">{{ title }}</strong>
              <input
                class="form-control form-control-lg"
                type="text"
                :placeholder="title"
                aria-label=".form-control-lg example"
                style="width: 400px"
                v-model="title"
                v-show="editStatus" />
              <!-- <button
                class="btn btn-outline-dark mx-4 px-4"
                v-show="applyYes"
                @click="goToApply('/mentoringapply')">
                <strong>신청하기!</strong>
              </button> -->
              <button
                class="btn btn-outline-dark mx-4 px-4"
                disabled
                v-show="applyNo">
                신청 불가
              </button>
              <button
                class="btn btn-dark px-4"
                @click="changeApplyStatus"
                v-show="editStatus">
                신청 상태 전환
              </button>
            </span>
            <span class="col-3 text-end mt-2">
              <copy-to-clipboard :pageUrl="pageUrl" />
              <!-- <button class="btn btn-outline-primary mx-4">링크복사</button> -->
              <!-- <button
                class="btn btn-outline-primary"
                @click="changeStatus"
                v-show="infoStatus">
                수정하기</button
              > -->
              <button
                class="btn btn-primary"
                @click="changeStatus"
                v-show="editStatus">
                저장하기
              </button></span
            >
          </p>
          <hr />
          <span
            class="stack-icon mx-2"
            style="width: auto"
            v-for="(part, index) in likePart"
            :key="index"
            >{{ part }}</span
          >
        </div>
        <!-- 멘토정보 -->
        <div class="row mt-5">
          <div class="col-2 text-center">
            <img
              v-bind:src="mentor.image"
              alt=""
              style="width: 120px; border-radius: 10%" />
            <div class="mt-2 h4">
              <strong>{{ mentor.nickname }}</strong>
            </div>
            <div>
              <button class="btn btn-outline-primary">
                <i class="bi bi-star-fill pro_star_color"></i>
                {{ mentor.score }} / ({{ mentor.scoreCount }})
              </button>
            </div>
          </div>
          <div class="col text-start px-4">
            <p class="h2"><strong>최근후기</strong></p>
            <div class="col" style="height: 160px; overflow: auto">
              <div
                data-bs-spy="scroll"
                data-bs-target="#list-example"
                data-bs-offset="0"
                class="scrollspy-example col h5 mb-3 ellipsis"
                tabindex="0"
                v-for="(num, i) in reputations"
                :key="i">
                <i
                  class="bi bi-star-fill pro_star_color"
                  v-for="(n, i) in parseInt(num.score)"
                  :key="i"></i>
                {{ num.comment }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <hr />
        </div>
        <!-- 자기소개/경력 -->
        <div class="selfInfo mt-5">
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label h3 text-center"
              ><strong>멘토 경력 및 자기소개</strong></label
            >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="selfInfo"
              v-show="editStatus"></textarea>
            <p class="h5" v-show="infoStatus">{{ selfInfo }}</p>
          </div>
        </div>
        <div class="mt-5">
          <hr />
        </div>
        <!-- 하단부 -->
        <div class="bottom mt-5">
          <div class="row">
            <div class="col-2 h3"><strong>멘토링 이력</strong></div>
            <div
              class="col text-start px-0 h5"
              style="height: 95px; overflow: auto">
              <div class="mb-3" v-for="(mentoring, i) in mentorings" :key="i">
                <a
                  :href="mentoring.href"
                  style="text-decoration: none; color: #1379d2"
                  ><strong>{{ mentoring.name }}</strong></a
                >
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <span class="col-2 text-start h3"><strong>참고링크</strong></span>
            <div class="col partTo" v-show="editStatus">
              <input
                type="text"
                class="form-control"
                style="width: 200px"
                placeholder="링크 이름"
                v-model="url.url_title" />

              <input
                type="text"
                class="form-control"
                style="width: 300px"
                placeholder="링크 주소"
                v-model="url.url_address" />
              <button type="button" class="btn btn-secondary" @click="addUrl()">
                추가
              </button>
              <div
                class="row"
                v-for="(url, index) in url_list"
                :key="index"
                v-show="editStatus">
                <div class="col partTo">
                  <p class="form-control mb-1">
                    {{ url_list[index].url_title }}
                  </p>
                  <p class="form-control mb-1" style="width: 300px">
                    {{ url_list[index].url_address }}
                  </p>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="delURL(index)">
                    X
                  </button>
                </div>
              </div>
            </div>
            <span class="col-10 text-start h5" v-show="infoStatus">
              <a
                target="_blank"
                class="px-4 mx-0 text-start"
                style="color: #1379d2"
                :href="`${url_list[index].url_address}`"
                :key="index"
                v-for="(url, index) in url_list"
                ><strong>{{ url_list[index].url_title }}</strong></a
              >
            </span>
          </div>
        </div>
        <div class="mt-5">
          <hr />
        </div>
        <!-- 댓글 -->
      </div>
    </div>
  </div>
</template>

<script>
import CopyToClipboard from "../components/CopyToClipboard.vue";
export default {
  components: { CopyToClipboard },

  data() {
    return {
      url: { url_title: "", url_address: "" },
      url_list: [],
      /*김인호 백단작업중 추가 mentorUserId , mentorData */
      mentorUserId: 47, // <<<--- 라우터 푸시? 로 들어온 내가 보고있는 멘토의 user_id
      mentorData: {},
      title: "프론트하드코딩임..'최강' 캡틴안산의 Vue 멘토링",
      likePart: ["프론트엔드", "백엔드", "모바일"],
      mentor: { nickname: "joansdev", score: "4.5", scoreCount: "15" },
      mentorInfoId: "1",
      reputations: [
        {
          score: "4",
          comment:
            "프론트하드코딩임..이해했다고 말씀드려도, 정말 이해했는지 직접 확인해보고 넘어가주십니다. 그리고 또"
        },
        {
          score: "2.5",
          comment: "프론트하드코딩임..자기주장이 많이 강한 편이신 것 같아요 ^^"
        },
        {
          score: "5",
          comment:
            "프론트하드코딩임..프로멘토우스를 통해 첫 개발 멘토링을 진행해봤는데, 성공적이었습니다. 인프런이나"
        },
        {
          score: "4",
          comment:
            "프론트하드코딩임..비용만 받고 야박하게 서비스를 진행하는 여타 멘토분들과는 다르게 한 개라도 더..."
        },
        {
          score: "4",
          comment:
            "비용만 받고 야박하게 서비스를 진행하는 여타 멘토분들과는 다르게 한 개라도 더..."
        }
      ],
      selfInfo:
        "프론트하드코딩임..누구나 다루기 쉬운 Vue.js 입문의 리뉴얼 강의입니다. 입문자의 관점으로 더욱더 눈높이를 낮춰 프론트엔드 개발할 때 알고 있으면 좋은 지식들을 상세하게 설명하였습니다. Vue.js로 재밌게 웹 개발을 시작하실 수 있도록 알차게 내용을 구성하였으니, 관심 있으신 분들은 강의 소개 영상을 꼭 확인해보세요! 😁",
      mentorings: [
        {
          name: "찰리와 초콜릿기계 설계해보기",
          href: "http://localhost:8080/project/recruit/10"
        },
        { name: "쀼 프로젝트", href: "https://www.naver.com/" },
        { name: "업무자동화 프로그램 개발", href: "https://www.naver.com/" },
        { name: "React를 활용한 ...", href: "https://www.naver.com/" },
        { name: "여행 숙박 매칭 프로그램", href: "https://www.naver.com/" },
        { name: "업무자동화 프로그램 개발", href: "https://www.naver.com/" }
      ],

      site: { name: "111", link: "22" }, // site: {name:'GitHub', link:'www.github.com'}
      siteList: [],
      infoStatus: true,
      editStatus: false,
      //applyYes가 true면 프로젝트 활성화(신청 가능) // applyYes & applyNo는 항상 반대값
      applyYes: true,
      applyNo: false,
      applyYn: "Y",
      modalStatus: false
    };
  },
  setup() {},

  created() {
    /*요걸 통해서 router 때 받아온 mentorUserId 값 해석함!*/
    this.mentorUserId = this.$route.params.mentorUserId;
  },
  mounted() {
    this.mentorDetail();
  },
  unmounted() {},
  methods: {
    addUrl() {
      if (this.url.url_title !== "" && this.url.url_address !== "") {
        let obj0 = {
          ["url_title"]: this.url.url_title,
          ["url_address"]: this.url.url_address
        };
        this.url_list.push(obj0);
        this.url.url_title = "";
        this.url.url_address = "";
      } else if (this.url.url_title === "" || this.url.url_address === 0) {
        alert("링크를 정확히 입력해주세요");
      }
    },
    delURL(index) {
      this.url_list.splice(index, 1);
    },
    changeApplyStatus() {
      [this.applyYes, this.applyNo] = [this.applyNo, this.applyYes];
      if (this.applyYn == "Y") {
        this.applyYn = "N";
      } else {
        this.applyYn = "Y";
      }
    },
    changeStatus() {
      [this.infoStatus, this.editStatus] = [this.editStatus, this.infoStatus];
    },
    addSite() {
      let obj = {
        [this.site.name]: this.site.link
      };
      this.siteList.push(obj);
      alert("소설정보가 추가되었습니다.");
    },
    modalOn() {
      this.modalStatus = true;
    },
    modalOff() {
      this.modalStatus = false;
    },
    //김인호 추가
    async mentorDetail() {
      //mentorUserId , mentorData
      this.mentorData = await this.$post("/mentor/getMentorDetail", {
        mentorId: this.mentorUserId
      });
      this.mentorData = this.mentorData.data;
      console.log(this.mentorData);
      /*멘토 기본정보들 front에 삽입 */
      this.title = this.mentorData.basicInfo[0].mentoring_title;
      this.mentor.nickname = this.mentorData.basicInfo[0].user_nickname;
      this.mentor.score = this.mentorData.basicInfo[0].totalRate;
      this.mentor.scoreCount = this.mentorData.basicInfo[0].rateCount;
      this.mentor.image = this.mentorData.basicInfo[0].user_image;

      this.selfInfo = this.mentorData.basicInfo[0].mentoring_intro;
      /*멘토 DEPT 코드 자연어 가져오기 */
      this.likePart = this.mentorData.basicInfo[0].mentoring_dept_code;
      /*멘토후기정보들 가져오기*/
      this.reputations = this.mentorData.reputations;
      /*멘토링 이력  가져오기*/
      this.mentorings = this.mentorData.mentoringHistory;
      /* 참고 링크 가져오기 */
      this.url_list = this.mentorData.url_list;
    }
  }
};
</script>

<style scoped>
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

.ellipsis {
  width: 750px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.modal-conten {
  background-color: white;
  width: 80%;
  height: 80%;
  margin: 0;
  padding: 0;
  border-radius: 0.5%;
  overflow: auto;
}
.partTo > input {
  display: inline;
  margin-right: 5px;
}
.col.partTo {
  position: relative;
  bottom: 5px;
}
p.form-control {
  width: 200px;
  display: inline-block;
  margin-right: 5px;
}
.bi.bi-x-lg {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  font-size: 1.5rem;
}
</style>
