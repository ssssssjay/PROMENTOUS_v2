<template>
  <div class="container">
    <div class="row" v-if="this.mentoring != ''">
      <div class="col-6 mt-5">
        <TableList :headers="headers" :items="mentoring" ref="TBL" />
      </div>
      <div class="col-6">
        <img src="@/img/MentoringAdmin.jpg" alt="" />
      </div>
    </div>
    <div class="emptyData" v-else>
      <div>
        <img src="@/img/MentoringAdmin.jpg" alt="" />
        <p>새로 받은 멘토링 신청이 없습니다</p>
      </div>
    </div>
  </div>
</template>
<script>
import TableList from "@/components/TableList.vue";
export default {
  components: { TableList },
  data() {
    return {
      headers: [
        {
          title: "번호",
          key: "mentoringId"
        },
        {
          title: "프로젝트명",
          key: "PROJECT_TITLE"
        },
        {
          title: "신청 유저",
          key: "REQ_USER"
        }
      ],
      mentoring: [
        {
          PROJECT_TITLE: "자바스크립트로 웹페이지 만들기",
          REQ_USER: "evelo0702",
          mentoringId: "1",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "파이썬으로 만든 TODOLIST",
          REQ_USER: "evelo0702",
          mentoringId: "2",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "Node.js 프로젝트 투입 일주일 전",
          REQ_USER: "evelo0702",
          mentoringId: "3",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "react 익히기",
          REQ_USER: "evelo0702",
          mentoringId: "4",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "vue로 만드는 웹페이지",
          REQ_USER: "evelo0702",
          mentoringId: "5",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "자바스크립트로 웹페이지 만들기",
          REQ_USER: "evelo0702",
          mentoringId: "1",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "파이썬으로 만든 TODOLIST",
          REQ_USER: "evelo0702",
          mentoringId: "2",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "Node.js 프로젝트 투입 일주일 전",
          REQ_USER: "evelo0702",
          mentoringId: "3",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "react 익히기",
          REQ_USER: "evelo0702",
          mentoringId: "4",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        },
        {
          PROJECT_TITLE: "vue로 만드는 웹페이지",
          REQ_USER: "evelo0702",
          mentoringId: "5",
          mentoringTitle: "자바스크립트 가이드",
          mentoringStatus: ""
        }
      ]
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
};
</script>
<style scoped>
div.col-6 > img {
  width: 500px;
  height: 500px;
  border-radius: 10px;
  position: absolute;
  bottom: 220px;
  right: 450px;
}
div.col-6 {
  min-height: 800px;
}
.emptyData {
  min-width: 1400;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyData > div > img {
  width: 500px;
  height: 500px;
}
.emptyData > div > p {
  margin-left: 30px;
  font-size: 32px;
  font-weight: bold;
}
</style>
