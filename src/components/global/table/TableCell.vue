<template>
  <td>
    <Copy
      v-if="typeof item == 'object'"
      class="d-flex align-items-center"
      :class="{ 'word-brack-all': item.warp }"
      :text="item.copy ? item.text : ''"
    >
      <info-icon v-if="item.tokenIcon" :tokenId="item.tokenIcon" :size="32" />
      <app-link v-if="item.url" :to="item.url" v-text="item.text" />
      <span v-else> {{ item.text }} </span>
    </Copy>

    <!-- Empty value of item -->
    <pre v-else-if="item === ''" v-text="' '" />

    <!--  -->
    <span v-else>
      {{ item }}
    </span>
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Types
import { PropType } from "vue";
import { table_cell } from "@/types/table.type";

// Components
import AppLink from "@/components/global/AppLink.vue";
import InfoIcon from "@/components/global/infoContainer/InfoIcon.vue";
import Copy from "@/components/global/Copy.vue";

//
export default defineComponent({
  name: "TableCell",
  // eslint-disable-next-line vue/no-unused-components
  components: { AppLink, Copy, InfoIcon },
  props: {
    item: {
      type: [String, Number, Object] as PropType<table_cell>,
      required: true,
    },
  },
});
</script>

<style scoped>
pre {
  margin: 0;
}
</style>
