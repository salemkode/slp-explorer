<template>
  <div class="analytics d-flex">
    <AnalyticsCard
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

<style scoped>
.analytics {
  display: flex;
  flex-direction: column;
}
.analytics .AnalyticsCard {
  background: red;
}

/* MD */
@media (min-width: 768px) {
  .analytics {
    flex-direction: row;
  }
}
</style>
