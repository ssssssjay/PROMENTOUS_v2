<template>
  <teleport to="body">
    <div class="backdrop" v-if="isVisible">
      <div class="modal-container">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModalCom",
  setup() {
    const isVisible = ref(false);

    const open = () => {
      isVisible.value = true;
    };

    const close = () => {
      isVisible.value = false;
    };
    return {
      isVisible,
      open,
      close
    };
  }
};
</script>

<style lang="scss" scoped>
.backdrop {
  z-index: 999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.2);

  .modal-container {
    background: white;
    position: relative;
    min-height: 400px;
    max-height: 90vh;
    max-width: 60vw;
    padding: 1.5rem;
    overflow-y: auto;
  }
  .modal-container > slot {
    align-items: center;
    justify-content: center;
  }
}
</style>
