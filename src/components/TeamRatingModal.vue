<template>
  <Modal ref="baseModal" class="modal">
    <div class="content-container" :key="i" v-for="(member, i) in teammember">
      <p>{{ member.userNickname }}</p>
      <input
        type="text"
        name=""
        id=""
        size="60"
        v-model="member.rating[0].comment"
        maxlength="1000"
        class="txt input-group-text" />

      <star-rating
        v-model:rating="member.rating[0].score"
        @click="transRating"
        :active-color="colors"></star-rating>
    </div>
    <div class="buttons-container">
      <button class="btn confirm" @click="[confirm(), memRatingSave()]">
        확인
      </button>
      <button class="btn cancel" @click="cancel">취소</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/BaseModal.vue";
import { ref } from "vue";

export default {
  name: "TeamRatingModal",
  components: {
    Modal
  },
  props: {
    content: Array,
    colors: {
      type: String,
      default: "yellow"
    },
    teammember: Array
  },
  data() {
    return {};
  },
  methods: {
    refresh() {
      this.$parent.projectIdSelect();
    },
    async memRatingSave() {
      /*POST 재료  */
      let tempArr = [];
      for (let index = 0; index < this.teammember.length; index++) {
        let element = {};
        element = this.teammember[index].Rating[0];
        element.projectId = 1;
        element.rateUserId = this.$store.state.user.user_id;

        tempArr.push(element);
      }
      this.params = tempArr;

      /*POST 발사  */
      this.result = await this.$post(
        // TODO: axios.defaults.baseURL로 변경
        `/manage/saveMentorRating`,

        this.params
      );

      this.refresh();
    }
  },
  setup() {
    const baseModal = ref(null);
    const resolvePromise = ref(null);

    const show = () => {
      baseModal.value.open();
      return new Promise((resolve) => {
        resolvePromise.value = resolve;
      });
    };

    const confirm = () => {
      baseModal.value.close();
      resolvePromise.value(true);
    };

    const cancel = () => {
      baseModal.value.close();
      resolvePromise.value(false);
    };
    return { baseModal, show, confirm, cancel };
  }
};
</script>
<style scoped>
.txt {
  text-align: start;
}
</style>
