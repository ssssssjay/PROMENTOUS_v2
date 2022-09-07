<template>
  <div>
    <!-- 첫번째 -->
    <section class="container first-section">
      <div class="left-box">
        <img class="bg-img" src="@/img/img.svg" alt="메인소개이미지" />
      </div>
      <div class="right-box">
        <div class="comment">
          <p class="title">PROMENTOUS</p>
          <p class="des">
            성장하는 개발자가 되기위한 훌륭한
            <span class="highligh">METHOD</span><br />
            다양한 프로젝트와 좋은 동료를 만날수 있는 기회를 잡아보세요
          </p>
        </div>
      </div>
    </section>
    <!-- 두번째 -->
    <section class="container second-section mb-5">
      <div class="section project-section">
        <div class="item desc-section">
          <h2 class="title">프로젝트 모집</h2>
          <p class="des">
            원하시는 프로젝트를 마음껏 모집하세요<br />
            마음 맞는 팀원을 만날 수 있습니다<br />
            자세히 작성할수록 관심을 표현할거에요
          </p>
          <button @click="goToMenu('/project/recruit')">
            프로젝트 더 보기
          </button>
        </div>
        <div class="item example-section">
          <img src="@/assets/project_section.png" alt="프로젝트소개이미지" />
        </div>
      </div>
      <div class="section reverse review-section">
        <div class="item desc-section">
          <h2 class="title">프로젝트 후기</h2>
          <p class="des">
            프로젝트를 완성하셨다면, 후기를 작성해보세요<br />
            많은 개발자들에게 마음껏 자랑하세요<br />
            작성한 후기를 보고 더 많은 팀원이 생길거에요
          </p>
          <button @click="goToMenu('/project/review')">후기 더 보기</button>
        </div>
        <div class="item example-section">
          <img src="@/assets/review_section.png" alt="후기소개이미지" />
        </div>
      </div>
      <div class="section mentor-section">
        <div class="item desc-section">
          <h2 class="title">멘토링</h2>
          <p class="des">
            도움이 필요하시다면 멘토를 구해보세요<br />
            여러 분야의 전문가가 도움을 드릴거에요<br />
            당신도 멘토가 될 수 있습니다
          </p>
          <button @click="goToMenu('/mentolist')">멘토 더 보기</button>
        </div>
        <div class="item example-section">
          <img src="@/assets/mentor_section.png" alt="멘토링소개이미지" />
        </div>
      </div>
    </section>
    <!-- 세번째  -->
    <div class="banner">
      <div class="container second-box">
        <div class="second-left-box">
          <div>
            <p class="title">
              새로운 프로그래밍 언어를 <br />
              배우는 유일한 방법은 <br />
              그 언어로 프로그램을 만드는 것이다
            </p>
            <p class="des">
              The only way to <br />
              learn a new programming language <br />
              is by writing programs in it
            </p>
            <p class="des">- Dennis Ritchie -</p>
          </div>
        </div>
        <div class="second-right-box">
          <img class="bg-img2" src="@/img/team3.svg" alt="메인소개이미지" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 전체적으로 적용될 스타일 == 중복된부분 */
