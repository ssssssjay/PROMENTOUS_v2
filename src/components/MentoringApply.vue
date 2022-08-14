<template>
  <div class="container">
    <!-- 신청 대상 -->
    <div class="row mt-5 px-0">
      <p class="col text-start h2 px-0">
        <strong>{{ mentor.name }}</strong>
        님에게 멘토링 신청하기
      </p>

      <hr />
    </div>
    <!-- 신청 정보 -->
    <div class="apply">
      <p class="row h4 mt-5">
        <span class="col-2 text-start"><strong>스터디/프로젝트</strong></span>
        <span class="col-3 px-4"
          ><select class="form-control" name="" id="">
            <option value="">1</option>
            <option value="">2</option>
          </select></span
        >
      </p>
      <p class="row h4 mt-5">
        <span class="col-2 text-start"><strong>연락처</strong></span>
        <span class="col-3 px-4"
          ><input class="form-control" type="email" v-model="contact"
        /></span>
      </p>
      <p class="row h4 mt-5">
        <span class="col-2 text-start"><strong>멘토링 신청 횟수</strong></span>
        <span class="col-3 px-4"
          ><input class="form-control" type="number" name="" id="" min="1"
        /></span>
      </p>
      <div class="row h4 mt-5">
        <span class="col-2 text-start"><strong>멘토링 신청 분야</strong></span>
        <div class="col-6 px-4 h5">
          <div v-for="part in mentor.parts" :key="part.partCode">
            <input
              class="form-check-input mb-3 h5"
              type="checkbox"
              :value="part.name"
              v-model="partList" />
            {{ part.name }}
          </div>
        </div>
      </div>
      <div class="row h4 mt-5 mb-5">
        <span class="col-2 text-start"><strong>멘토링 희망내용</strong></span>
        <div class="col px-4">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            v-model="applyInfo"></textarea>
        </div>
      </div>
      <!-- 하단 -->
      <div class="row">
        <hr />
        <span class="text-end"
          ><button class="btn btn-primary btn-lg" @click="passData">
            신청하기
          </button></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      mentor: {
        name: "joansdev",
        contact: "",
        parts: [
          { partCode: "1", name: "프론트엔드" },
          { partCode: "2", name: "백엔드" },
          { partCode: "3", name: "모바일" }
        ]
      },
      partList: [],
      applyInfo: ""
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // async passData() {
    //   const response = await this.$post(
    //     //eslint-disable-line no-unused-vars
    //     "http://localhost:3000/",
    //     {
    //       param: {
    //         name: this.name,
    //         contact: this.contact,
    //         parts: this.partList,
    //         info: this.applyInfo
    //       }
    //     }
    //   );
    // }
  }
};
</script>
