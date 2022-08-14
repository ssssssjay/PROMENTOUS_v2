<script>
/* eslint-disable */
import { decodeCredential } from "vue3-google-login";
export default {
  components: {},
  data() {
    return {
      buttonConfig: {
        type: "icon"
        // theme: "outline",
        // size: "large",
        // text: "signup_with",
        // shape: "",
        // logo_alignment: "",
        // width: "",
        // locale: "",
      }
    };
  },
  props: {
    modalShow: Boolean
  },
  methods: {
    async callback(response) {
      // response는 날것그대로의 데이터이고, userData는 정제된 데이터이다.
      const userData = await decodeCredential(response.credential);
      // 포스트요청을 먼저보내고 응답값을 받은 뒤,
      const loginUser = await this.$post(`http://localhost:3000/login`, {
        param: [
          {
            user_nickname: userData.name,
            user_account: userData.email,
            user_image: userData.picture
          },
          {
            user_nickname: userData.name,
            user_image: userData.picture
          }
          // 필드명과 반드시 동일_이래야 쿼리문이 스무스함 : 내가 쏴줄 데이터값
        ]
      });
      // vuex의 user에 담는다(+로컬스토리지와 연동이 되는 모듈을 설치함)
      // 로그인버튼은 사라지고 로그아웃 버튼이 생긴다.(뷰엑스의 유저로 와치중)
      this.$store.commit("user", loginUser.data[0]);
      // 희한하게 loginUser에는 응답 상태등등 잡다구리한게 다온다. 포스트요청의 특징으로 보임
      // console.log(loginUser);
      console.log(this.$store.state.user);
      // 페이지를 마이페이지로 이동시킨다
      const path = `/myPageInfo/${loginUser.data[0].user_id}`;
      this.$router.push({
        path: path,
        name: "MyPageView",
        params: { userId: loginUser.data[0].user_id }
      });
      // location.href = "http://localhost:8080/myPageinfo";
      // 모달영역을 지원준다
      this.$emit("onClickClose");
    }
  }
};
</script>

<template>
  <div>
    <div class="logo">
      <a style="font-size: 30px">PROMENTOUS</a>
    </div>
    <form class="mb-3">
      <label for="exampleInputEmail1" class="form-label"></label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Email"
        disabled />
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label"></label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          disabled />
      </div>
      <div id="emailHelp" class="form-text mb-3">
        구글로그인을 이용해주세요!
      </div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary m-0" disabled>로그인</button>
      </div>
    </form>
    <div class="mb-3 socialLogin">간편 로그인</div>
    <GoogleLogin :callback="callback" :buttonConfig="buttonConfig" />
  </div>
</template>
<style lang="scss" scoped>
.socialLogin::before,
.socialLogin::after {
  display: inline-block;
  content: "";

  width: 100px;
  height: 1px;
  background-color: #c4c4c4;

  vertical-align: middle;
}
.socialLogin::before {
  margin-right: 1rem;
}
.socialLogin::after {
  margin-left: 1rem;
}
</style>
