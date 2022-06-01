<template>
  <analytics-container :items="analyticsCardsItem" />
</template>

<script lang="ts">
// Modules
import { defineComponent, PropType, reactive } from "vue";

// Components
import AnalyticsContainer from "@/components/global/analytics/AnalyticsContainer.vue";

// Types
import { token_data } from "../../types/backend.type";

//
export default defineComponent({
  name: "AnalyticsToken",
  props: {
    tokenStats: {
      type: Object as PropType<token_data["stats"]>,
      required: true,
    },
  },
  components: {
    AnalyticsContainer,
  },
  setup(props) {
    const analyticsCardsItem = reactive([
      {
        title: "tokenstats_valid_token_transactions",
        value: props.tokenStats.qtyTransactions,
      },
      {
        title: "tokenstats_valid_token_addresses",
        value: props.tokenStats.qtyAddresses,
      },
      {
        title: "tokenstats_circulating_supply",
        value: props.tokenStats.tokensInCirculation,
      },
    ]);

    // Display data in html
    return { analyticsCardsItem };
  },
});
</script>
