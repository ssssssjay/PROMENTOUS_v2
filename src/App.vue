<template>
  <HeaderLayout />
  <router-view />
  <FooterLayout />
</template>
<script>
import HeaderLayout from "@/components/layouts/HeaderLayout.vue";
import FooterLayout from "@/components/layouts/FooterLayout.vue";
export default {
  components: {
    HeaderLayout,
    FooterLayout
  }
};
</script>
<style>
@font-face {
  font-family: "IBMPlexSansKR-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: "IBMPlexSansKR-Regular";
}
</style>
