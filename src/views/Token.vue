<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="token-page container">
      <info-container
        :title="`${result.tokenData.ticker} Token`"
        :token-id="result.tokenData.tokenId"
        key="1"
      />
      <analytics-container :items="analyticsCardsItem" />
      <div class="tables-container">
        <token-details :token-data="result.tokenData" />
        <token-status :token-data="result.tokenData" />
      </div>

      <token-transactions
        :token-data="result.tokenData"
        :decimals="result.tokenData.decimals"
      />
    </div>
  </Loading>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
// Modules
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

// Use
import { useToken } from "@/use/useToken";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import AnalyticsContainer from "@/components/global/analytics/AnalyticsContainer.vue";
import TokenDetails from "@/components/token/TokenDetails.vue";
import TokenStatus from "@/components/token/TokenStats.vue";
import TokenTransactions from "@/components/token/TokenTransactions.vue";

//
export default defineComponent({
  components: {
    InfoContainer,
    TokenDetails,
    TokenStatus,
    TokenTransactions,
    AnalyticsContainer,
  },
  setup() {
    // defined router
    const route = useRoute();

    // Get tokenId of page
    const tokenId = route.params.tokenid as string;

    // Use token data by id
    const { result, error, loading } = useToken(tokenId);

    //
    const analyticsCardsItem = computed(() => {
      const items: Array<{ title: string; value: number | null }> = [];

      if (result.value && result.value.tokenData.txs) {
        let sendTransaction = result.value.tokenData.txs.filter(
          (item) => item.type === "SEND"
        );

        items.push({
          title: "tokenstats_valid_token_transactions",
          value: sendTransaction.length,
        });

        items.push({
          title: "tokenstats_valid_token_addresses",
          value: null,
        });

        items.push({
          title: "tokenstats_circulating_supply",
          value: +result.value.tokenData.tokensInCirculationBN,
        });
      }

      return items;
    });

    // Display data in html
    return { result, error, loading, analyticsCardsItem };
  },
});
</script>
