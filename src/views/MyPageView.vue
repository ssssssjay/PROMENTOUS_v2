<template>
  <div class="container mt-5">
    <div class="row">
      <!-- 페이지우측  -->
      <div class="col">
        <div class="content text-start">
          <!-- 글 제목 -->
          <div class="h1"><strong>내 정보</strong></div>
          <hr />
          <!-- 글 내용 상단 -->
          <div class="row mt-4">
            <div class="col-2 text-center">
              <img
                :src="user.user_image"
                alt="프로필사진"
                style="width: 130px; border-radius: 15px" />
            </div>
            <div class="col-10">
              <p class="h2">자기소개</p>
              <p id="to" class="h4" v-show="infoStatus">
                {{ user.selfInfo }}
              </p>
              <p v-show="editStatus">
                <textarea
                  class="form-control text-muted"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  v-model="user.selfInfo"></textarea>
              </p>
            </div>
          </div>
          <div class="mt-3 mb-3" style="height: 30px">
            <p class="row" style="vertical-align: middle">
              <span class="col-2 text-center" v-show="infoStatus"
                ><strong>{{ user.nickname }}</strong></span
              >
              <span class="col-2 text-center" v-show="editStatus">
                <input
                  class="form-control text-center"
                  type="text"
                  v-model="user.nickname" /></span
              >|
              <span class="col-2 text-center"><strong>평판점수</strong></span>
              <span class="col-2 text-start">
                <button id="bt" class="btn btn-outline-dark">
                  <i class="bi bi-star-fill pro_star_color"></i
                  >{{ rateAverage }}/({{ rateLength }})
                </button></span
              >|<span class="col-2 text-center"
                ><strong>로그인 계정</strong></span
              >
              <span class="col-2">{{ user.googleAccount }}</span>
            </p>
            <hr />
          </div>
          <!-- 글 내용 하단 -->
          <div class="h5 py-3">
            <p class="row py-4 mb-4">
              <span class="col-2 text-center"><strong>관심분야</strong></span>

              <span class="col px-3">
                <span
                  class="stack-icon mx-2 mb-2"
                  style="width: auto"
                  v-for="(part, index) in parts"
                  :key="index"
                  v-show="infoStatus"
                  >{{ part }}</span
                >

                <PartSearchLayout
                  style="float: left"
                  @send-value="addPart"
                  :parts="parts"
                  v-show="editStatus"
                  v-model="parts" />
              </span>
            </p>
            <p class="row py-4 mb-4">
              <span class="col-2 text-center"><strong>관심 스택</strong></span>
              <span class="col px-3">
                <span
                  class="stack-icon mx-2 mb-2"
                  style="width: auto"
                  v-for="(stack, index) in stacks"
                  :key="index"
                  v-show="infoStatus"
                  >{{ stack }}</span
                >
                <StackSearchLayout
                  style="float: left"
                  :stacks="this.stacks"
                  @send-value="addStack2"
                  ref="StackSearchRef"
                  v-show="editStatus"></StackSearchLayout>
              </span>
            </p>
            <div class="row py-4 mb-0">
              <div class="col-2 text-center"><strong>소셜정보</strong></div>
              <div class="col" v-show="infoStatus">
                <a
                  class="mb-1 px-4 tag"
                  :href="url.url_address"
                  target="_blank"
                  v-for="(url, index) in URL_LIST"
                  :key="index">
                  {{ URL_LIST[index].url_title }}
                </a>
              </div>
              <div class="col partTo" v-show="editStatus">
                <input
                  type="text"
                  class="form-control"
                  style="width: 200px"
                  placeholder="링크 이름"
                  v-model="URL.url_title" />

                <input
                  type="text"
                  class="form-control"
                  style="width: 600px"
                  placeholder="링크 주소"
                  v-model="URL.url_address" />
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="regUrlType(URL.url_address), addUrl()">
                  추가
                </button>
                <div v-for="(URL, index) in URL_LIST" :key="index">
                  <div class="col partTo ms-1">
                    <input
                      type="text"
                      class="form-control"
                      style="width: 200px"
                      v-model="URL_LIST[index].url_title" />
                    <input
                      type="text"
                      class="form-control"
                      style="width: 600px"
                      v-model="URL_LIST[index].url_address" />
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="delURL(index)">
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <p class="text-end">
              <!-- 저장 -->
              <button
                type="button"
                class="btn btn-dark btn-lg"
                v-show="editStatus"
                @click="[changeStatus1(), passData()]">
                {{ this.buttonStatus }}
              </button>
              <!-- 수정 -->
              <button
                type="button"
                class="btn btn-outline-dark btn-lg"
                v-show="infoStatus"
                @click="changeStatus2(), transStack(), transPart()">
                {{ this.buttonStatus }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PartSearchLayout from "@/components/layouts/PartSearchLayout.vue";
import StackSearchLayout from "@/components/layouts/StackSearchLayout.vue";

export default {
  components: { PartSearchLayout, StackSearchLayout },
  data() {
    return {
      checkUrl: false,
      userRateData: [],
      rateAverage: 0,
      rateLength: 0,
      Rate: 0,
      regex:
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
      user: {
        nickname: "닉네임",
        score: 3.5,
        scoreCount: 12,
        mentoScore: 4.5,
        mentoScoreCount: 9,
        login: "joans.dev@gmail.com",
        selfInfo:
          "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        googleAccount: "joans.dev@gmail.com"
      },
      options: [
        { optionCode: "1", name: "프론트엔드" },
        { optionCode: "2", name: "백엔드" },
        { optionCode: "3", name: "풀스택" },
        { optionCode: "4", name: "디자인" },
        { optionCode: "5", name: "UI/ UX" },
        { optionCode: "6", name: "기획" },
        { optionCode: "7", name: "PM" },
        { optionCode: "8", name: "데이터베이스" },
        { optionCode: "9", name: "알고리즘,자료구조" },
        { optionCode: "10", name: "퍼블리싱" },
        { optionCode: "11", name: "데브옵스" },
        { optionCode: "12", name: "데이터사이언스" }
      ],
      selectedOptionList: [],
      optionList: [],

      partList: [
        { partCode: "01", partName: "프론트엔드" },
        { partCode: "02", partName: "백엔드" },
        { partCode: "03", partName: "모바일" },
        { partCode: "04", partName: "기타" }
      ],
      parts: [],
      stacks: [],
      selectedPart: "",
      selectedStackList: [3, 3, 3, 3, 3],
      stackList: [4, 4, 4, 4, 4, 4],
      value: [5, 5, 5, 5, 5],

      site: { name: "", link: "" }, // site: {name:'GitHub', link:'www.github.com'}
      siteList: [], // [{GitHub:'www.github.com'}, {Naver:'www.naver.com'}, ...]
      infoStatus: true,
      editStatus: false,
      buttonStatus: "수정",
      URL: { url_title: "", url_address: "" },
      URL_LIST: [] //DB로 쏘옥};
    };
  },
  setup() {},
  created() {
    this.userId = this.$route.params.userId;
  },
  mounted() {
    this.getUserData();
    this.getRateData();
  },
  updated() {},
  unmounted() {},
  methods: {
    transStack() {
      this.$refs.StackSearchRef.transStacks();
    },
    transPart() {
      this.$refs.PartSearchRef.transPart();
    },
    addStack() {
      this.selectedStackList = this.stacks.filter(
        (stack) => stack.partCode === this.selectedPart
      );
    },
    addSite() {
      let obj = {
        [this.site.name]: this.site.link
      };
      this.siteList.push(obj);
      alert("소설정보가 추가되었습니다.");
    },
    changeStatus1() {
      this.infoStatus = true;
      this.editStatus = false;
      this.buttonStatus = "수정";
    },
    changeStatus2() {
      this.infoStatus = false;
      this.editStatus = true;
      this.buttonStatus = "저장";
    },
    regUrlType(data) {
      this.checkUrl = false;
      if (this.regex.test(data)) {
        this.checkUrl = true;
      }
    },
    addUrl() {
      if (
        this.URL.url_title !== "" &&
        this.URL.url_address !== "" &&
        this.checkUrl !== false
      ) {
        let obj0 = {
          ["url_title"]: this.URL.url_title,
          ["url_address"]: this.URL.url_address
        };
        this.URL_LIST.push(obj0);
        this.URL.url_title = "";
        this.URL.url_address = "";
      } else if (this.URL.url_title === "") {
        alert("링크 제목을 입력해주세요");
      } else if (this.URL.url_address === "") {
        alert("링크 주소를 입력해 주세요");
      } else if (this.checkUrl === false) {
        alert("링크 양식을 https://www.naver.com 다음과 같이 작성해주세요");
      }
    },
    delURL(index) {
      this.URL_LIST.splice(index, 1);
    },
    addPart(data) {
      this.parts = data;
    },

    addStack2(data) {
      this.stacks = data;
    },
    // 마이페이지 저장  passData()
    // 마이페이지의 데이터를 넘겨줄 url은 어디?
    async passData() {
      let param = {
        nickname: this.user.nickname,
        info: this.user.selfInfo,
        login: this.user.googleAccount,
        /*selectedPArt ? part 변수명이 뭐가 될지는모르지만.
      일단  ['P01', 'V01']
      모양새로 ( 스택 / 분야 ) 데이터가 서버에 던져진다고 가정함. */
        parts: this.parts,
        stacks: this.stacks,
        URL_LIST: this.URL_LIST
      };

      console.log("======저장용 데이터!=======");
      console.log("=============param=========");
      console.log(param);
      const response = await this.$post(`/user/saveData/${this.userId}`, param);
      console.log(response);
    },
    //마이페이지 조회
    async getUserData() {
      const response = await this.$get(`/user/${this.userId}`);
      //console.log("USERDATA 가져옴");
      //console.log(response);
      this.user.nickname = response.user_nickname;
      this.user.selfInfo = response.user_intro;
      this.user.login = response.user_account;
      this.user.googleAccount = response.user_account;
      this.user.user_image = response.user_image;
      this.user.score = response.userRateAVG;
      this.user.scoreCount = response.userRateCount;
      this.user.mentoScore = response.mentorRateAVG;
      this.user.mentoScoreCount = response.mentorRateAVG;
      this.stacks = response.like_stack_code;
      this.parts = response.like_dept_code;
      this.URL_LIST = response.url_list;
    },
    goToHome(path) {
      window.scrollTo(0, 0);
      this.$router.push({ path: path });
    },
    async getRateData() {
      this.userRateData = [];
      const RateData = await this.$get(
        `http://127.0.0.1:3000/user/rate/${this.userId}`
      );
      this.userRateData.push(RateData);
      this.rateAverage = 0;
      this.Rate = 0;
      for (let i = 0; i < this.userRateData[0].length; i++) {
        this.Rate += this.userRateData[0][i].rate;
      }
      this.rateAverage = (this.Rate / this.userRateData[0].length).toFixed(1);
      this.rateLength = 0;
      this.rateLength = this.userRateData[0].length;
    }
  }
};
</script>

<style scoped>
#link {
  text-decoration-line: none;
}

#bt {
  margin-bottom: 50%;
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
p.form-control:nth-child(2) {
  width: 600px;
}

div > .tag {
  text-decoration: none;
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

#to {
  overflow: auto;
  height: 200px;
  font-size: 18px;
}
</style>
