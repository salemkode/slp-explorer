<template>
  <div class="token-stats">
    <h3 class="table-title" v-text="$t('tx-details')" />
    <Table :items="stats" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { tx_data } from "@/types/backend.type";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TxDetails",
  props: {
    details: {
      required: true,
      type: Object as PropType<tx_data["details"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    const stats: table_row[] = [
      [t("type"), props.details.type],
      [t("block"), props.details.block],
      [t("timestamp"), new Date(props.details.time * 1000).toUTCString()],
      [
        t("txid"),
        {
          text: props.details.txid,
          warp: true,
        },
      ],
      [
        t("creator"),
        {
          text: props.details.creator,
          url: `/address/${props.details.creator}`,
          warp: true,
        },
      ],
    ];

    //
    return { stats };
  },
});
</script>