.container {
  padding: 0;
}
img {
  width: 100%;
}
.highligh {
  color: #1a66a8;
  font-weight: bold;
}
button {
  border: none;
  margin: 0;
  padding: 0;
  background: #1379d2;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
}
/* first-section */
.first-section {
  width: 100%;
}
.title {
  font-size: 35px;
  text-align: center;
}
.highligh {
  color: #1a66a8;
  font-weight: bold;
}
.des {
  font-size: 15px;
  text-align: center;
}
/* second-section */
.example-section img {
  display: block;
  width: 90%;
  height: 100%;
  object-fit: cover;
}
.item {
  padding: 18px 12px;
}
.example-section {
  display: flex;
  justify-content: center;
  height: 25vh;
}
.example-section img {
  object-fit: contain;
}
/* third-section */
.banner {
  background-color: #1a66a8;
  padding: 56px 0;
}
.second-box .title,
.second-box .des {
  color: #fff;
}
/* 모바일 반응형 */
@media screen and (max-width: 575px) {
  /* first-section */
  .first-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 12px;
  }
  .left-box {
    width: 70vw;
  }
  .title {
    font-size: 5vw;
    font-weight: 700;
  }
  .des {
    /* 고민좀해보자 */
    font-size: 14px;
  }
  /* second-section */
  .section {
    display: flex;
    flex-direction: column;
    /* 굳이 가운데정렬을 하지않고 너비는 100프로 + 텍스트얼라인센터 */
    /* margin: 0 auto; */
    flex-wrap: nowrap;
  }
  .section.reverse {
    flex-direction: column;
  }
  .item {
    padding: 18px 12px;
    text-align: center;
  }
  .example-section {
    /* height: 25vh; */
  }
  .example-section img {
    /* object-fit: contain; */
  }
  /* third-section */
  .second-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .second-box .title {
    font-size: 4vw;
  }
  .second-right-box {
    width: 70vw;
  }
  .banner {
    padding: 24px 0;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .left-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-box {
    display: inline;
  }
  .bg-img {
    width: 60%;
    height: 50%;
  }
  .title {
    font-size: 35px;
    text-align: center;
  }
  .des {
    font-size: 15px;
    text-align: center;
  }
  .second-box {
    width: 100%;
  }
  .second-left-box {
    display: inline;
  }
  .second-right-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg-img2 {
    width: 60%;
    height: 40%;
  }
  .second-box .title {
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    color: white;
  }
  .second-box .des {
    font-size: 14px;
    text-align: center;
    color: white;
  }
  .desc-section {
    text-align: center;
  }
  .banner {
    padding: 36px 0;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .first-section {
    display: flex;
    height: 400px;
  }
  .left-box {
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .right-box {
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .bg-img {
    width: 70%;
    height: 70%;
  }
  .title {
    /* 둘다중복 */
    font-size: 35px;
    text-align: start;
  }

  .des {
    /* 아래만중복 */
    font-size: 15px;
    text-align: start;
  }
  /* second section */
  .second-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .section {
    /* width: 640px; */
    display: flex;
    flex-direction: row;
    /* margin: 0 auto; */
    flex-wrap: nowrap;
  }
  .item {
    width: 360px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .desc-section h2 {
    font-size: 20px;
    font-weight: 900;
  }
  .desc-section p {
    font-size: 14px;
  }
  .section.reverse {
    flex-direction: row-reverse;
  }
  .reverse .des {
    text-align: end;
  }
  button {
    font-size: 14px;
  }
  /* third section */
  .second-box {
    display: flex;
    /* 아래만중복 */
    width: 100%;
    height: 250px;
  }
  .second-left-box {
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .second-right-box {
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .bg-img2 {
    width: 80%;
    height: 80%;
  }
  .second-box .title {
    font-size: 22px;
    text-align: end;
  }
  .second-box .des {
    font-size: 15px;
    text-align: end;
  }
}
@media (min-width: 1200px) {
  /* first section  */
  .first-section {
    /* 아래만중복 */
    display: flex;
    height: 612px;
  }
  .left-box {
    /* 4개다중복 */
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }

  .right-box {
    /* 4개다중복 */
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .bg-img {
    width: 80%;
    height: 80%;
  }
  .title {
    font-size: 36px;
    /* 아래만중복 */
    text-align: start;
  }

  .des {
    font-size: 18px;
    /* 아래만중복 */
    text-align: start;
  }
  /* second section */
  .second-section {
    display: flex;
    /* justify-content: center; */
    justify-content: space-between;
  }
  .section {
    /* width: 400px; */
    display: flex;
    flex-direction: column;
  }

  .example-section .card {
    justify-items: center;
    justify-self: center;
  }
  .desc-section h2 {
    margin-bottom: 18px;
  }
  .desc-section p {
    margin-bottom: 18px;
  }
  .desc-section button {
    margin: 0 auto;
  }
  .item {
    padding: 24px 18px;
    min-width: 380px;
  }
  .section.reverse {
    flex-direction: column-reverse;
  }
  /* third section */
  .second-box {
    display: flex;
  }
  .second-box .title {
    font-size: 28px;
  }
  .second-left-box {
    width: 50%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .second-right-box {
    width: 50%;
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .bg-img2 {
    width: 80%;
  }
}
</style>
