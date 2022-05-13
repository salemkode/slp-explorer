<template>
  <span>
    <slot />
    <i
      v-if="text"
      @click="copyText"
      class="fi fi-rr-duplicate copy-icon p-1 px-2"
    />
    <div class="copy-popup" :class="{ show: showPopup }">copied!</div>
  </span>
</template>

<script lang="ts">
import { useClipboard } from "@/use/useClipboard";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Copy",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //
    const { copy } = useClipboard();

    //
    const showPopup = ref(false);

    //
    function copyText() {
      copy(props.text);

      //
      showPopup.value = true;

      //
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
    }

    //
    return { copyText, showPopup };
  },
});
</script>

<style scoped>
.copy-icon {
  cursor: pointer;
}

.copy-popup {
  position: fixed;
  bottom: 50px;
  left: 50%;
  background: #222222;
  color: white;
  padding: 10px 30px;
  border-radius: 50px;
  transform: translateX(-50%);
  transition: opacity 0.5s;
  opacity: 0;
  font-size: 16px;
}

.copy-popup.show {
  opacity: 1;
}
</style>
