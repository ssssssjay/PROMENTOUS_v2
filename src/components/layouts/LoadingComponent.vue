<template>
  <div class="loading">
    <div class="spinner"></div>
    <strong>로딩중 입니다...</strong>
  </div>
</template>
<style scoped>
.loading {
  width: 100%;
  height: 100px;
  position: relative;
}
.loading strong {
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
}
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinner::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.05);
  border-top-color: #1379d2;
  border-bottom-color: #1379d2;
  animation: spinner 0.8s ease infinite;
}
</style>
