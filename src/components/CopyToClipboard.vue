<template>
  <span>
    <!-- 클립보드 복사 기능 -->
    <input type="hidden" v-model="value" />
    <button
      type="button"
      class="btn btn-sm pro-circle pro_button"
      v-clipboard:copy="value"
      v-clipboard:success="onSuccess"
      v-clipboard:error="onError"
      @click="showAlert">
      <i class="bi bi-link-45deg pro-circle-icon"></i>
      공유
    </button>
  </span>
</template>
<script>
export default {
  components: {},
  props: {
    pageUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  setup() {
    const value = window.document.location.href;
    const onSuccess = () => {
      console.log("copy success");
    };
    const onError = () => {
      console.log("copy error");
    };

    return { value, onSuccess, onError };
  },
  methods: {
    showAlert() {
      this.$swal({
        position: "center",
        icon: "success",
        title: "클립보드에 복사되었습니다.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
};
</script>
