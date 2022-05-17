<template>
  <div class="token-stats">
    <h3 class="table-title" v-text="$t('tx-details')" />
    <Table :items="stats" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from "vue";
import bchaddr from "bchaddrjs-slp";
import { tx_data } from "@/types/fullstack.type";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TokenDetails",
  props: {
    txData: {
      required: true,
      type: Object as PropType<tx_data["txData"]>,
    },
  },
  setup(props) {
    //
    let creator = "";

    //
    const addresses = computed(
      () => props.txData.vout[1].scriptPubKey.addresses
    );

    if (addresses.value) {
      creator = bchaddr.toSlpAddress(addresses.value[0]);
    }

    //
    const { t } = useI18n();

    //
    const stats = reactive<table_row[]>([
      [t("type"), props.txData.tokenTxType],
      [t("block"), props.txData.blockheight],
      [t("timestamp"), new Date(props.txData.blocktime * 1000).toUTCString()],
      [
        t("txid"),
        {
          text: props.txData.txid,
          warp: true,
        },
      ],
      [
        t("creator"),
        {
          text: creator,
          url: `/address/${creator}`,
          warp: true,
        },
      ],
    ]);

    //
    return { stats };
  },
});
</script>
