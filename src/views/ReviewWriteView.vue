<template>
  <div>
    <div class="container mt-5">
      <form class="row g-3">
        <div class="row mb-5">
          <div class="title col-sm-10">프로젝트 후기 작성하기</div>
        </div>
        <div class="row mb-5">
          <label for="reviewName" class="col-sm-2 col-form-label">후기명</label>
          <div class="col-sm-3">
            <input
              type="text"
              class="form-control"
              id="reviewName"
              v-model="REVIEW_TITLE" />
          </div>
        </div>
        <div class="row mb-5">
          <label for="inputStartDate" class="col-sm-2 col-form-label"
            >진행한 프로젝트</label
          >
          <div class="col-sm-3">
            <!-- <select
              class="form-select"
              name=""
              id=""
              v-model="SELECTED_PROJECT_TITLE">
              <option
                value=""
                :key="i"
                v-for="(title, i) in USER_PROJECT_TITLE">
                {{ title }}
              </option>
            </select> -->
            <UserHistorySelect
              v-model="SELECTED_PROJECT_ID"
              class="recruit_sort"
              mode="single"
              :native="false"
              :options="USER_HISTORY"
              placeholder="정렬"
              noOptionsText="완료한 프로젝트가 없습니다!"
              ref="recruitsort" />
          </div>
        </div>
        <div class="row mb-5">
          <label for="image" class="col-sm-2 col-form-label"
            >썸네일 이미지</label
          >
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            ref="image"
            @change="imgUpload" />
          <div class="img-preview">
            <img
              id="img-preview"
              :src="imgPrevSrc"
              style="display: none"
              width="250"
              alt="미리보기"
              ref="imgPrev" />
          </div>
        </div>

        <div class="row mb-5">
          <label class="col-sm-10 col-form-label"
            >결과 링크<br />
            <p>
              * 프로젝트 결과를 확인할 수 있는 사이트를 입력해주세요.
            </p></label
          >
          <div class="col partTo" v-show="this.UrlAdd == ''">
            <input
              type="text"
              class="form-control"
              style="width: 200px"
              placeholder="링크 이름"
              v-model="URL.title" />
            <!-- {{ URL_LIST[0].title }} -->
            <input
              type="text"
              class="form-control"
              style="width: 300px"
              placeholder="링크 주소"
              v-model="URL.address" />
            <!-- {{ URL_LIST[0].address }} -->
            <button type="button" class="btn btn-secondary" @click="addUrl()">
              추가
            </button>
          </div>
          <div class="row" v-for="(URL, index) in URL_LIST" :key="index">
            <div class="col partTo ms-1">
              <p class="form-control mb-1">
                {{ URL_LIST[index].title }}
              </p>
              <p class="form-control mb-1" style="width: 500px">
                {{ URL_LIST[index].address }}
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
        <text-editor :contents="contents" @send-EditorData="sendEditorData" />
        <registerbtn-layout
          class="regBtn"
          :btnText="btnText"
          @click="insertReview" />
      </form>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import TextEditor from "@/components/TextEditor.vue";
import RegisterbtnLayout from "../components/layouts/RegisterbtnLayout.vue";
import axios from "axios";
import UserHistorySelect from "@vueform/multiselect";

export default {
  name: "app",
  components: {
    TextEditor,
    RegisterbtnLayout,
    UserHistorySelect
  },
  data() {
    return {
      URL: { title: "", address: "" },
      URL_LIST: [],
      UrlAdd: "",
      REVIEW_TITLE: "",
      REVIEW_DESC: "",
      SELECTED_PROJECT_ID: 0,
      SELECTED_PROJECT_TITLE: "",
      contents:
        "<p>프로젝트의 설명이나, 진행하면서 느낀점 등을 자유로이 작성해주세요!</p>",
      btnText: "작성 완료",
      imgPrevSrc: "",
      USER_HISTORY: []
    };
  },
  setup() {},
  created() {
    // console.log(this.$store.state.user.user_id);
    this.getUserHistory();
  },
  mounted() {},
  unmounted() {},
  methods: {
    sendValue(data) {
      this.stacks = data;
    },
    sendEditorData(data) {
      this.REVIEW_DESC = data;
    },
    delPart(index) {
      this.PART_LIST.splice(index, 1);
    },
    addUrl() {
      if (this.URL.title !== "" && this.URL.address !== "") {
        let obj0 = {
          ["title"]: this.URL.title,
          ["address"]: this.URL.address
        };
        this.URL_LIST.push(obj0);
        this.URL.title = "";
        this.URL.address = "";
        this.UrlAdd = "yes";
      } else if (this.URL.title === "" || this.URL.address === 0) {
        alert("링크를 정확히 입력해주세요");
      }
    },
    delURL(index) {
      this.URL_LIST.splice(index, 1);
      this.UrlAdd = "";
    },
    async imgUpload() {
      const formData = new FormData();
      let image = this.$refs.image.files[0];
      console.log(image);
      formData.append("image", image);
      axios
        .post("http://localhost:3000/img", formData, {
          header: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => {
          console.log(res);
          // document.getElementById("img-preview").src = res.data.originalUrl;
          this.imgPrevSrc = res.data.url;
          // document.getElementById("img-preview").style.display = "inline";
          this.$refs.imgPrev.style.display = "inline";
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async insertReview() {
      // const userId = this.$store.state.user.user_id;
      const response = await this.$post(`/project/review/insertReview`, {
        param: {
          writer_id: this.$store.state.user.user_id,
          title: this.REVIEW_TITLE,
          thumbnail_image: this.imgPrevSrc,
          desc: this.REVIEW_DESC,
          project_id: this.SELECTED_PROJECT_ID
        }
      });
      console.log(response);
      const postId = response.data.insertId;
      this.insertUrl(postId);
      this.$router.push(`/project/review`);
    },
    async getUserHistory() {
      const userId = this.$store.state.user.user_id;
      const response = await this.$get(
        `project/review/getReviewAvailProjectList/?userId=${userId}`
      );
      for (let i = 0; i < response.length; i++) {
        this.USER_HISTORY[i] = {
          value: response[i].project_id,
          label: response[i].title
        };
      }
    },
    async insertUrl(postId) {
      const response = this.$post(`/project/review/insertUrl`, {
        param: {
          review_id: postId,
          url_title: this.URL_LIST[0].title,
          url_address: this.URL_LIST[0].address
        }
      });
    }
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect-option {
  transition: all 0.2s;
}
.multiselect-option:hover {
  background: var(--ms-option-bg-selected, #1379d2);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #1379d2);
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #1379d2);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.regBtn {
  /* float: right; */
  display: flex;
  justify-content: end;
  margin-top: 64px;
}
.title {
  font-size: 40px;
  font-weight: bold;
}
.warranty {
  width: 150px;
  display: inline;
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
#image {
  /* display: inline; */
  width: 300px;
}
</style>
