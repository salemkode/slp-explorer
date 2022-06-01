<template>
  <transition name="fade" mode="out-in">
    <div v-if="loading" class="loading-container">
      <div class="loading">
        <h3 class="loading-text" v-text="$t('loading_dank_memes')" />
      </div>
    </div>
    <Error v-else-if="error" :error="error" />
    <slot v-else />
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Error from "@/components/global/Error.vue";

export default defineComponent({
  components: { Error },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object as PropType<{ statusCode: number; message: string }>,
    },
  },
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

.loading {
  position: relative;
}

.loading-text {
  color: white;
  mix-blend-mode: difference;
  margin: 0;
}

.loading::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 100%;
  background: var(--bs-dark);
  transition: 1s all;
  left: 0;
  left: calc(100% - 50px);
  animation: 5s loading forwards infinite linear;
}

@keyframes loading {
  0% {
    left: 0;
    width: 50px;
  }
  20%,
  21% {
    width: 50px;
    left: calc(100% - 50px);
  }
  60% {
    width: 100%;
    left: 0px;
  }
  100% {
    left: 0px;
    width: 50px;
  }
}
</style>
