<template>
  <Loading :loading="request.loading.value" :error="request.error.value">
    <div v-if="request.result.value" class="tx-page container">
      <info-container :address="address" :title="$t('address')" />
      <addresses-table :address="address" />
      <token-balances :address="request.result.value.balance" />
      <address-tx :txs="request.result.value.balance.txs" />
    </div>
  </Loading>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
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
    const address = computed(() => route.params.address as string);

    //
    if (bchaddr.isValidAddress(address.value)) {
      router.push(bchaddr.toSlpAddress(address.value));

      // Use token data by id
      const request = computed(() =>
        useAddress(bchaddr.toCashAddress(address.value))
      );

      //
      return { address, request };
    } else {
      return {
        result: null,
        error: { status: 400, message: "This is not bitcoin cash address" },
      };
    }
  },
});
</script>
