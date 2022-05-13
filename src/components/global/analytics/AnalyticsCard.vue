<template>
  <div class="card">
    <div class="card-body">
      <header v-text="$t(title)" />
      <span v-text="value ? numberWithCommas(value) : '---,---'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { numberWithCommas } from "@/modules/utilities";

export default defineComponent({
  name: "AnalyticsCard",
  props: {
    title: String,
    value: Number,
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
  margin: 5px;
  width: 100%;
}
.card header {
  margin-bottom: 5px;
}
</style>
