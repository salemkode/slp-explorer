<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="tx-page container">
      <info-container :address="address" :title="$t('address')" />
      <Table :items="addresses" />
      <token-balances :balance="result.balance" :get-balance="getBalance" />
      <address-tx
        :transaction="result.transaction"
        :get-transaction="getTransaction"
      />
    </div>
  </Loading>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import bchaddr from "bchaddrjs-slp";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useAddress } from "@/use/useAddress";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import Table from "@/components/global/table/Table.vue";
import TokenBalances from "@/components/address/TokenBalances.vue";
import AddressTx from "@/components/address/AddressTx.vue";

//
export default defineComponent({
  components: { InfoContainer, Table, TokenBalances, AddressTx },
  setup() {
    // defined route
    const route = useRoute();

    // defined router
    const router = useRouter();

    // Get tokenId of page
    const address = route.params.address as string;

    //
    const { t } = useI18n();

    //
    if (bchaddr.isValidAddress(address)) {
      router.push(bchaddr.toSlpAddress(address));

      // Convert Address type
      const addresses: table_row[] = [
        [t("slp_address"), { text: bchaddr.toSlpAddress(address), warp: true }],
        [
          t("cash_address"),
          { text: bchaddr.toCashAddress(address), warp: true },
        ],
        [
          t("legacy_address"),
          { text: bchaddr.toLegacyAddress(address), warp: true },
        ],
      ];

      // Use token data by id
      const { result, error, loading, getBalance, getTransaction } = useAddress(
        bchaddr.toCashAddress(address)
      );

      //
      return {
        addresses,
        address,
        result,
        error,
        loading,
        getBalance,
        getTransaction,
      };
    } else {
      return {
        result: null,
        error: { statusCode: 400, message: "This is not bitcoin cash address" },
      };
    }
  },
});
</script>
