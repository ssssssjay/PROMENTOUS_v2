<template>
  <footer class="footer bg-light">
    <div class="container">
      <div class="row">
        <!-- <div class="content col-lg-6 h-100 text-center text-lg-start my-auto">
          <p class="text-muted small mb-4 mb-lg-0">
            © Your Website 2022. All Rights Reserved.
          </p>
        </div> -->
        <div class="content">
          <p class="text-end small">
            © Your Website 2022. All Rights Reserved.
            <a
              class="col text-end ms-2"
              href="https://github.com/ssssssjay/PROMENTOUS_v2"
              target="_blank">
              <i class="bi bi-github"></i
            ></a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ""
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
a {
  text-decoration: none;
  color: black;
  display: inline;
  margin-left: auto;
}
footer {
  font-family: "Roboto";
  height: 15px;
}

.bi-github {
  font-size: 30px;
}
.content {
  display: inline;
}
</style>
