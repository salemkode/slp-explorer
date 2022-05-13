<template>
  <div class="container my-5">
    <h3 class="table-title" v-text="title" />
    <div
      class="row-container__row-items"
      :style="{ '--image-size': imageSize + 'px' }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//
export default defineComponent({
  name: "RowContainer",
  props: {
    "image-size": {
      type: Number,
      default: 80,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    function toString(Int: number) {
      return String(Int).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return { toString };
  },
});
</script>

<style>
.row-container__row-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.row-container__row-items > * {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 8px 0;
}

.row-container__row-items img {
  width: var(--image-size);
  padding: 10px;
}

@media (max-width: calc()) {
}
</style>
