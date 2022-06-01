<template>
  <div class="error-container">
    <img :src="errorImages[error.statusCode]" alt="" class="error-image" />
    <h3>{{ error.message }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<{ statusCode: number; message: string }>,
      required: true,
    },
  },
  setup() {
    const errorImages = {
      404: "/image/errors/not_found.svg",
      400: "/image/errors/empty.svg",
      503: "/image/errors/server-down.svg",
      429: "/image/errors/server-down.svg",
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
  padding: 18px;
  text-align: center;
}

.error-image {
  max-width: 80%;
  margin: 10px auto;
}
</style>
