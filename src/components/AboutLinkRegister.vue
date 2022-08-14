<template>
  <div>
    <div class="col partTo">
      <input
        type="text"
        class="form-control"
        style="width: 200px"
        placeholder="링크 이름"
        v-model="URL.title" />

      <input
        type="text"
        class="form-control"
        style="width: 600px"
        placeholder="링크 주소"
        v-model="URL.address" />
      <button type="button" class="btn btn-secondary" @click="addUrl()">
        추가
      </button>
    </div>
    <div class="row" v-for="(URL, index) in URL_LIST" :key="index">
      <div class="col partTo ms-1">
        <p class="form-control mb-1">
          {{ URL_LIST[index].title }}
        </p>
        <p class="form-control mb-1">
          {{ URL_LIST[index].address }}
        </p>
        <button type="button" class="btn btn-secondary" @click="delURL(index)">
          X
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      URL: { title: "", address: "" },
      URL_LIST: []
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addUrl() {
      if (this.URL.title !== "" && this.URL.address !== "") {
        let obj0 = {
          ["title"]: this.URL.title,
          ["address"]: this.URL.address
        };
        this.URL_LIST.push(obj0);
        this.URL.title = "";
        this.URL.address = "";
      } else if (this.URL.title === "" || this.URL.address === 0) {
        alert("링크를 정확히 입력해주세요");
      }
    },
    delURL(index) {
      this.URL_LIST.splice(index, 1);
    }
  }
};
</script>
<style scoped>
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
p.form-control:nth-child(2) {
  width: 600px;
}
</style>
