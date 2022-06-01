<template>
  <div class="token-stats">
    <h3 class="table-title" v-text="$t('stats')" />
    <Table :items="stats" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { numberWithCommas } from "@/modules/utilities";

// Components
import Table from "@/components/global/table/Table.vue";

// Types
import { table_row } from "@/types/table.type";
import { token_data } from "@/types/backend.type";

// Use
import { useI18n } from "vue-i18n";

//
export default defineComponent({
  components: { Table },
  name: "TokenStats",
  props: {
    tokenStats: {
      required: true,
      type: Object as PropType<token_data["stats"]>,
    },
  },
  setup(props) {
    //
    const { t } = useI18n();

    //
    const mintBatonStatus = props.tokenStats.mintBatonIsActive
      ? "Alive"
      : "Dead Ended";

    //
    const stats: table_row[] = [
      [t("block_created"), props.tokenStats.block],
      [t("minting_baton_status"), mintBatonStatus],
      [t("tokenstats_satoshis_locked_up"), "not found in slp indexer"],
      [t("minting_baton_utxo"), "not found in slp indexer"],
      [
        t("tokenstats_tokens_minted"),
        numberWithCommas(+props.tokenStats.totalMinted),
      ],
      [
        t("tokenstats_tokens_burned"),
        numberWithCommas(+props.tokenStats.totalBurned),
      ],
    ];

    //
    return { stats };
  },
});
</script>
