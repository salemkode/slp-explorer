<template>
  <Loading :loading="loading" :error="error">
    <div v-if="result" class="tx-page container">
      <info-container :address="address" :title="$t('address')" />
      <token-balances :address="result.balance" />
      <address-tx :txs="result.balance.txs" />
      <addresses-table :address="address" />
    </div>
  </Loading>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import bchaddr from "bchaddrjs-slp";

// Use
import { useAddress } from "@/use/useAddress";
import { useRoute, useRouter } from "vue-router";

// Components
import InfoContainer from "@/components/global/infoContainer/InfoContainer.vue";
import TokenBalances from "@/components/address/TokenBalances.vue";
import AddressTx from "@/components/address/AddressTx.vue";
import AddressesTable from "@/components/address/AddressesTable.vue";

//
export default defineComponent({
  components: {
    InfoContainer,
    TokenBalances,
    AddressTx,
    AddressesTable,
  },
  setup() {
    // defined route
    const route = useRoute();

    // defined router
    const router = useRouter();

    // Get tokenId of page
    const address = route.params.address as string;

    //
    if (bchaddr.isValidAddress(address.value)) {
      router.push(bchaddr.toSlpAddress(address.value));

      // Use token data by id
      const { result, error, loading } = useAddress(
        bchaddr.toCashAddress(address)
      );

      //
      return { addresses, address, result, error, loading };
    } else {
      return {
        result: null,
        error: { status: 400, message: "This is not bitcoin cash address" },
      };
    }
  },
});
</script>
