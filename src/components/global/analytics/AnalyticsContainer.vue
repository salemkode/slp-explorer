<template>
  <div class="d-flex flex-column flex-md-row">
    <analytics-card
      v-for="item in items"
      :key="item.title"
      :title="item.title"
      :value="item.value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AnalyticsCard from "@/components/global/analytics/AnalyticsCard.vue";

export default defineComponent({
  name: "AnalyticsContainer",
  components: { AnalyticsCard },
  props: {
    items: {
      type: Object as PropType<
        Array<{
          title: string;
          value: number | null;
        }>
      >,
    },
  },
});
</script>
