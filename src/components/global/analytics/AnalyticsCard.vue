<template>
  <div class="card">
    <div class="card-body">
      <header v-text="$t(title)" />
      <span v-text="value ? numberWithCommas(value) : '--- soon ---'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { numberWithCommas } from "@/modules/utilities";

export default defineComponent({
  name: "AnalyticsCard",
  props: {
    title: String,
    value: Number as PropType<number | null>,
  },
  setup() {
    return {
      numberWithCommas,
    };
  },
});
</script>

<style scoped>
.card {
  margin: 5px 0;
  width: 100%;
}

.card header {
  margin-bottom: 5px;
}

/* MD */
@media (min-width: 768px) {
  .card:not(:first-child, :last-child) {
    margin: 5px 10px;
  }
}
</style>
