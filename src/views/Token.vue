<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="token-page container">
      <info-container
        :title="`${result.details.ticker} ${$t(SLP_Type_Name)}`"
        :token="{
          documentUri: result.details.documentUri,
          tokenId: result.details.tokenId,
          type: result.details.type,
          parentGroupId: result.details.parentGroupId,
        }"
      />
      <analytics-token :token-stats="result.stats" />
      <div class="tables-container">
        <token-details :token-details="result.details" />
        <token-status :token-stats="result.stats" />
      </div>

      <!-- Show all token transctions -->
      <token-transactions :tx="result.tx" :get-tx="getTx" />

      <!-- Show all token nfts -->
      <token-nfts v-if="result.nft" :nft="result.nft" :get-nft="getNft" />
    </div>
  </Loading>
</template>

<script lang="ts">
// Modules
import { defineComponent, computed, watch } from "vue";
import { useRoute } from "vue-router";

// Use
import { useToken } from "@/use/useToken";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import TokenDetails from "@/components/token/TokenDetails.vue";
import TokenStatus from "@/components/token/TokenStats.vue";
import TokenTransactions from "@/components/token/TokenTransactions.vue";
import AnalyticsToken from "@/components/token/AnalyticsToken.vue";
import TokenNfts from "@/components/token/TokenNfts.vue";

//
export default defineComponent({
  components: {
    InfoContainer,
    TokenDetails,
    TokenStatus,
    TokenTransactions,
    AnalyticsToken,
    TokenNfts,
  },
  setup() {
    // defined router
    const route = useRoute();

    // Get tokenId of page
    const tokenId = route.params.tokenid as string;

    // Use token data by id
    const { result, error, loading, getTx, getNft } = useToken(tokenId);

    // Change page title
    watch(result, () => {
      if (result.value) {
        document.title = `${result.value.details.name} - Token Page`;
      }
    });

    // Type NFT or Token
    const SLP_Type_Name = computed<"nft" | "token">(() => {
      if (result.value?.details.type === "nft1_child") {
        return "nft";
      }

      return "token";
    });

    // Display data in html
    return { result, error, loading, getTx, getNft, SLP_Type_Name };
  },
});
</script>
