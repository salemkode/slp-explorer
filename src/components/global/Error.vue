<template>
  <div class="error-container">
    <img :src="errorImages[error.status]" alt="" />
    <h3>{{ error.message }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<{ status: number; message: string }>,
    },
  },
  setup() {
    const errorImages = {
      404: "/image/errors/not_found.svg",
      400: "/image/errors/empty.svg",
      503: "/image/errors/server-down.svg",
    };

    return { errorImages };
  },
});
</script>

<style scoped>
.error-container {
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error-container > * {
  height: 100%;
  padding: 18px;
  text-align: center;
}
</style>
