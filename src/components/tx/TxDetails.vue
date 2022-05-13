<template>
  <div class="token-stats">
    <h3 class="table-title" v-text="$t('tx-details')" />
    <Table :items="stats" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import bchaddr from "bchaddrjs-slp";
import { tx_data } from "@/types/fullstack.type";

// Components
import Table from "@/components/global/table/Table.vue";

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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const txData = props.txData;

    //
    let creator = "";

    const addresses = txData.vout[1].scriptPubKey.addresses;
    if (addresses) {
      creator = bchaddr.toSlpAddress(addresses[0]);
    }

    //
    const { t } = useI18n();

    //
    const stats = reactive([
      [t("type"), txData.tokenTxType],
      [t("block"), txData.blockheight],
      [t("timestamp"), new Date(txData.blocktime * 1000).toUTCString()],
      [t("txid"), txData.txid],
      [
        t("creator"),
        {
          text: creator,
          url: `/address/${creator}`,
        },
      ],
    ]);

    //
    return { stats };
  },
});
</script>
