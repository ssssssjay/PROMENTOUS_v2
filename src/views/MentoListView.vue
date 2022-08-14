<template>
  <div>
    <!-- 배너 -->
    <!-- ---------------------------------------------------------------------------------------------- -->
    <section class="banner">
      <div class="comment container">
        <h1 class="title">멘토링</h1>
        <p class="des">보다 좋은 개발자가 되기 위한 또 하나의 단계</p>
      </div>
    </section>
    <!-- 카드리스트 -->
    <!-- ---------------------------------------------------------------------------------------------- -->
    <section class="container">
      <!-- <hr />
      {{ this.page }}
      <hr />
      {{ this.mentoList }} -->

      <registerbtn-layout
        class="regbtn"
        :btnText="btnText"
        @click="checkMentorInfoExist()" />

      <div
        class="d-flex pt-5 mb-4 align-items-start justify-content-between section_second">
        <!-- <RecruitSortLayout />
        <div class="d-flex">
          <PartSearchLayout @send-value="sendValue" />
          <SearchAll @search-keyword="SearchKeyword" />
        </div> -->
      </div>
      <div class="row mt-n4">
        <div
          class="d-flex justify-content-between align-items-center mb-2 mentoList"
          :key="index"
          v-for="(mento, index) in mentoList">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <span class="mentoNickName">{{ mento.user_nickname }}</span>
                <i class="bi bi-star-fill star"></i>

                <span class="mentoScore">{{ rate1[index] }}</span>
                <span>({{ rate2[index] }})</span>
                <p class="card-title">{{ mento.mentoring_title }}</p>
                <div class="text">
                  <p class="card-text">
                    {{ mento.mentoring_intro }}
                  </p>
                </div>
                <div
                  class="mentoPart"
                  :key="i"
                  v-for="(code, i) in mentoList[index].dept_code3"
                  style="display: inline">
                  <button class="partName">{{ code }}</button>
                </div>

                <span v-show="mento.dept_code.length > 3"
                  >+{{ mento.dept_code.length - 3 }}</span
                >
              </div>
            </div>
            <div class="men_title col-md-4 imgCard">
              <img
                v-bind:src="mento.user_image"
                class="img-fluid rounded-start pfimg"
                alt="..." />

              <button
                class="btn btn-outline-dark mentoDetail"
                @click="goToMenu(`/mentordetail/${mento.user_id}`)">
                멘토 상세보기
              </button>
            </div>
          </div>
        </div>
        <div class="pagination">
          <PaginationLayout :page="page" @paging="paging" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import PaginationLayout from "@/components/layouts/PaginationLayout.vue";
//import PartSearchLayout from "@/components/layouts/PartSearchLayout.vue";
// import SearchAll from "@/components/SearchAll.vue";
// import RecruitSortLayout from "@/components/layouts/RecruitSortLayout.vue";
import RegisterbtnLayout from "../components/layouts/RegisterbtnLayout.vue";
export default {
  components: {
    // PartSearchLayout,
    // SearchAll,
    // RecruitSortLayout,
    RegisterbtnLayout,
    PaginationLayout
  },
  data() {
    return {
      rate1: [3.7, 4.6, 4.9, 3.2, 4, 2.7, 3.9, 4.5],
      rate2: [12, 43, 5, 10, 34, 20, 11, 19],
      part: [],
      /*페이징처리 조건을 위한 parameters -  searchKeyWord / originDeptCode / selectedPage */
      //searchKeyword  주석걺.
      keyWord: "",
      originDeptCode: "",
      selectedPage: 1,
      page: 1, // Math.floor => 버림 , Math.ceil => 올림
      pageToMove: 1,
      btnText: "멘토 등록 하기",
      checkResult1: [],
      mentoList: [
        {
          user_image0: "",
          user_image:
            "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png",
          user_nickname: "하드코딩임.evelo0702",
          title: "하드코딩임.파이썬을 도와주는 멘토링",
          mentoring_intro: "",
          mentoring_intro0: "",
          dept_code: ["자바스크립트", "파이썬", "스프링", "뷰"],
          dept_code3: [], // db에서 가져올 데이터 x
          rate: [
            5, 2, 3, 4, 5
          ] /*TODO rate 구조 재조정 됨. 변경또는 삭제필요!! */,
          totalRate: 0,
          rateCount: 0
        }
      ]
    };
  },
  setup() {},
  created() {
    this.getMentorList();
  },
  mounted() {},
  unmounted() {},
  methods: {
    sendValue(data) {
      this.part = data;
    },
    goToMenu(path) {
      this.$router.push({ path: path });
      /**/
    },
    deptCodeFilter() {
      for (let i = 0; i < this.mentoList.length; i++) {
        this.mentoList[i].dept_code3 = this.mentoList[i].dept_code.slice(0, 3);
      }
    },
    defaultImage() {
      for (let i = 0; i < this.mentoList.length; i++) {
        if (this.mentoList[i].user_image == "") {
          this.mentoList[i].user_image =
            "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png";
        }
      }
    },
    SearchKeyword(data) {
      this.keyword = data;
      this.getMentorList();
    },
    async getMentorList() {
      this.mentoList = await this.$post("/mentor/mentorList", {
        searchKeyWord: this.keyword,
        dept_code: this.originDeptCode,
        selectedPage: this.pageToMove
      });
      console.log(this.mentoList);
      this.page = Math.ceil(Math.ceil(this.mentoList.data.count[0].count / 8));
      /*2까지는 가져옵니다.  TOTAL 12개 결과에서 2 페지지까지는 떠야 하므로!*/
      this.mentoList = this.mentoList.data.mentorList;
      this.deptCodeFilter();
      this.defaultImage();
    },
    /*멘토정보 등록하기로 이동 (멘토로 되고싶은사람) 직전 벨리데이션*/
    async checkMentorInfoExist() {
      this.checkResult1 = await this.$post("/mentor/checkMentorInfoExist", {
        user_id: this.$store.state.user.user_id
      });
      if (this.checkResult1.data.length == 0) {
        this.goToMenu("/mentorregister");
      } else {
        alert("이미 등록하셨습니다! ");
      }
    },
    paging(data) {
      this.pageToMove = data;
      this.getMentorList();
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
.regbtn {
  float: right;
}

.mentoPart {
  position: relative;
  text-align: start;
}
.mentoPart > button {
  border-radius: 5px;
  border-style: none;
}
.mentoNickName {
  margin: 10px 10px 10px 0px;
  font-size: 35px;
  font-style: bold;
}
.partName {
  background-color: #1379d2;
  color: white;
}
.mentoList {
  border-radius: 15px;
  border: 3px solid #dce8f3;
  transition: all 0.3s;
  max-width: 650px;
  margin: 5px;
}
.mentoList:hover {
  transform: translateY(-4px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.card-title {
  font-size: 20px;
}
div.text {
  height: 70px;
}
.card-text {
  font-size: 13px;
  /* min-height: 80px; */
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
div.imgCard {
  position: relative;
  left: 60px;
  margin-top: 30px;
}
.imgCard > img {
  width: 150px;
  height: 150px;
  padding: 10px;
}

img.img-fluid.pfimg {
  width: 150px;
}
.pagination {
  position: relative;
  left: 550px;
}
/* .regbtn {
  position: absolute;
  right: 450px;
} */
i.star {
  color: #1379d2;
  margin-right: 6px;
}
button.mentoDetail {
  margin: 15px 10px;
}
</style>
