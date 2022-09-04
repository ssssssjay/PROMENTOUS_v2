<template>
  <Modal ref="baseModal" class="modal">
    <div class="complete-section" v-if="teammember.length === 0">
      <h2>모든 팀원들의 평가를 완료하셨습니다!</h2>
      <button class="btn cancel" @click="cancel">돌아가기</button>
    </div>
    <section v-else>
      <div
        class="content-container mb-4"
        :key="i"
        v-for="(member, i) in teammember">
        <p>
          팀원 닉네임 : <strong>{{ member.userNickname }}</strong>
        </p>
        <input
          type="text"
          placeholder="팀원과 함께 프로젝트를 진행하시고 느낀점을 적어주세요!"
          size="60"
          v-model="member.rating[0].comment"
          maxlength="1000"
          class="txt input-group-text mb-3" />
        <div class="star">
          <star-rating
            class="mb-3"
            v-model:rating="member.rating[0].score"
            @click="transRating"
            :active-color="colors"
            v-bind:increment="0.5"
            inactive-color="#fff"
            v-bind:star-size="40"
            padding="1"
            border-width="2"
            rounded-corners="true"></star-rating>
          <button
            class="btn confirm"
            @click="
              [confirm(), confirmSubmitAlert(member.rating[0], member.userId)]
            ">
            제출
          </button>
        </div>
      </div>
      <div class="buttons-container">
        <button class="btn cancel" @click="cancel">취소</button>
      </div>
    </section>
  </Modal>
</template>

<script>
import StarRating from "vue-star-rating";
import Modal from "@/components/BaseModal.vue";
import { ref } from "vue";

export default {
  name: "TeamRatingModal",
  components: {
    Modal,
    StarRating
  },
  props: {
    content: Array,
    colors: {
      type: String,
      default: "yellow"
    },
    teammember: Array,
    selectedProjectId: Number
  },
  data() {
    return {};
  },
  methods: {
    refresh() {
      this.$parent.projectIdSelect();
    },
    async saveMemberRate(ratingData, targetId) {
      const ratingDataForPost = {
        sessionUserId: this.$store.state.user.user_id,
        postRatingInfo: {
          score: ratingData.score,
          comment: ratingData.comment,
          projectId: this.selectedProjectId
        },
        ratingType: "USER"
      };
      try {
        const result = await this.$post(
          `manage/postRating/${targetId}`,
          ratingDataForPost
        );
        console.log(result);
        this.refresh();
      } catch (error) {
        alert(error);
      }
    },
    confirmSubmitAlert(ratingData, targetId) {
      this.$swal({
        title: "정말 제출하시겠습니까?",
        text: "제출한 평가는 되돌릴 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "제출",
        cancelButtonText: "취소"
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveMemberRate(ratingData, targetId);
          this.$swal({
            title: "제출 완료",
            text: "평가가 제출되었습니다.",
            icon: "success"
          });
        }
      });
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
.complete-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.complete-section h2 {
  margin-bottom: 24px;
}
input {
  border: 1px solid #ddd;
  background-color: #fff;
  outline: none;
}
.txt {
  text-align: start;
}
.btn {
  border: 1px solid rgb(65, 65, 65);
}
.btn:hover {
  color: #fff;
  background-color: rgb(65, 65, 65);
}
.star {
  display: flex;
  justify-content: space-between;
}
</style>
