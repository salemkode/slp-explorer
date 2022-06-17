<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="tx-page container">
      <!-- -->
      <info-container
        :title="title"
        :token="{
          tokenId: result.token.tokenId,
          documentUri: result.token.documentUri,
          type: result.token.type,
        }"
      />

      <!-- -->
      <div class="tables-container">
        <tx-details :details="result.details" />
        <tx-token :token="result.token" />
      </div>

      <!--  -->
      <tx-operation :inputs="result.inputs" :outputs="result.outputs" />
    </div>
  </Loading>
</template>

<script lang="ts">
// dependencies
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

// local modules
import { useTx } from "@/use/useBackend";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import TxDetails from "@/components/tx/TxDetails.vue";
import TxToken from "@/components/tx/TxToken.vue";
import TxOperation from "@/components/tx/TxOperation.vue";

// use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { InfoContainer, TxDetails, TxToken, TxOperation },
  setup() {
    // Defined i18n
    const { t } = useI18n();

    // Defined route of this page
    const route = useRoute();

    // Get tokenId of page
    const txid = route.params.txid as string;

    // Use token data by id
    const { result, error, loading } = useTx(txid);

    // info container title
    // ex: BCH Send Transaction
    const title = computed(() => {
      if (result.value === null) return "";

      // Transction type
      const txType = result.value.details.type;

      // Transction type
      const ticker = result.value.token.ticker;

      //
      return `${ticker} ${txType} ${t("transaction")}`;
    });

    // Display data in html
    return { result, error, loading, title };
  },
});
</script>

<style scoped>
.token-page .table-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.token-page .table-container > * {
  flex-grow: 1;
  padding: 5px;
}
</style>
