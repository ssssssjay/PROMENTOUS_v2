<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
      <div class="container">
        <div class="logo">
          <router-link
            class="navbar-brand mainLogo"
            :class="{ active: $route.path == '/' }"
            to="/"
            >PROMENTOUS</router-link
          >
        </div>
        <div class="col text-end me-5">
          <!-- <div class="col-lg-6 h-100 text-center text-lg-start my-auto"> -->

          <span class="dropdown">
            <a
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <span
                :class="{
                  active:
                    $route.path == '/project/recruit' ||
                    $route.path == '/project/review'
                }"
                style="font-size: 20px"
                >프로젝트</span
              >
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <router-link
                  to="/project/recruit"
                  class="dropdown-item"
                  :class="{ active: $route.path == '/project/recruit' }"
                  >모집</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{ active: $route.path == '/project/review' }"
                  to="/project/review"
                  >후기</router-link
                >
              </li>
            </ul>
          </span>
          <span class="dropdown">
            <a
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{ active: $route.path == '/mentolist' }"
              @click="goToMenu('/mentolist')">
              <span>멘토링</span>
            </a>
          </span>
          <span class="dropdown" v-if="user.user_id">
            <a
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{ active: $route.path == '/teammanage' }"
              @click="goToMenu('/teammanage')">
              <span>팀관리</span>
            </a>
          </span>
          <!-- <span class="dropdown">
            <a
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{ active: $route.path == '/myPageinfo' }"
              @click="goToMenu('/myPageinfo')"
              style="font-size: 20px">
              <span>마이페이지</span>
            </a>
          </span> -->
        </div>

        <div class="siglog">
          <button
            v-if="user.user_id == undefined"
            class="btn btn-outline-dark"
            type="button"
            @click="onClickOpen">
            <span>로그인</span>
          </button>

          <div class="loginDropdown" v-else>
            <img
              :src="user.user_image"
              class="dropProfile bi bi-person-workspace"
              style="border-radius: 50%"
              v-click-outside="closeProfile"
              @click="viewProfile" />

            <transition name="slide-up">
              <div class="login dropdown-menu show mt-2" v-if="clickProfile">
                <div class="user m-2">
                  <span class="nickname">{{ user.user_nickname }}</span>
                  <div class="email">{{ user.user_account }}</div>
                  <button
                    type="button"
                    class="closeBtn btn-close"
                    @click="closeProfile"></button>
                </div>
                <hr />
                <div class="userMenu">
                  <a
                    class="myPage"
                    :class="{ active: $route.path == '/myPageinfo' }"
                    @click="goToMenu(`/myPageinfo/${user.user_id}`)"
                    ><i class="bi bi-gear me-2 mb-2"></i>마이페이지</a
                  >
                  <a
                    class="notice"
                    :class="{ active: $route.path == '/MentoringAdmin' }"
                    @click="goToMenu('/MentoringAdmin')"
                    ><i class="bi bi-bell me-2 mb-2"></i>멘토링 알림
                  </a>
                  <a @click="onClickLogout" class="logout">
                    <i class="bi bi-box-arrow-right me-2"></i>
                    로그아웃
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>
    <!-- 로그인 모달 영역 -->
    <div class="modal-container" v-if="modalShow">
      <div class="modal-content">
        <GoogleLogin :modal-show="modalShow" @on-click-close="onClickClose" />
        <i class="bi bi-x-lg" @click="onClickClose"></i>
      </div>
    </div>
  </header>
</template>
<script>
import GoogleLogin from "../GoogleLogin.vue";
import vClickOutside from "click-outside-vue3";

let scrollPosition = 0;
const body = document.querySelector("body");

export default {
  components: { GoogleLogin },
  data() {
    return {
      modalShow: false,
      clickProfile: false
      // userImage: this.$store.state.user.user_image
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    goToMenu(path) {
      this.$router.push({ path: path });
    },
    onClickOpen() {
      this.modalShow = true;
      scrollPosition = window.pageYOffset;
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollPosition}px`;
      body.style.width = "100%";
      body.style.overflowY = "scroll";
    },
    onClickClose() {
      this.modalShow = false;
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition);
    },
    onClickLogout() {
      this.$store.commit("user", {});
      this.$router.push("/");
    },
    viewProfile() {
      this.clickProfile = !this.clickProfile;
    },
    closeProfile() {
      this.clickProfile = false;
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
};
</script>
<style lang="scss">
nav a {
  font-weight: bold;
  color: #2c3e50;
}

.logo > .mainLogo {
  font-size: 30px;
  font-weight: bold;
}
.active {
  color: #1379d2;
}
span > a {
  text-decoration: none;
}
span > a:hover {
  color: #1379d2;
}
header {
  font-family: "Roboto";
  margin-bottom: 10px;
}
div > button {
  margin: 5px;
}
.dropdown > a {
  font-size: 20px;
}
// .logo > a {
//   background: linear-gradient(to right, #1379d2, #49c0d0);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: 25px;
// }
.dropdown {
  margin: 10px;
}
.dropProfile {
  width: 50px;
  height: 50px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-leave-to {
  opacity: 0;
}
.slide-up-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
div.dropdown-menu {
  width: 220px;
  border-radius: 6px;
}
.user {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}
.userMenu > a {
  display: flex;
  text-decoration: none;
  font-size: 16px;
  margin-left: 10px;
}

div.email {
  font-size: 8px;
}
button.closeBtn {
  position: absolute;
  left: 180px;
  top: 13px;
}

/* 로그인 모달 영역 */
.modal-container {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;

  .modal-content {
    position: relative;
    z-index: 20;
    width: 350px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem 1.25rem;

    .bi.bi-x-lg {
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      font-size: 1.5rem;
    }
  }
}

.loginDropdown {
  position: relative;
}
.login.dropdown-menu {
  position: absolute;
  bottom: -190px;
  left: -170px;
}
</style>
