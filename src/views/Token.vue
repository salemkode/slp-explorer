<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="token-page container">
      <info-container
        :title="`${result.details.ticker} Token`"
        :token-id="result.details.tokenId"
      />
      <analytics-token :token-stats="result.stats" />
      <div class="tables-container">
        <token-details :token-details="result.details" />
        <token-status :token-stats="result.stats" />
      </div>

      <token-transactions
        :tx="result.tx"
        :decimals="result.details.decimals"
        :get-tx="getTx"
      />
    </div>
  </Loading>
</template>

<script lang="ts">
// Modules
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

// Use
import { useToken } from "@/use/useToken";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import TokenDetails from "@/components/token/TokenDetails.vue";
import TokenStatus from "@/components/token/TokenStats.vue";
import TokenTransactions from "@/components/token/TokenTransactions.vue";
import AnalyticsToken from "@/components/token/AnalyticsToken.vue";

//
export default defineComponent({
  components: {
    InfoContainer,
    TokenDetails,
    TokenStatus,
    TokenTransactions,
    AnalyticsToken,
  },
  setup() {
    // defined router
    const route = useRoute();

    // Get tokenId of page
    const tokenId = route.params.tokenid as string;

    // Use token data by id
    const { result, error, loading, getTx } = useToken(tokenId);

    // Display data in html
    return { result, error, loading, getTx };
  },
});
</script>
